import axios, { AxiosInstance } from 'axios';

const create = async (): Promise<AxiosInstance> => {
  return axios.create({
    baseURL: '/api/v1/'
  });
};

export default Object.freeze({
  create
});
