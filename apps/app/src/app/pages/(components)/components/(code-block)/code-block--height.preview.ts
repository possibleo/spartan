import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideScrollText } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = Array.from({ length: 24 }, (_, index) => {
	const n = String(index + 1).padStart(2, '0');
	return `[${n}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`;
}).join('\n');

@Component({
	selector: 'spartan-code-block-height',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideScrollText })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideScrollText" />
					Logs
				</div>
				<div hlmCodeBlockActions>
					<button hlmCodeBlockCopyButton [value]="_output"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent class="scroll-fade-y max-h-40" [code]="_output"></pre>
		</div>
	`,
})
export class CodeBlockHeight {
	protected readonly _output = output;
}
