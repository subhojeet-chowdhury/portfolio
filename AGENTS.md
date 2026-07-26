<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Architectural Guidelines & Design Patterns

The following architectural principles and design patterns MUST be adhered to when working in this repository:

## 1. Data-Driven UI (Headless Pattern)
- **Single Source of Truth**: All portfolio content (skills, experience phases, projects, tags) is centralized in `src/data/portfolio.json`. 
- **Rule**: NEVER hardcode text content, URLs, or lists directly inside React components. Always update the JSON file and map the data into the UI components. This ensures seamless migration to a backend CMS in the future.

## 2. Animation & UX (Framer Motion)
- **Scroll-Linked Animations**: Use `framer-motion` (`useScroll`, `useTransform`, `useSpring`) for viewport-driven animations (e.g., sticky stacked cards, drawing timelines).
- **Performance Rule**: Hoist heavy React logic out of the render loop. Bind motion values directly to the `style` prop of `motion.div` elements to ensure animations run on the compositor thread and maintain 60fps. Avoid triggering React state updates on scroll.

## 3. WebGL & 3D Graphics
- **Tech Stack**: Use `@react-three/fiber` and `@react-three/drei`.
- **Optimization Rule**: Keep WebGL meshes extremely lightweight. For heavy geometries, use `InstancedMesh` (like the starfield). For fallbacks and decorative elements, use primitive geometries (e.g., `Icosahedron`) with basic noise shaders (`MeshDistortMaterial`). Destroy WebGL canvases immediately when they are no longer in the viewport or are replaced by static images.

## 4. UI/UX Design System
- **Premium Dark Mode**: Rely on the custom color tokens defined in the theme: `void` (pure dark background), `ghost` (bright white text), `static` (muted text), and `wave-cyan` (primary accent).
- **Layout Patterns**: 
  - **Bento Grids**: Use for dense, categorized data (e.g., Skills). Keep it to 3-5 high-impact cards.
  - **Split Layouts**: Use for project cards (Text on the left, Visuals/3D on the right with a 4/3 aspect ratio).
  - **Interactive Micro-interactions**: Utilize magnetic hover tracking (3D tilts) and cursor-tracking spotlights over static CSS hover effects where possible.

## 5. Code Quality
- **Strict TypeScript**: No implicit `any`. Types must be explicitly defined. If `any` must be used due to upstream library limitations, wrap it in a localized `eslint-disable` comment.
- **Linting**: The repository must pass `npm run lint` with 0 errors before any commit is made.
