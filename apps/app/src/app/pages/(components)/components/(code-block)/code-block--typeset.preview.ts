import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })
  return result.toUIMessageStreamResponse()
}`;

@Component({
	selector: 'spartan-code-block-typeset',
	imports: [HlmCodeBlockImports, HlmTypographyImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div class="flex flex-col gap-4">
			<h3 hlmH3>Stream a response</h3>
			<p hlmP>Create a route handler that calls streamText and returns the stream to the client.</p>
			<div hlmCodeBlock>
				<div hlmCodeBlockHeader>
					<div hlmCodeBlockTitle>
						<ng-icon name="lucideFileCode" />
						app/api/chat/route.ts
					</div>
				</div>
				<pre hlmCodeBlockContent [code]="_code"></pre>
			</div>
			<p hlmP>The useChat hook reads the stream on the client and renders the answer while it is written.</p>
		</div>
	`,
})
export class CodeBlockTypeset {
	protected readonly _code = code;
}
