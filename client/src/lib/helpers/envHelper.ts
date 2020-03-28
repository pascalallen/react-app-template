import _ from 'lodash';
import env from '@/constants/env';

const getEnv = (key: string, defaultValue = null): string | null => {
  try {
    const envConfig = JSON.parse(atob(`${document.getElementById('script_config')?.getAttribute('value')}`));
    if (_.isUndefined(envConfig[key])) {
      return defaultValue;
    }
    return envConfig[key];
  } catch (error) {
    return defaultValue;
  }
};

export default Object.freeze({
  envKeys: env,
  getEnv
});
