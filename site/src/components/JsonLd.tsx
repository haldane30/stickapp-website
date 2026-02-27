/**
 * Server component that renders JSON-LD structured data.
 * Used for SEO schema markup (Organization, Article, FAQPage, etc.)
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
