import { urlFormat } from '../../src/core/helpers/url';

import env from './env';

export default {
  hostname: env.FRONTEND_URL,
  lastmodDateOnly: false,
  transformItems: (item) => {
    if (item.url != null) {
      item.url = urlFormat(item.url);
    }
    if (item.draft == true) {
      item = {};
    }
    return item;
  },
};
