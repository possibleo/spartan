import { ChangeDetectionStrategy, Component, ElementRef, afterEveryRender, input, viewChild } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const codeBlockLineVariants = cva(
	"spartan-code-block-line relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
	{
		variants: {
			variant: {
				default: 'spartan-code-block-line-variant-default',
				added: 'spartan-code-block-line-variant-added',
				removed: 'spartan-code-block-line-variant-removed',
				highlighted: 'spartan-code-block-line-variant-highlighted',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>;

@Component({
	selector: 'span[hlm-code-block-line], span[hlmCodeBlockLine]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'code-block-line',
		'[attr.data-variant]': 'variant()',
	},
	template: `
		<span #content data-slot="code-block-line-content" class="min-w-0">
			<ng-content />
		</span>
	`,
})
export class HlmCodeBlockLine {
	private readonly _content = viewChild.required<ElementRef<HTMLElement>>('content');

	/** The state of the line. Added and removed lines include a marker that is not part of the selection. */
	public readonly variant = input<CodeBlockLineVariants['variant']>('default');

	constructor() {
		classes(() => codeBlockLineVariants({ variant: this.variant() }));

		// An empty line holds a newline so copying a selection keeps blank lines.
		afterEveryRender(() => {
			const element = this._content().nativeElement;
			if (element.textContent === '') {
				element.textContent = '\n';
			}
		});
	}
}
