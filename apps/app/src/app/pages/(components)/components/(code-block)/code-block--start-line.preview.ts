import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode } from '@ng-icons/lucide';
import { HlmCodeBlockImports } from '@spartan-ng/helm/code-block';

const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />`;

@Component({
	selector: 'spartan-code-block-start-line',
	imports: [HlmCodeBlockImports, NgIcon],
	providers: [provideIcons({ lucideFileCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-xl text-start' },
	template: `
		<div hlmCodeBlock>
			<div hlmCodeBlockHeader>
				<div hlmCodeBlockTitle>
					<ng-icon name="lucideFileCode" />
					app/dashboard/page.tsx
				</div>
			</div>
			<pre hlmCodeBlockContent [code]="_code" [lineNumbers]="true" [startLine]="48"></pre>
		</div>
	`,
})
export class CodeBlockStartLine {
	protected readonly _code = code;
}
