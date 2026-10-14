import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;

@Component({
	selector: 'spartan-code-block-floating-actions',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockActions>
				<button hlmCodeBlockCopyButton [value]="_output"></button>
			</div>
			<pre hlmCodeBlockContent [code]="_output"></pre>
		</div>
	`,
})
export class CodeBlockFloatingActions {
	protected readonly _output = output;
}
