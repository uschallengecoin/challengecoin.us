
import { defineAdditionalConfig } from 'vitepress'
import nav from './nav';

export default defineAdditionalConfig({
  lang: 'en-US',
  title: 'US Challenge Coin',
  description: 'Introducing a modern symbol of American pride — crafted to honor heritage, support those who serve, and bring communities together with every purchase.',
  keywords: ['challenge', 'coin', 'collectible', 'military', 'veteran', 'gift', 'commemorative', 'patriotic', 'limited edition', 'custom design'],
  author: 'US Challenge Coin',

  themeConfig: {
    nav,

    home: {
      buyNow: 'Buy Now',
      learnMore: 'Learn More',
      howItWorks: 'How It Works',
      buyNowLong: 'Buy U.S. Challenge Coin Now',
    },

    subscription: {
      placeholder: 'Your Email',
      button: 'Subscribe to Our Newsletter',
      buttonMobile: 'Subscribe',
      label: 'Join Our Newsletter',
    },

    copy: {
      copy: 'Copy Link',
      copied: 'Copied!',
    },

    share : {
      title: 'Share',
    },

    buyNowLong2: 'Buy U.S. Challenge Coin',

    footer: {
      message: 'Join the growing community of Americans spreading pride, honor and gratitude across the country and supporting our past, present and future heroes.',
      copyright: 'U.S. Challenge Coin LLC. All rights reserved.',

      subscription: {
        placeholder: 'Your Email',
        button: 'Subscribe to Our Newsletter',
        buttonMobile: 'Subscribe',
        label: 'Join Our Newsletter',
      },

      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
    }
  }
})