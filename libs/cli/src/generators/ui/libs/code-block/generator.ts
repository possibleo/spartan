import { type Tree, updateJson } from '@nx/devkit';
import { getRootTsConfigPathInTree } from '@nx/js';
import hlmBaseGenerator from '../../../base/generator';
import type { HlmBaseGeneratorSchema } from '../../../base/schema';

export async function generator(tree: Tree, options: HlmBaseGeneratorSchema) {
	const task = await hlmBaseGenerator(tree, { ...options, name: 'code-block' });
	const directory = (options.directory ?? '').replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/$/, '');
	const highlightAlias = `${options.importAlias}/code-block/highlight`;
	const highlightPath = `./${directory}/code-block/src/highlight.ts`;

	updateJson(tree, getRootTsConfigPathInTree(tree), (json) => {
		json.compilerOptions ||= {};
		json.compilerOptions.paths ||= {};
		json.compilerOptions.paths[highlightAlias] = [highlightPath];
		return json;
	});

	return task;
}
