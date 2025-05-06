import env from './env';
import socials from './socials';

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
};
