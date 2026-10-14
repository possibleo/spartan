import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)`;

@Component({
	selector: 'spartan-code-block-destructive',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideCircleAlert })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock variant="destructive">
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideCircleAlert" />
					Error
				</div>
				<div hlmCodeBlockActions>
					<button hlmCodeBlockCopyButton [value]="_output"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent [code]="_output"></pre>
		</div>
	`,
})
export class CodeBlockDestructive {
	protected readonly _output = output;
}
