import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBraces } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { highlightedCode } from '@spartan-ng/helm/code-block/highlight';

const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`;

@Component({
	selector: 'spartan-code-block-highlighting',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideBraces })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideBraces" />
					getWeather output
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
export class CodeBlockHighlighting {
	protected readonly _source = signal(code);
	private readonly _language = signal('json');
	protected readonly _lines = highlightedCode(this._source, this._language);
}
