import linkedinIcon from 'UiKit/assets/social/linkedin.svg?component';
import facebookIcon from 'UiKit/assets/social/facebook.svg?component';
import instagramIcon from 'UiKit/assets/social/instagram.svg?component';
import xIcon from 'UiKit/assets/social/x-twitter.svg?component';
import githubIcon from 'UiKit/assets/social/github.svg?component';

export const socials = {
  linkedin: {
    icon: linkedinIcon,
    iconName: 'linkedin',
    href: 'https://www.linkedin.com/company/challengecoin.us',
    name: 'LinkedIn',
    shareHref: 'https://www.linkedin.com/sharing/share-offsite/?url=',
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
  },
  twitter: {
    icon: xIcon,
    iconName: 'twitter',
    shareHref: 'https://twitter.com/intent/tweet?url=',
    name: 'Twitter',
  },
  github: {
    icon: githubIcon,
    iconName: 'github',
    href: 'https://github.com/uschallengecoin',
    name: 'Github',
  },
};
