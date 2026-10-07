/**
 * Renders a schema.org JSON-LD block. Server-rendered, so crawlers see it in
 * the initial HTML.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own data files, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
