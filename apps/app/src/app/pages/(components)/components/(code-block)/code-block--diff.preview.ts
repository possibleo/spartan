import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const lines = [
	{ text: 'export function Greeting({ name }: { name: string }) {', variant: 'default' },
	{ text: '  return <p>Hello, {name}</p>', variant: 'removed' },
	{ text: '  return (', variant: 'added' },
	{ text: '    <p className="text-sm text-muted-foreground">', variant: 'added' },
	{ text: '      Hello, {name}!', variant: 'added' },
	{ text: '    </p>', variant: 'added' },
	{ text: '  )', variant: 'added' },
	{ text: '}', variant: 'default' },
] as const;

@Component({
	selector: 'spartan-code-block-diff',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideFileCode" />
					components/greeting.tsx
				</div>
				<div hlmCodeBlockActions>
					<button hlmCodeBlockCopyButton [value]="_source"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent [lineNumbers]="true">
				@for (line of _lines; track $index) {
					<span hlmCodeBlockLine [variant]="line.variant">{{ line.text }}</span>
				}
			</pre>
		</div>
	`,
})
export class CodeBlockDiff {
	protected readonly _lines = lines;
	protected readonly _source = lines.map((line) => line.text).join('\n');
}
