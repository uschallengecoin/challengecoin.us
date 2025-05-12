import { PageData } from 'vitepress';

export function generateJsonLd(pageData: PageData, env: any, theme: any): string | null {
  const baseUrl = `${env.FRONTEND_URL}/${pageData.relativePath?.replace(/index\.md$/, '')?.replace(/\.md$/, '.html')}`;
  const keywords = pageData.frontmatter.keywords || pageData.frontmatter.tags;

  const commonData = {
    '@context': 'https://schema.org',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
    name: pageData.title,
    url: baseUrl,
    description: pageData.description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    inLanguage: 'en-us',
    telephone: theme.contacts.phone,
    email: theme.contacts.email,
    sameAs: [
      'https://www.linkedin.com/company/challengecoin.us',
      'https://www.facebook.com/challengecoin.us',
      'https://www.instagram.com/challengecoin.us',
      'https://github.com/uschallengecoin',
      'https://x.com/challengecoin.us',
      'https://www.tiktok.com/@challengecoin.us',
      'https://t.me/challengecoin.us',
    ],
  };

  if (pageData.frontmatter.jsonLDType) {
    return JSON.stringify({
      ...commonData,
      '@type': pageData.frontmatter.jsonLDType,
      provider: {
        '@type': 'Organization',
        '@id': env.FRONTEND_URL,
        name: pageData.title,
        logo: {
          '@type': 'ImageObject',
          '@id': `${env.FRONTEND_URL}/public/images/logo.svg`,
          url: `${env.FRONTEND_URL}/public/images/logo.svg`,
          width: '281',
          height: '44',
        },
      },
    });
  }

  return null;
}
