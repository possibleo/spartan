import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `$ pnpm build
> next build

 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)`;

@Component({
	selector: 'spartan-code-block-basic',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [code]="_output"></pre>
		</div>
	`,
})
export class CodeBlockBasic {
	protected readonly _output = output;
}
