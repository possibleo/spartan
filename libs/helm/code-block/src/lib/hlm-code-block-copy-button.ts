import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '@spartan-ng/helm/button';

@Component({
	selector: 'button[hlm-code-block-copy-button], button[hlmCodeBlockCopyButton]',
	imports: [NgIcon],
	providers: [provideIcons({ lucideCopy, lucideCheck }), provideBrnButtonConfig({ variant: 'ghost', size: 'icon-xs' })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
	host: {
		type: 'button',
		'data-slot': 'code-block-copy-button',
		'[attr.data-copied]': '_copied() ? "" : null',
		'[attr.aria-label]': '_copied() ? "Copied" : "Copy"',
		'(click)': 'copy()',
	},
	template: `
		<ng-icon [name]="_copied() ? 'lucideCheck' : 'lucideCopy'" />
		<span aria-live="polite" class="sr-only">{{ _copied() ? 'Copied' : '' }}</span>
	`,
})
export class HlmCodeBlockCopyButton {
	/** The text to copy. Line numbers and diff markers are not included; pass the source string. */
	public readonly value = input.required<string>();

	protected readonly _copied = signal(false);

	constructor() {
		inject(HlmButton).setClass('spartan-code-block-copy-button');

		effect((onCleanup) => {
			if (!this._copied()) {
				return;
			}
			const timeout = setTimeout(() => this._copied.set(false), 2000);
			onCleanup(() => clearTimeout(timeout));
		});
	}

	protected copy(): void {
		navigator.clipboard
			.writeText(this.value())
			.then(() => this._copied.set(true))
			.catch(() => undefined);
	}
}
