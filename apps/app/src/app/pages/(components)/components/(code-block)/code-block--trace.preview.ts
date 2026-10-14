import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';

const output = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`;

@Component({
	selector: 'spartan-code-block-trace',
	imports: [HlmCodeBlockImports, HlmCollapsibleImports, HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideTerminal })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCollapsible class="flex flex-col gap-2">
			<button hlmBtn hlmCollapsibleTrigger variant="outline" class="w-fit">Failed to run pnpm dev</button>
			<div hlmCollapsibleContent>
				<div hlmCodeBlock size="sm">
					<div hlmCodeBlockHeader>
						<div hlmCodeBlockTitle>
							<ng-icon name="lucideTerminal" />
							Terminal
						</div>
					</div>
					<pre hlmCodeBlockContent class="max-h-64" [code]="_output" [wrap]="true"></pre>
				</div>
			</div>
		</div>
	`,
})
export class CodeBlockTrace {
	protected readonly _output = output;
}
