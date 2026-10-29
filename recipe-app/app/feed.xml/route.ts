export const dynamic = 'force-static';

import { blogPosts } from '@/lib/blog';

const BASE_URL = 'https://relishrealm.com';

export async function GET() {
  const posts = blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>chloe@relishrealm.com (${post.author.name})</author>
      <category>${post.category}</category>
      ${post.image ? `<enclosure url="${post.image.startsWith('http') ? post.image : BASE_URL + post.image}" type="image/jpeg" />` : ''}
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Relish Realm Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Discover delicious recipes, cooking tips, and food science insights from Relish Realm.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/icon.png</url>
      <title>Relish Realm Blog</title>
      <link>${BASE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
