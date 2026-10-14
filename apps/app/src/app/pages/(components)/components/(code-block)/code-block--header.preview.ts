import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `$ pnpm add ai @ai-sdk/react zod
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;

@Component({
	selector: 'spartan-code-block-header',
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
				<div hlmCodeBlockActions>
					<button hlmCodeBlockCopyButton [value]="_output"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent [code]="_output"></pre>
		</div>
	`,
})
export class CodeBlockHeader {
	protected readonly _output = output;
}
