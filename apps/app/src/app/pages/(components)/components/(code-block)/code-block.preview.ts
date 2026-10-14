import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideFileCode, lucideWrapText } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`;

@Component({
	selector: 'spartan-code-block-preview',
	imports: [HlmCodeBlockImports, HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideFileCode, lucideWrapText, lucideCopy })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideFileCode" />
					app/api/chat/route.ts
				</div>
				<div hlmCodeBlockActions>
					<button
						hlmBtn
						variant="ghost"
						size="icon-xs"
						aria-label="Wrap lines"
						[attr.aria-pressed]="_wrap()"
						(click)="_wrap.set(!_wrap())"
					>
						<ng-icon name="lucideWrapText" />
					</button>
					<button hlmCodeBlockCopyButton [value]="_code"></button>
				</div>
			</div>
			<pre hlmCodeBlockContent [lineNumbers]="true" [wrap]="_wrap()">
				@for (line of _lines; track $index) {
					<span hlmCodeBlockLine [variant]="$index >= 6 && $index <= 10 ? 'highlighted' : 'default'">{{
						line
					}}</span>
				}
			</pre>
		</div>
	`,
})
export class CodeBlockPreview {
	protected readonly _code = code;
	protected readonly _lines = code.split('\n');
	protected readonly _wrap = signal(false);
}

export const defaultImports = `
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
`;

export const defaultSkeleton = `
<div hlmCodeBlock>
  <div hlmCodeBlockHeader>
    <div hlmCodeBlockTitle>Terminal</div>
    <div hlmCodeBlockActions>
      <button hlmCodeBlockCopyButton [value]="output"></button>
    </div>
  </div>
  <pre hlmCodeBlockContent [code]="output"></pre>
</div>
`;
