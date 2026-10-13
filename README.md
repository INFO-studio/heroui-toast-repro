# HeroUI Toast stacking alignment reproduction

Minimal reproduction for a HeroUI v3 Toast alignment issue.

## Live reproduction

https://info-studio.github.io/heroui-toast-repro/

## Environment

- @heroui/react: 3.2.6
- @heroui/styles: 3.2.6
- React / React DOM: 19.3.0
- Tailwind CSS: 4.3.3
- Vite: 8.3.4

The project uses the official HeroUI stylesheet entry:

~~~css
@import "@heroui/styles";
~~~

There is no custom theme or custom Toast CSS.

## Reproduction matrix

1. A standalone success toast renders correctly.
2. A standalone danger toast with a description renders correctly.
3. A danger toast followed immediately by a success toast from an external control renders correctly.
4. A danger toast whose description button spawns success toasts reproduces the issue.

For case 4, click **Create an interactive danger toast**, then click **Spawn success toast** inside the danger toast description three times without clearing the stack:

- The success toasts created by the first and second clicks show the indicator/title vertical misalignment.
- After the third consecutive click, the alignment becomes correct again.

## Run locally

~~~bash
pnpm install
pnpm dev
~~~

Then open the URL printed by Vite.

## Build

~~~bash
pnpm build
~~~

## Type-check

~~~bash
pnpm typecheck
~~~
