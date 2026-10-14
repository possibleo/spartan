import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { highlightedCode } from '@spartan-ng/helm/code-block/highlight';

const python = `def greet(name: str) -> str:
    return f"Hello, {name}!"`;

const plain = `A language that is not in the list renders as plain text.`;

@Component({
	selector: 'spartan-code-block-languages',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full max-w-xl flex-col gap-4 text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>main.py</div>
			</div>
			<pre hlmCodeBlockContent>
				@for (line of _pythonLines(); track $index) {
					<span hlmCodeBlockLine>
						@for (token of line; track $index) {
							<span class="text-(--shiki-light) dark:text-(--shiki-dark)" [attr.style]="token.htmlStyle">{{
								token.content
							}}</span>
						}
					</span>
				}
			</pre>
		</div>
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent>
				@for (line of _plainLines(); track $index) {
					<span hlmCodeBlockLine>
						@for (token of line; track $index) {
							<span>{{ token.content }}</span>
						}
					</span>
				}
			</pre>
		</div>
	`,
})
export class CodeBlockLanguages {
	private readonly _python = signal(python);
	private readonly _pythonLanguage = signal('python');
	protected readonly _pythonLines = highlightedCode(this._python, this._pythonLanguage);

	private readonly _plain = signal(plain);
	private readonly _plainLanguage = signal('toml');
	protected readonly _plainLines = highlightedCode(this._plain, this._plainLanguage);
}
