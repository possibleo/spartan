import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const lines = [
	{ text: 'export default {', variant: 'default' },
	{ text: '  experimental: {', variant: 'highlighted' },
	{ text: '    reactCompiler: true,', variant: 'highlighted' },
	{ text: '    viewTransition: true,', variant: 'highlighted' },
	{ text: '  },', variant: 'default' },
	{ text: '  images: {', variant: 'default' },
	{ text: '    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],', variant: 'default' },
	{ text: '  },', variant: 'default' },
	{ text: '}', variant: 'default' },
] as const;

@Component({
	selector: 'spartan-code-block-highlighted-lines',
	imports: [HlmCodeBlockImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [lineNumbers]="true">
				@for (line of _lines; track $index) {
					<span hlmCodeBlockLine [variant]="line.variant">{{ line.text }}</span>
				}
			</pre>
		</div>
	`,
})
export class CodeBlockHighlightedLines {
	protected readonly _lines = lines;
}
