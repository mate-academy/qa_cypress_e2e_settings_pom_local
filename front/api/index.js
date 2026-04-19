import axios from 'axios';
import { apiPath } from 'front/config';

const updateOptions = () => {
  if (typeof window === 'undefined') return {};
  if (!window.localStorage.user) return {};
  if (Object.keys(window.localStorage.user).length === 0) return {};
  const user = JSON.parse(window.localStorage.user);

  if (user.token) {
    return {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
  }

  return {};
};

export { apiPath };

export default function Fetcher(isFallback = false) {
  return async (url) => {
    if (!isFallback) {
      const { data } = await axios.get(url, updateOptions());

      return data;
    }
  };
}