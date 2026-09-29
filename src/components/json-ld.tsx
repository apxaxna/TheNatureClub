type JsonLdNode = Record<string, unknown>

/**
 * Renders schema.org structured data. Several nodes are emitted as one @graph.
 * `<` is escaped so CMS text can't break out of the script tag.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  )
}
