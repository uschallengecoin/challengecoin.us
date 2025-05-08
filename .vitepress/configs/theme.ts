import env from './env';
import socials from './socials';
import links from './links';

export default {
    search: {
      provider: 'local',
    },
    contacts: {
      phone: env.phone,
      email: env.email,
    },
    socials,
    env,
    links,
};
