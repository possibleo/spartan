import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { HlmMessageImports } from '@spartan-ng/helm/message';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })
  return result.toUIMessageStreamResponse()
}`;

@Component({
	selector: 'spartan-code-block-message',
	imports: [HlmCodeBlockImports, HlmMessageImports, HlmTypographyImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmMessage>
			<div hlmMessageContent>
				<p hlmP>Create a route handler that returns the stream:</p>
				<div hlmCodeBlock>
					<div hlmCodeBlockHeader>
						<div hlmCodeBlockTitle>
							<ng-icon name="lucideFileCode" />
							app/api/chat/route.ts
						</div>
						<div hlmCodeBlockActions>
							<button hlmCodeBlockCopyButton [value]="_code"></button>
						</div>
					</div>
					<pre hlmCodeBlockContent [code]="_code" [lineNumbers]="true"></pre>
				</div>
				<p hlmP>The client reads it with useChat.</p>
			</div>
		</div>
	`,
})
export class CodeBlockMessage {
	protected readonly _code = code;
}
