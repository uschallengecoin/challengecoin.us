export default {
  share: {
    icon: 'share',
    name: 'Share',
    function: (context: any) => {
      context?.showDialogShare();
    },
  },
  twitter: {
    icon: 'x-twitter',
    href: 'https://x.com/uschallengecoin',
    shareHref: (url, title) => {
      let res = 'https://twitter.com/intent/tweet?';
      if (url) res += `url=${encodeURIComponent(url)}`;
      if (title) res += `&text=${encodeURIComponent(title)}`;
      return res;
    },
    name: 'X',
  },
  facebook: {
    icon: 'facebook',
    href: 'https://www.facebook.com/people/US-Challenge-Coin/61576400066975/',
    name: 'Facebook',
    shareHref: (url) => `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
  },
  instagram: {
    icon: 'instagram',
    href: 'https://www.instagram.com/uschallengecoin',
    name: 'Instagram',
    shareHref: () => '', // Instagram does not support direct sharing via URL
  },
  tiktok: {
    icon: 'tiktok',
    href: 'https://www.tiktok.com/@uschallengecoin',
    shareHref: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, // TikTok has no direct share URL, fallback to Twitter
    name: 'Tiktok',
  },
  telegram: {
    icon: 'telegram',
    href: 'https://t.me/uschallengecoin',
    name: 'Telegram',
    shareHref: () => '', // No direct share URL provided
  },
  github: {
    icon: 'github',
    href: 'https://github.com/uschallengecoin',
    name: 'Github',
  },
  linkedin: {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/uschallengecoin',
    name: 'LinkedIn',
    shareHref: (url, title) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  reddit: {
    icon: 'reddit',
    name: 'Reddit',
    shareHref: (url, title) => `http://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  matrix: {
    icon: 'matrix',
    name: 'Matrix',
    href: 'https://matrix.to/#/#matrix.uschallengecoin.org',
  },
};
