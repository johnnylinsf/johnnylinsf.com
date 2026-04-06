import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold tracking-tight text-foreground mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[15px] text-foreground/80 leading-relaxed mb-4">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-link underline decoration-link/30 hover:decoration-link"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="text-[15px] text-foreground/80 space-y-1 mb-4 ml-4 list-disc [ul>&]:mt-1 [ul>&]:mb-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-[15px] text-foreground/80 space-y-1 mb-4 ml-4 list-decimal [ol>&]:mt-1 [ol>&]:mb-0">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed pl-0.5">{children}</li>,
    hr: () => <hr className="border-border my-8" />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border pl-4 text-muted my-4">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    ...components,
  };
}
