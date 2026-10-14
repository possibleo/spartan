import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { highlightedCode } from '@spartan-ng/helm/code-block/highlight';

const full = `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}`;

@Component({
	selector: 'spartan-code-block-streaming',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideFileCode" />
					hooks/use-debounce.ts
				</div>
			</div>
			<pre hlmCodeBlockContent [lineNumbers]="true">
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
export class CodeBlockStreaming {
	protected readonly _source = signal(full.slice(0, 24));
	private readonly _language = signal('ts');
	protected readonly _lines = highlightedCode(this._source, this._language);

	constructor() {
		const destroyRef = inject(DestroyRef);
		let index = this._source().length;
		const timer = setInterval(() => {
			index = Math.min(full.length, index + 4);
			this._source.set(full.slice(0, index));
			if (index >= full.length) {
				clearInterval(timer);
			}
		}, 30);
		destroyRef.onDestroy(() => clearInterval(timer));
	}
}
