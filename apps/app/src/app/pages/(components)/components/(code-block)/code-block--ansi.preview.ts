import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { highlightedCode } from '@spartan-ng/helm/code-block/highlight';

const output = [
	'$ pnpm test',
	'\u001b[32m✓\u001b[39m src/format.test.ts \u001b[2m(4 tests)\u001b[22m',
	'\u001b[32m✓\u001b[39m src/parse.test.ts \u001b[2m(7 tests)\u001b[22m',
	'\u001b[31m✗\u001b[39m src/stream.test.ts \u001b[2m(3 tests | 1 failed)\u001b[22m',
	'',
	"\u001b[31mAssertionError: expected 'hello' to be 'hello world'\u001b[39m",
	'Tests  \u001b[31m1 failed\u001b[39m | \u001b[32m13 passed\u001b[39m (14)',
].join('\n');

@Component({
	selector: 'spartan-code-block-ansi',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideTerminal })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideTerminal" />
					Terminal
				</div>
			</div>
			<pre hlmCodeBlockContent>
				@for (line of _lines(); track $index) {
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
	`,
})
export class CodeBlockAnsi {
	private readonly _source = signal(output);
	private readonly _language = signal('ansi');
	protected readonly _lines = highlightedCode(this._source, this._language);
}
