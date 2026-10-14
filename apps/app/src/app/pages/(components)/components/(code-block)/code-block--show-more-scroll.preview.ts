import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const code = `"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        sendMessage({ text: input })
        setInput("")
      }}
    >
      {messages.map((message) => (
        <p key={message.id}>{message.id}</p>
      ))}
      <button disabled={status !== "ready"}>Send</button>
    </form>
  )
}`;

@Component({
	selector: 'spartan-code-block-show-more-scroll',
	imports: [HlmCodeBlockImports, HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideFileCode" />
					components/chat.tsx
				</div>
			</div>
			<pre
				hlmCodeBlockContent
				id="chat-source-capped"
				[class]="_expanded() ? 'scroll-fade-y max-h-80' : 'scroll-fade-y max-h-40 overflow-y-hidden'"
				[code]="_code"
			></pre>
			<div hlmCodeBlockFooter class="justify-center">
				<button
					hlmBtn
					variant="ghost"
					size="xs"
					aria-controls="chat-source-capped"
					[attr.aria-expanded]="_expanded()"
					(click)="_expanded.set(!_expanded())"
				>
					{{ _expanded() ? 'Show less' : 'Show more' }}
				</button>
			</div>
		</div>
	`,
})
export class CodeBlockShowMoreScroll {
	protected readonly _code = code;
	protected readonly _expanded = signal(false);
}
