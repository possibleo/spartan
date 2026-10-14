import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
import { InstallTabs } from '@spartan-ng/app/app/shared/layout/install-tabs';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';
import { UIApiDocs } from '@spartan-ng/app/app/shared/layout/ui-docs-section/ui-docs-section';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';
import { Code } from '../../../../shared/code/code';
import { CodePreview } from '../../../../shared/code/code-preview';
import { MainSection } from '../../../../shared/layout/main-section';
import { PageBottomNav } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../../shared/layout/section-sub-heading';
import { Tabs } from '../../../../shared/layout/tabs';
import { metaWith } from '../../../../shared/meta/meta.util';
import { CodeBlockActions } from './code-block--actions.preview';
import { CodeBlockAnsi } from './code-block--ansi.preview';
import { CodeBlockBasic } from './code-block--basic.preview';
import { CodeBlockDestructive } from './code-block--destructive.preview';
import { CodeBlockDiff } from './code-block--diff.preview';
import { CodeBlockFloatingActions } from './code-block--floating-actions.preview';
import { CodeBlockHeader } from './code-block--header.preview';
import { CodeBlockHeight } from './code-block--height.preview';
import { CodeBlockHighlightedLines } from './code-block--highlighted-lines.preview';
import { CodeBlockHighlighting } from './code-block--highlighting.preview';
import { CodeBlockLanguages } from './code-block--languages.preview';
import { CodeBlockLineNumbers } from './code-block--line-numbers.preview';
import { CodeBlockMessage } from './code-block--message.preview';
import { CodeBlockRtl } from './code-block--rtl.preview';
import { CodeBlockShowMoreScroll } from './code-block--show-more-scroll.preview';
import { CodeBlockShowMore } from './code-block--show-more.preview';
import { CodeBlockSize } from './code-block--size.preview';
import { CodeBlockStartLine } from './code-block--start-line.preview';
import { CodeBlockStreaming } from './code-block--streaming.preview';
import { CodeBlockTabs } from './code-block--tabs.preview';
import { CodeBlockTrace } from './code-block--trace.preview';
import { CodeBlockTypeset } from './code-block--typeset.preview';
import { CodeBlockWrap } from './code-block--wrap.preview';
import { CodeBlockPreview, defaultImports, defaultSkeleton } from './code-block.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'code-block', api: 'code-block' },
	meta: metaWith(
		'spartan/ui - Code Block',
		'Displays code, terminal output and diffs with an optional header, line numbers and a copy button.',
	),
	title: 'spartan/ui - Code Block',
};

