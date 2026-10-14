import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const code = `"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) =>
            part.type === "text" ? <p key={index}>{part.text}</p> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`;

@Component({
	selector: 'spartan-code-block-show-more',
	imports: [HlmCodeBlockImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<pre
				hlmCodeBlockContent
				id="chat-source"
				[class]="_expanded() ? '' : 'scroll-fade-y max-h-64 overflow-y-hidden'"
				[code]="_code"
			></pre>
			<div hlmCodeBlockFooter class="justify-center">
				<button
					hlmBtn
					variant="ghost"
					size="xs"
					aria-controls="chat-source"
					[attr.aria-expanded]="_expanded()"
					(click)="_expanded.set(!_expanded())"
				>
					{{ _expanded() ? 'Show less' : 'Show more' }}
				</button>
			</div>
		</div>
	`,
})
export class CodeBlockShowMore {
	protected readonly _code = code;
	protected readonly _expanded = signal(false);
}
