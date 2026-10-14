import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const output = `$ pnpm add ai @ai-sdk/react zod
Done in 2.8s using pnpm v10.18.0`;

export default {
	title: 'Code Block',
	decorators: [
		moduleMetadata({
			imports: [HlmCodeBlockImports],
		}),
	],
} as Meta;

type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		props: { output },
		template: `
			<div hlmCodeBlock class="max-w-xl">
				<div hlmCodeBlockHeader>
					<div hlmCodeBlockTitle>Terminal</div>
					<div hlmCodeBlockActions>
						<button hlmCodeBlockCopyButton [value]="output"></button>
					</div>
				</div>
				<pre hlmCodeBlockContent [code]="output" [lineNumbers]="true"></pre>
			</div>
		`,
	}),
};

export const Destructive: Story = {
	render: () => ({
		props: { output: 'Error: listen EADDRINUSE :::3000' },
		template: `
			<div hlmCodeBlock variant="destructive" class="max-w-xl">
				<div hlmCodeBlockHeader>
					<div hlmCodeBlockTitle>Error</div>
				</div>
				<pre hlmCodeBlockContent [code]="output"></pre>
			</div>
		`,
	}),
};

export const Small: Story = {
	render: () => ({
		props: { output },
		template: `
			<div hlmCodeBlock size="sm" class="max-w-xl">
				<pre hlmCodeBlockContent [code]="output" [wrap]="true"></pre>
			</div>
		`,
	}),
};
