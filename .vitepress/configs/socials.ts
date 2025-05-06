import env from './env';

const url = typeof window !== 'undefined' ? window.location.origin : env.FRONTEND_URL;

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
    href: 'https://x.com/challengecoin.us',
    shareHref: `https://twitter.com/intent/tweet?url=${url}&text=${env.title}`,
    name: 'X',
  },
  facebook: {
    icon: 'facebook',
    href: 'https://www.facebook.com/challengecoin.us',
    name: 'Facebook',
    shareHref: `https://www.facebook.com/sharer.php?u=${url}`,
  },
  instagram: {
    icon: 'instagram',
    href: 'https://www.instagram.com/challengecoin.us',
    name: 'Instagram',
    shareHref: '',
  },
  tiktok: {
    icon: 'tiktok',
    href: 'https://www.tiktok.com/@challengecoin.us',
    shareHref: `https://twitter.com/intent/tweet?url=${url}&text=${env.title}`,
    name: 'Tiktok',
  },
  telegram: {
    icon: 'telegram',
    href: 'https://t.me/challengecoin.us',
    name: 'Telegram',
    shareHref: '',
  },
  github: {
    icon: 'github',
    href: 'https://github.com/uschallengecoin',
    name: 'Github',
  },
  linkedin: {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/challengecoin.us',
    name: 'LinkedIn',
    // shareHref: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    shareHref: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${env.title}`,
  },
  reddit: {
    icon: 'reddit',
    name: 'Reddit',
    shareHref: `http://www.reddit.com/submit?url=${url}&title=${env.title}`,
  },
};
