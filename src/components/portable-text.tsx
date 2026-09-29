import React from "react"

export type PortableTextSpan = {
  _key: string
  _type: "span"
  text: string
  marks?: string[]
}

export type PortableTextMarkDef = {
  _key: string
  _type: string
  href?: string
  [key: string]: unknown
}

export type PortableTextBlock = {
  _key: string
  _type: "block" | "image" | string
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote"
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
  listItem?: "bullet" | "number"
  level?: number
  asset?: { url: string }
  url?: string
  alt?: string
  caption?: string
}

export type PortableTextComponents = {
  block?: Record<string, (props: { children: React.ReactNode; value: PortableTextBlock }) => React.ReactNode>
  list?: Record<string, (props: { children: React.ReactNode; value?: PortableTextBlock }) => React.ReactNode>
  listItem?: Record<string, (props: { children: React.ReactNode; value?: PortableTextBlock }) => React.ReactNode>
  marks?: Record<string, (props: { children: React.ReactNode; value?: PortableTextMarkDef; markType?: string }) => React.ReactNode>
  types?: Record<string, (props: { value: PortableTextBlock }) => React.ReactNode>
}

export const defaultShadcnTypographyComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 font-serif text-3xl font-bold sm:text-4xl text-ink mt-12 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 font-serif pt-4 text-2xl sm:text-3xl font-bold tracking-tight text-ink first:mt-0 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 font-serif text-lg sm:text-xl font-bold tracking-tight text-ink mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-7 not-first:mt-6 text-base sm:text-lg text-ink/85">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 mb-8 border-l-4 border-gold pl-6 italic text-lg sm:text-xl text-ink/80 py-1">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 leading-7 text-ink/85 text-base sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 leading-7 text-ink/85 text-base sm:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="relative rounded bg-ink/5 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-ink">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http")
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-medium text-navy underline decoration-gold underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10 space-y-2">
        <div className="overflow-hidden rounded-xl ring-1 ring-ink/10">
          <img
            src={value?.asset?.url || value?.url}
            alt={value?.alt || ""}
            className="size-full object-cover"
          />
        </div>
        {value?.caption && (
          <figcaption className="text-center text-xs text-stone italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

function renderSpan(
  span: PortableTextSpan,
  markDefs: PortableTextMarkDef[] = [],
  marksComponents: PortableTextComponents["marks"] = {}
): React.ReactNode {
  let content: React.ReactNode = span.text

  if (!span.marks || span.marks.length === 0) {
    return content
  }

  // Apply decorators and annotations
  for (const mark of span.marks) {
    // Check if mark matches a markDef key (annotation, e.g. link)
    const markDef = markDefs.find((def) => def._key === mark)
    if (markDef) {
      const MarkRenderer = marksComponents[markDef._type]
      if (MarkRenderer) {
        content = MarkRenderer({ children: content, value: markDef, markType: markDef._type })
      } else if (markDef._type === "link") {
        content = (
          <a
            key={mark}
            href={markDef.href}
            className="font-medium text-navy underline decoration-gold underline-offset-4 hover:opacity-80"
          >
            {content}
          </a>
        )
      }
    } else {
      // Decorator (strong, em, code, etc.)
      const DecoratorRenderer = marksComponents[mark]
      if (DecoratorRenderer) {
        content = DecoratorRenderer({ children: content, markType: mark })
      } else if (mark === "strong") {
        content = <strong key={mark} className="font-semibold text-ink">{content}</strong>
      } else if (mark === "em") {
        content = <em key={mark} className="italic">{content}</em>
      } else if (mark === "code") {
        content = (
          <code key={mark} className="relative rounded bg-ink/5 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-ink">
            {content}
          </code>
        )
      }
    }
  }

  return content
}

/**
 * Standard Sanity-compatible Portable Text Renderer using Shadcn typography.
 * Directly interchangeable with `@portabletext/react`'s `<PortableText />` when Sanity is integrated.
 */
export function PortableText({
  value,
  components = defaultShadcnTypographyComponents,
}: {
  value: PortableTextBlock[]
  components?: PortableTextComponents
}) {
  if (!value || !Array.isArray(value)) return null

  const merged = {
    block: { ...defaultShadcnTypographyComponents.block, ...components.block },
    list: { ...defaultShadcnTypographyComponents.list, ...components.list },
    listItem: { ...defaultShadcnTypographyComponents.listItem, ...components.listItem },
    marks: { ...defaultShadcnTypographyComponents.marks, ...components.marks },
    types: { ...defaultShadcnTypographyComponents.types, ...components.types },
  }

  const renderedNodes: React.ReactNode[] = []
  let currentList: { type: string; items: React.ReactNode[] } | null = null

  const flushList = () => {
    if (currentList) {
      const ListRenderer = merged.list[currentList.type] || merged.list.bullet
      renderedNodes.push(
        <React.Fragment key={`list-${renderedNodes.length}`}>
          {ListRenderer({ children: currentList.items })}
        </React.Fragment>
      )
      currentList = null
    }
  }

  value.forEach((block, index) => {
    // Custom block types (like image)
    if (block._type !== "block") {
      flushList()
      const TypeRenderer = merged.types[block._type]
      if (TypeRenderer) {
        renderedNodes.push(
          <React.Fragment key={block._key || index}>
            {TypeRenderer({ value: block })}
          </React.Fragment>
        )
      }
      return
    }

    // List item handling
    if (block.listItem) {
      const listType = block.listItem
      if (!currentList || currentList.type !== listType) {
        flushList()
        currentList = { type: listType, items: [] }
      }

      const ItemRenderer = merged.listItem[listType] || (({ children }) => <li>{children}</li>)
      const renderedChildren = block.children?.map((span, sIdx) => (
        <React.Fragment key={span._key || sIdx}>
          {renderSpan(span, block.markDefs, merged.marks)}
        </React.Fragment>
      ))

      currentList.items.push(
        <React.Fragment key={block._key || index}>
          {ItemRenderer({ children: renderedChildren, value: block })}
        </React.Fragment>
      )
      return
    }

    flushList()

    // Normal text block handling
    const style = block.style || "normal"
    const BlockRenderer = merged.block[style] || merged.block.normal

    const renderedChildren = block.children?.map((span, sIdx) => (
      <React.Fragment key={span._key || sIdx}>
        {renderSpan(span, block.markDefs, merged.marks)}
      </React.Fragment>
    ))

    renderedNodes.push(
      <React.Fragment key={block._key || index}>
        {BlockRenderer({ children: renderedChildren, value: block })}
      </React.Fragment>
    )
  })

  flushList()

  return <div className="space-y-6">{renderedNodes}</div>
}
