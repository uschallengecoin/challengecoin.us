import tiktokIcon from '@/assets/images/social/tiktok.svg?component';
import facebookIcon from '@/assets/images/social/facebook.svg?component';
import instagramIcon from '@/assets/images/social/instagram.svg?component';
import xIcon from '@/assets/images/social/x-twitter.svg?component';
import telegramIcon from '@/assets/images/social/telegram.svg?component';
import githubIcon from 'UiKit/assets/social/github.svg?component';
import linkedinIcon from 'UiKit/assets/social/linkedin.svg?component';

export const socials = {
  twitter: {
    icon: xIcon,
    iconName: 'x',
    href: 'https://x.com/challengecoin.us',
    shareHref: 'https://twitter.com/intent/tweet?url=',
    name: 'x',
  },
  facebook: {
    icon: facebookIcon,
    iconName: 'facebook',
    href: 'https://www.facebook.com/challengecoin.us',
    name: 'Facebook',
    shareHref: 'https://www.facebook.com/sharer.php?u=',
  },
  instagram: {
    icon: instagramIcon,
    iconName: 'instagram',
    href: 'https://www.instagram.com/challengecoin.us',
    name: 'Instagram',
    shareHref: '',
  },
  tiktok: {
    icon: tiktokIcon,
    iconName: 'tiktok',
    href: 'https://www.tiktok.com/@challengecoin.us',
    shareHref: 'https://twitter.com/intent/tweet?url=',
    name: 'Tiktok',
  },
  telegram: {
    icon: telegramIcon,
    iconName: 'telegram',
    href: 'https://t.me/challengecoin.us',
    name: 'Telegram',
    shareHref: '',
  },
  github: {
    icon: githubIcon,
    iconName: 'github',
    href: 'https://github.com/uschallengecoin',
    name: 'Github',
  },
  linkedin: {
    icon: linkedinIcon,
    iconName: 'linkedin',
    href: 'https://www.linkedin.com/company/challengecoin.us',
    name: 'LinkedIn',
    shareHref: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  },
};