@Component({
	selector: 'spartan-code-block',
	imports: [
		MainSection,
		InstallTabs,
		Code,
		SectionIntro,
		SectionSubHeading,
		SectionSubSubHeading,
		Tabs,
		CodeBlockPreview,
		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		UIApiDocs,
		RtlHeader,
		CodeRtlPreview,
		HlmTypographyImports,
		CodeBlockBasic,
		CodeBlockHeader,
		CodeBlockActions,
		CodeBlockFloatingActions,
		CodeBlockLineNumbers,
		CodeBlockStartLine,
		CodeBlockWrap,
		CodeBlockHighlightedLines,
		CodeBlockDiff,
		CodeBlockHeight,
		CodeBlockShowMore,
		CodeBlockShowMoreScroll,
		CodeBlockSize,
		CodeBlockDestructive,
		CodeBlockTrace,
		CodeBlockTabs,
		CodeBlockMessage,
		CodeBlockTypeset,
		CodeBlockRtl,
		CodeBlockHighlighting,
		CodeBlockLanguages,
		CodeBlockAnsi,
		CodeBlockStreaming,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Code Block"
				lead="Displays code, terminal output and diffs with an optional header, line numbers and a copy button."
				showThemeToggle
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-code-block-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-install-tabs primitive="code-block" />

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_imports" />
				<spartan-code [code]="_codeSkeleton" />
			</div>
			<p hlmP>
				Syntax highlighting is optional. Import
				<span hlmCode>highlightedCode</span>
				from
				<span hlmCode>&#64;spartan-ng/helm/code-block/highlight</span>
				so a block that only shows plain output does not load Shiki.
			</p>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples__basic" spartanH4>Basic</h3>
			<p hlmP>
				Pass a string to
				<span hlmCode>code</span>
				. It renders as one text node.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-basic />
				</div>
				<spartan-code secondTab [code]="_basicCode()" />
			</spartan-tabs>

			<h3 id="examples__header" spartanH4>Header</h3>
			<p hlmP>
				<span hlmCode>hlmCodeBlockHeader</span>
				holds a title and actions.
				<span hlmCode>hlmCodeBlockCopyButton</span>
				copies its
				<span hlmCode>value</span>
				.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-header />
				</div>
				<spartan-code secondTab [code]="_headerCode()" />
			</spartan-tabs>

			<h3 id="examples__actions" spartanH4>Actions</h3>
			<p hlmP>
				Actions hold any number of buttons. Keep wrap state yourself and pass it to
				<span hlmCode>wrap</span>
				.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-actions />
				</div>
				<spartan-code secondTab [code]="_actionsCode()" />
			</spartan-tabs>

			<h3 id="examples__floating_actions" spartanH4>Floating actions</h3>
			<p hlmP>
				Without a header, put
				<span hlmCode>hlmCodeBlockActions</span>
				directly inside the block. The actions float at the top end and stay hidden until hover or focus.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-floating-actions />
				</div>
				<spartan-code secondTab [code]="_floatingActionsCode()" />
			</spartan-tabs>

			<h3 id="examples__line_numbers" spartanH4>Line numbers</h3>
			<p hlmP>
				Set
				<span hlmCode>lineNumbers</span>
				. A string is split into lines, and the numbers are not copied with a selection.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-line-numbers />
				</div>
				<spartan-code secondTab [code]="_lineNumbersCode()" />
			</spartan-tabs>

			<h3 id="examples__start_line" spartanH4>Start line</h3>
			<p hlmP>
				Set
				<span hlmCode>startLine</span>
				to number a snippet from the middle of a file.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-start-line />
				</div>
				<spartan-code secondTab [code]="_startLineCode()" />
			</spartan-tabs>

			<h3 id="examples__wrap" spartanH4>Wrap</h3>
			<p hlmP>
				Long lines scroll by default. Set
				<span hlmCode>wrap</span>
				to wrap them.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-wrap />
				</div>
				<spartan-code secondTab [code]="_wrapCode()" />
			</spartan-tabs>

			<h3 id="examples__highlighted_lines" spartanH4>Highlighted lines</h3>
			<p hlmP>
				Project each line as
				<span hlmCode>hlmCodeBlockLine</span>
				and set
				<span hlmCode>variant="highlighted"</span>
				.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-highlighted-lines />
				</div>
				<spartan-code secondTab [code]="_highlightedLinesCode()" />
			</spartan-tabs>

			<h3 id="examples__diff" spartanH4>Diff</h3>
			<p hlmP>
				<span hlmCode>variant="added"</span>
				and
				<span hlmCode>variant="removed"</span>
				add a + or − marker.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-diff />
				</div>
				<spartan-code secondTab [code]="_diffCode()" />
			</spartan-tabs>

			<h3 id="examples__height" spartanH4>Height</h3>
			<p hlmP>
				Cap the height with a
				<span hlmCode>max-h-*</span>
				class on the content. Add
				<span hlmCode>scroll-fade-y</span>
				so the edges fade while it scrolls.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-height />
				</div>
				<spartan-code secondTab [code]="_heightCode()" />
			</spartan-tabs>

			<h3 id="examples__show_more" spartanH4>Show more</h3>
			<p hlmP>
				<span hlmCode>hlmCodeBlockFooter</span>
				is a slot below the content. Cap the content while it is collapsed.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-show-more />
				</div>
				<spartan-code secondTab [code]="_showMoreCode()" />
			</spartan-tabs>

			<h4 id="examples__show_more_scroll" spartanH4>Max height</h4>
			<p hlmP>Raise the cap instead of removing it. The expanded content still scrolls.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-show-more-scroll />
				</div>
				<spartan-code secondTab [code]="_showMoreScrollCode()" />
			</spartan-tabs>

			<h3 id="examples__size" spartanH4>Size</h3>
			<p hlmP>
				Use
				<span hlmCode>size="sm"</span>
				for tool output. It has tighter padding and
				<span hlmCode>text-xs</span>
				text.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-size />
				</div>
				<spartan-code secondTab [code]="_sizeCode()" />
			</spartan-tabs>

			<h3 id="examples__destructive" spartanH4>Destructive</h3>
			<p hlmP>
				Use
				<span hlmCode>variant="destructive"</span>
				for errors and failed output.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-destructive />
				</div>
				<spartan-code secondTab [code]="_destructiveCode()" />
			</spartan-tabs>

			<h3 id="examples__trace" spartanH4>Trace</h3>
			<p hlmP>
				Spartan does not ship a Trace component. Put a
				<span hlmCode>size="sm"</span>
				block in a collapsible, with
				<span hlmCode>wrap</span>
				and a
				<span hlmCode>max-h-64</span>
				class, for the same tool-output treatment.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-trace />
				</div>
				<spartan-code secondTab [code]="_traceCode()" />
			</spartan-tabs>

			<h3 id="examples__tabs" spartanH4>Tabs</h3>
			<p hlmP>Show several files with tabs, one code block in each panel.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-tabs />
				</div>
				<spartan-code secondTab [code]="_tabsCode()" />
			</spartan-tabs>

			<h3 id="examples__message" spartanH4>Message</h3>
			<p hlmP>Put a code block between paragraphs inside a message.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-message />
				</div>
				<spartan-code secondTab [code]="_messageCode()" />
			</spartan-tabs>

			<h3 id="examples__typeset" spartanH4>Typeset</h3>
			<p hlmP>
				Spartan does not ship a typeset container. A code block inside typography keeps its own styles and sits in the
				same stack as the surrounding paragraphs.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-typeset />
				</div>
				<spartan-code secondTab [code]="_typesetCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<p hlmP>Code always reads left to right. The header follows the page direction.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-code-block-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="syntax-highlighting">Syntax highlighting</spartan-section-sub-heading>
			<p hlmP>
				<span hlmCode>highlightedCode</span>
				returns one token list per line. Render each token in an
				<span hlmCode>hlmCodeBlockLine</span>
				. Shiki uses its JavaScript regex engine, so there is no WASM to load.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-highlighting />
				</div>
				<spartan-code secondTab [code]="_highlightingCode()" />
			</spartan-tabs>

			<h3 id="examples__languages" spartanH4>Languages</h3>
			<p hlmP>
				The list ships with bash, css, diff, html, javascript, json, jsx, markdown, python, sql, tsx, typescript and
				yaml, plus aliases such as ts, js, sh and yml. A language that is not in the list renders as plain text.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-languages />
				</div>
				<spartan-code secondTab [code]="_languagesCode()" />
			</spartan-tabs>

			<h3 id="examples__ansi" spartanH4>Terminal output</h3>
			<p hlmP>
				Pass
				<span hlmCode>"ansi"</span>
				to render the colors in terminal output. ANSI colors do not carry from one line to the next.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-ansi />
				</div>
				<spartan-code secondTab [code]="_ansiCode()" />
			</spartan-tabs>

			<h3 id="examples__streaming" spartanH4>Streaming</h3>
			<p hlmP>While the code streams, the highlighter tokenizes only the new lines.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-code-block-streaming />
				</div>
				<spartan-code secondTab [code]="_streamingCode()" />
			</spartan-tabs>

			<p hlmP>
				<span hlmCode>highlightCode</span>
				is async, for a server render, and returns null when the language is not listed:
			</p>
			<spartan-code [code]="_serverHighlight" />

			<spartan-section-sub-heading id="hlm-api">Helm API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="helm" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="combobox" label="Combobox" />
				<spartan-page-bottom-nav-link direction="previous" href="collapsible" label="Collapsible" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class CodeBlockPage {
	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('code-block');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _basicCode = computed(() => this._snippets()['basic']);
	protected readonly _headerCode = computed(() => this._snippets()['header']);
	protected readonly _actionsCode = computed(() => this._snippets()['actions']);
	protected readonly _floatingActionsCode = computed(() => this._snippets()['floatingActions']);
	protected readonly _lineNumbersCode = computed(() => this._snippets()['lineNumbers']);
	protected readonly _startLineCode = computed(() => this._snippets()['startLine']);
	protected readonly _wrapCode = computed(() => this._snippets()['wrap']);
	protected readonly _highlightedLinesCode = computed(() => this._snippets()['highlightedLines']);
	protected readonly _diffCode = computed(() => this._snippets()['diff']);
	protected readonly _heightCode = computed(() => this._snippets()['height']);
	protected readonly _showMoreCode = computed(() => this._snippets()['showMore']);
	protected readonly _showMoreScrollCode = computed(() => this._snippets()['showMoreScroll']);
	protected readonly _sizeCode = computed(() => this._snippets()['size']);
	protected readonly _destructiveCode = computed(() => this._snippets()['destructive']);
	protected readonly _traceCode = computed(() => this._snippets()['trace']);
	protected readonly _tabsCode = computed(() => this._snippets()['tabs']);
	protected readonly _messageCode = computed(() => this._snippets()['message']);
	protected readonly _typesetCode = computed(() => this._snippets()['typeset']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _highlightingCode = computed(() => this._snippets()['highlighting']);
	protected readonly _languagesCode = computed(() => this._snippets()['languages']);
	protected readonly _ansiCode = computed(() => this._snippets()['ansi']);
	protected readonly _streamingCode = computed(() => this._snippets()['streaming']);
	protected readonly _imports = defaultImports;
	protected readonly _codeSkeleton = defaultSkeleton;
	protected readonly _serverHighlight = `import { highlightCode } from '@spartan-ng/helm/code-block/highlight';

const lines = (await highlightCode(code, 'tsx')) ?? code.split('\\n').map((line) => [{ content: line, htmlStyle: '' }]);`;

	constructor() {
		injectComponentDocs();
	}
}
