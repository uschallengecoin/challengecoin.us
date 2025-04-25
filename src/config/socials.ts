import tiktokIcon from '@/assets/images/social/tiktok.svg?component';
import facebookIcon from '@/assets/images/social/facebook.svg?component';
import instagramIcon from '@/assets/images/social/instagram.svg?component';
import xIcon from '@/assets/images/social/x-twitter.svg?component';
import telegramIcon from '@/assets/images/social/telegram.svg?component';

export const socials = {
  twitter: {
    icon: xIcon,
    iconName: 'x',
    href: 'twitter',
    shareHref: 'https://twitter.com/intent/tweet?url=',
    name: 'x',
  },
  facebook: {
    icon: facebookIcon,
    iconName: 'facebook',
    href: 'facebook',
    name: 'Facebook',
    shareHref: 'https://www.facebook.com/sharer.php?u=',
  },
  instagram: {
    icon: instagramIcon,
    iconName: 'instagram',
    href: 'instagram',
    name: 'Instagram',
    shareHref: '',
  },
  tiktok: {
    icon: tiktokIcon,
    iconName: 'tiktok',
    href: 'tiktok',
    shareHref: 'https://twitter.com/intent/tweet?url=',
    name: 'Tiktok',
  },
  telegram: {
    icon: telegramIcon,
    iconName: 'telegram',
    href: 'telegram',
    name: 'Telegram',
    shareHref: '',
  },
};
