import env from './env';

export default {
    search: {
      provider: 'local',
    },
    contacts: {
      phone: env.phone,
      email: env.email,
    },
    env,
};
