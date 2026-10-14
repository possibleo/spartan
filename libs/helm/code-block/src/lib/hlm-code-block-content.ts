import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { HlmCodeBlockLine } from './hlm-code-block-line';

@Component({
	selector: 'pre[hlm-code-block-content], pre[hlmCodeBlockContent]',
	imports: [HlmCodeBlockLine],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'code-block-content',
		dir: 'ltr',
		'[attr.data-wrap]': 'wrap() ? "" : null',
		'[attr.data-numbered]': 'lineNumbers() ? "" : null',
		'[attr.tabindex]': 'tabIndex()',
		'[style.counter-reset]': '_counterReset()',
	},
	template: `
		<code
			data-slot="code-block-code"
			class="spartan-code-block-code grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
		>
			@if (code() !== undefined && lineNumbers()) {
				@for (line of _numberedLines(); track $index) {
					<span hlmCodeBlockLine>{{ line.length === 0 ? _newline : line }}</span>
				}
			} @else if (code() !== undefined) {
				{{ code() }}
			} @else {
				<ng-content />
			}
		</code>
	`,
})
export class HlmCodeBlockContent {
	protected readonly _newline = '\n';

	/**
	 * A string of code or output. Leave unset to project `hlmCodeBlockLine` children.
	 * A string renders as one text node unless `lineNumbers` is set.
	 */
	public readonly code = input<string | undefined>(undefined);

	/** Wrap long lines instead of scrolling. */
	public readonly wrap = input<boolean>(false);

	/** Number each line. A string `code` value is split into lines. */
	public readonly lineNumbers = input<boolean>(false);

	/** The number of the first line, when `lineNumbers` is set. */
	public readonly startLine = input<number>(1);

	/** Makes the content focusable so it can be scrolled by keyboard. */
	public readonly tabIndex = input<number>(0);

	protected readonly _numberedLines = computed(() => {
		const value = this.code();
		if (value === undefined) {
			return [];
		}
		return value.replace(/\n$/, '').split('\n');
	});

	protected readonly _counterReset = computed(() => `line ${this.startLine() - 1}`);

	constructor() {
		classes(
			() =>
				'spartan-code-block-content scroll-fade-x data-wrap:scroll-fade-y min-h-0 min-w-0 overflow-auto text-start font-mono outline-none data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
		);
	}
}
