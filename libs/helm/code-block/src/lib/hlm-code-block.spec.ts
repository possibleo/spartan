import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { HlmCodeBlock } from './hlm-code-block';
import { HlmCodeBlockContent } from './hlm-code-block-content';
import { HlmCodeBlockCopyButton } from './hlm-code-block-copy-button';

@Component({
	selector: 'hlm-code-block-mock',
	imports: [HlmCodeBlock, HlmCodeBlockContent, HlmCodeBlockCopyButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmCodeBlock>
			<pre hlmCodeBlockContent [code]="code()" [lineNumbers]="true"></pre>
			<button hlmCodeBlockCopyButton [value]="code()">Copy</button>
		</div>
	`,
})
class Mock {
	public readonly code = signal('alpha\n\nomega\n');
}

describe('HlmCodeBlock', () => {
	let fixture: ComponentFixture<Mock>;

	beforeEach(() => {
		fixture = TestBed.createComponent(Mock);
	});

	it('splits a string into numbered lines and keeps a blank line', () => {
		fixture.detectChanges();
		const lines = fixture.nativeElement.querySelectorAll('[data-slot="code-block-line-content"]');
		expect(lines.length).toBe(3);
		expect(lines[0].textContent).toBe('alpha');
		expect(lines[1].textContent).toBe('\n');
		expect(lines[2].textContent).toBe('omega');
		expect(fixture.nativeElement.querySelector('[data-slot="code-block-content"]').getAttribute('dir')).toBe('ltr');
	});

	it('announces a successful copy', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal('navigator', { clipboard: { writeText } });
		fixture.detectChanges();

		const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-slot="code-block-copy-button"]');
		expect(button.getAttribute('aria-label')).toBe('Copy');
		button.click();
		await writeText.mock.results[0]?.value;
		fixture.detectChanges();

		expect(writeText).toHaveBeenCalledWith('alpha\n\nomega\n');
		expect(button.getAttribute('aria-label')).toBe('Copied');
		expect(button.querySelector('[aria-live="polite"]')?.textContent).toBe('Copied');
	});
});
