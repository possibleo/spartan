import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`;

@Component({
	selector: 'spartan-code-block-wrap',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full max-w-xl flex-col gap-4 text-start' },
	template: `
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [code]="_output"></pre>
		</div>
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [code]="_output" [wrap]="true"></pre>
		</div>
	`,
})
export class CodeBlockWrap {
	protected readonly _output = output;
}
