import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal, lucideWrapText } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const output = `$ pnpm lint
apps/web/components/message-list.tsx
  18:22  error  'messages' is possibly 'undefined'. Add a guard before calling map  @typescript-eslint/no-unsafe-call
  42:7   warning  React Hook React.useEffect has a missing dependency: 'scrollToBottom'  react-hooks/exhaustive-deps

✖ 2 problems (1 error, 1 warning)`;

@Component({
	selector: 'spartan-code-block-actions',
	imports: [HlmCodeBlockImports, HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideTerminal, lucideWrapText })],
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
					<button
						hlmBtn
						variant="ghost"
						size="icon-xs"
						aria-label="Wrap lines"
						[attr.aria-pressed]="_wrap()"
						(click)="_wrap.set(!_wrap())"
					>
						<ng-icon name="lucideWrapText" />
					</button>
					<button hlmCodeBlockCopyButton [value]="_output"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent [code]="_output" [wrap]="_wrap()"></pre>
		</div>
	`,
})
export class CodeBlockActions {
	protected readonly _output = output;
	protected readonly _wrap = signal(false);
}
