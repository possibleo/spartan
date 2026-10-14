import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`;

@Component({
	selector: 'spartan-code-block-line-numbers',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [code]="_code" [lineNumbers]="true"></pre>
		</div>
	`,
})
export class CodeBlockLineNumbers {
	protected readonly _code = code;
}
