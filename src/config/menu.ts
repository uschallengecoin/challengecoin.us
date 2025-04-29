import { IFrontmatter } from 'UiKit/types/types';

export type MenuItem = {
  href?: string;
  text: string;
  frontmatter?: IFrontmatter;
  children?: MenuItem[][];
  card?: {
    title?: string;
    text?: string;
    background?: string;
    href?: string;
  };
}

export const MENU_HEADER = [
  {
    href: '#hero',
    text: 'US Challenge Coin',
  },
  {
    href: '#legacy',
    text: 'The Legacy of Challenge Coins',
  },
  {
    href: '#how-it-works',
    text: 'How It Works',
  },
  {
    href: '#why-own-u-s-challenge-coin',
    text: 'Why Own U.S. Challenge Coin?',
  },
  {
    href: '#be-part-of-something-bigger',
    text: 'Be part of something bigger',
  },
  {
    href: '#voices-of-honor',
    text: 'Voices of Honor',
  },
  {
    href: '#pre-order',
    text: 'Limited Edition Pre-Order',
  },
  {
    href: '#faq',
    text: 'Frequently Asked Questions',
  },
];
