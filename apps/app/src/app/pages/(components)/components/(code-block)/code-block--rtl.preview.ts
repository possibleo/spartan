import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTerminal } from '@ng-icons/lucide';
import { TranslateService, type Translations } from '@spartan-ng/app/app/shared/translate.service';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';

const output = `pnpm add ai @ai-sdk/react zod
pnpm dev`;

@Component({
	selector: 'spartan-code-block-rtl',
	imports: [HlmCodeBlockImports, HlmTypographyImports, NgIcon],
	providers: [provideIcons({ lucideTerminal })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div class="flex flex-col gap-4" [dir]="_dir()">
			<p hlmP>{{ _lead() }}</p>
			<div hlmCodeBlock>
				<div hlmCodeBlockHeader>
					<div hlmCodeBlockTitle>
						<ng-icon name="lucideTerminal" />
						{{ _title() }}
					</div>
					<div hlmCodeBlockActions>
						<button hlmCodeBlockCopyButton [value]="_output"></button>
					</div>
				</div>
				<pre hlmCodeBlockContent [code]="_output"></pre>
			</div>
		</div>
	`,
})
export class CodeBlockRtl {
	private readonly _language = inject(TranslateService).language;
	protected readonly _output = output;

	private readonly _translations: Translations<{ lead: string; title: string }> = {
		en: { dir: 'ltr', values: { lead: 'Install the packages, then start the dev server.', title: 'Terminal' } },
		ar: { dir: 'rtl', values: { lead: 'ثبّت الحزم، ثم شغّل خادم التطوير.', title: 'طرفية' } },
		he: { dir: 'rtl', values: { lead: 'התקינו את החבילות, ואז הפעילו את שרת הפיתוח.', title: 'מסוף' } },
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _dir = computed(() => this._translation().dir);
	protected readonly _lead = computed(() => this._translation().values.lead);
	protected readonly _title = computed(() => this._translation().values.title);
}
