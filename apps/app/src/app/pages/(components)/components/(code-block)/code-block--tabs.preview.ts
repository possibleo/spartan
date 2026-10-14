import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

const route = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })
  return result.toUIMessageStreamResponse()
}`;

const client = `"use client"

import { useChat } from "@ai-sdk/react"

export function Chat() {
  const { messages } = useChat()
  return <pre>{JSON.stringify(messages, null, 2)}</pre>
}`;

@Component({
	selector: 'spartan-code-block-tabs',
	imports: [HlmCodeBlockImports, HlmTabsImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmTabs tab="route">
			<div hlmTabsList aria-label="Files">
				<button hlmTabsTrigger="route">route.ts</button>
				<button hlmTabsTrigger="client">chat.tsx</button>
			</div>
			<div hlmTabsContent="route">
				<div hlmCodeBlock>
					<div hlmCodeBlockHeader>
						<div hlmCodeBlockTitle>
							<ng-icon name="lucideFileCode" />
							app/api/chat/route.ts
						</div>
						<div hlmCodeBlockActions>
							<button hlmCodeBlockCopyButton [value]="_route"></button>
						</div>
					</div>
					<pre hlmCodeBlockContent [code]="_route"></pre>
				</div>
			</div>
			<div hlmTabsContent="client">
				<div hlmCodeBlock>
					<div hlmCodeBlockHeader>
						<div hlmCodeBlockTitle>
							<ng-icon name="lucideFileCode" />
							components/chat.tsx
						</div>
						<div hlmCodeBlockActions>
							<button hlmCodeBlockCopyButton [value]="_client"></button>
						</div>
					</div>
					<pre hlmCodeBlockContent [code]="_client"></pre>
				</div>
			</div>
		</div>
	`,
})
export class CodeBlockTabs {
	protected readonly _route = route;
	protected readonly _client = client;
}
