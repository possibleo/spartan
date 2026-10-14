import { effect, type Signal, signal } from '@angular/core';
import { createHighlighterCore, type GrammarState, type HighlighterCore, type ThemedToken } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

/** One highlighted token. `htmlStyle` is the inline style from Shiki's light and dark themes. */
export interface CodeBlockToken {
	content: string;
	htmlStyle: string;
}

type SupportedLanguage = keyof typeof languages;

const languages = {
	bash: () => import('shiki/langs/shellscript.mjs'),
	css: () => import('shiki/langs/css.mjs'),
	diff: () => import('shiki/langs/diff.mjs'),
	html: () => import('shiki/langs/html.mjs'),
	javascript: () => import('shiki/langs/javascript.mjs'),
	json: () => import('shiki/langs/json.mjs'),
	jsx: () => import('shiki/langs/jsx.mjs'),
	markdown: () => import('shiki/langs/markdown.mjs'),
	python: () => import('shiki/langs/python.mjs'),
	sql: () => import('shiki/langs/sql.mjs'),
	tsx: () => import('shiki/langs/tsx.mjs'),
	typescript: () => import('shiki/langs/typescript.mjs'),
	yaml: () => import('shiki/langs/yaml.mjs'),
} as const;

const aliases: Record<string, SupportedLanguage> = {
	js: 'javascript',
	md: 'markdown',
	py: 'python',
	sh: 'bash',
	shell: 'bash',
	shellscript: 'bash',
	ts: 'typescript',
	yml: 'yaml',
	zsh: 'bash',
};

interface CodeHighlighter {
	highlight(code: string, state?: GrammarState): { lines: CodeBlockToken[][]; state?: GrammarState };
}

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
	highlighter ??= createHighlighterCore({
		themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
		langs: [],
		engine: createJavaScriptRegexEngine({ forgiving: true }),
	});

	return highlighter;
}

function getLanguage(language: string): SupportedLanguage | 'ansi' | null {
	const name = language.toLowerCase();
	if (name === 'ansi') {
		return name;
	}
	if (name in languages) {
		return name as SupportedLanguage;
	}
	return aliases[name] ?? null;
}

function tokenStyle(token: ThemedToken): string {
	if (!token.htmlStyle) {
		return '';
	}
	return Object.entries(token.htmlStyle)
		.map(([property, value]) => `${property}:${value}`)
		.join(';');
}

function toLines(tokens: ThemedToken[][]): CodeBlockToken[][] {
	return tokens.map((line) => line.map((token) => ({ content: token.content, htmlStyle: tokenStyle(token) })));
}

/**
 * Loads a language and returns a highlighter for it, or null for a language that is not listed.
 * `"ansi"` renders terminal colors. Each language loads the first time it is used.
 */
export async function loadHighlighter(language: string): Promise<CodeHighlighter | null> {
	const lang = getLanguage(language);
	if (!lang) {
		return null;
	}

	const shiki = await getHighlighter();
	if (lang !== 'ansi' && !shiki.getLoadedLanguages().includes(lang)) {
		await shiki.loadLanguage(await languages[lang]());
	}

	return {
		highlight(code: string, state?: GrammarState) {
			const tokenize = (text: string, grammarState?: GrammarState) =>
				shiki.codeToTokens(text, {
					lang,
					themes: { light: 'github-light', dark: 'github-dark' },
					defaultColor: false,
					grammarState,
				}).tokens;

			// ANSI has no grammar state, so each line is tokenized on its own.
			const tokens = lang === 'ansi' ? code.split('\n').flatMap((line) => tokenize(line)) : tokenize(code, state);

			return {
				lines: toLines(tokens),
				state: lang === 'ansi' ? undefined : shiki.getLastGrammarState(tokens),
			};
		},
	};
}

function plainLines(code: string): CodeBlockToken[][] {
	return code.split('\n').map((line) => [{ content: line, htmlStyle: '' }]);
}

function normalize(code: string): string {
	return code.endsWith('\n') ? code.slice(0, -1) : code;
}

/**
 * Highlights `code` for a server render. Returns null when the language is not in the list,
 * so the caller can fall back to plain lines.
 */
export async function highlightCode(code: string, language: string): Promise<CodeBlockToken[][] | null> {
	const highlighterForLanguage = await loadHighlighter(language);
	if (!highlighterForLanguage) {
		return null;
	}
	return highlighterForLanguage.highlight(normalize(code)).lines;
}

/**
 * One token list per line. Plain lines are returned until the highlighter loads, and for a
 * language that is not in the list. While `code` streams, only the new lines are tokenized.
 */
export function highlightedCode(code: Signal<string>, language: Signal<string>): Signal<CodeBlockToken[][]> {
	const loaded = signal<{ language: string; highlighter: CodeHighlighter | null } | null>(null);
	const lines = signal<CodeBlockToken[][]>(plainLines(normalize(code())));
	let cache: {
		highlighter: CodeHighlighter | null;
		text: string;
		lines: CodeBlockToken[][];
		state?: GrammarState;
	} = { highlighter: null, text: '', lines: [] };

	effect((onCleanup) => {
		const lang = language();
		let cancelled = false;
		loadHighlighter(lang)
			.then((next) => {
				if (!cancelled) {
					loaded.set({ language: lang, highlighter: next });
				}
			})
			.catch(() => {
				if (!cancelled) {
					loaded.set({ language: lang, highlighter: null });
				}
			});
		onCleanup(() => {
			cancelled = true;
		});
	});

	effect(() => {
		const value = normalize(code());
		const current = loaded();
		const active = current?.language === language() ? current.highlighter : null;

		if (!active) {
			cache = { highlighter: null, text: '', lines: [] };
			lines.set(plainLines(value));
			return;
		}

		let next = cache;
		if (next.highlighter !== active || !value.startsWith(next.text)) {
			next = { highlighter: active, text: '', lines: [] };
		}

		const end = value.lastIndexOf('\n') + 1;
		if (end > next.text.length) {
			const result = active.highlight(value.slice(next.text.length, Math.max(end - 1, next.text.length)), next.state);
			next = {
				highlighter: active,
				text: value.slice(0, end),
				lines: [...next.lines, ...result.lines],
				state: result.state,
			};
		}
		cache = next;

		const tail = value.slice(end);
		const tailLine = active.highlight(tail, next.state).lines[0] ?? [{ content: '', htmlStyle: '' }];
		lines.set([...next.lines, tailLine]);
	});

	return lines.asReadonly();
}
