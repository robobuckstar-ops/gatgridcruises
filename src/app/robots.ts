import { MetadataRoute } from 'next'

// AI assistants and AI-search crawlers are a real and growing referral source
// for GatGrid (clients have found the site through ChatGPT). We explicitly
// welcome them to crawl public content — the same allow/disallow as any other
// bot — so recommendations and citations stay accurate. Admin + API stay off
// limits for everyone. llms.txt (served from /public) gives these crawlers a
// curated map of the most useful pages.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training crawler
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // ChatGPT live browsing on a user's behalf
  'ClaudeBot', // Anthropic crawler
  'Claude-User', // Claude live browsing on a user's behalf
  'anthropic-ai',
  'PerplexityBot', // Perplexity index
  'Perplexity-User',
  'Google-Extended', // Gemini / Vertex training signal
  'Applebot-Extended', // Apple Intelligence
  'Amazonbot',
  'Bytespider',
  'CCBot', // Common Crawl (feeds many models)
  'cohere-ai',
  'DuckAssistBot',
  'meta-externalagent', // Meta AI
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
