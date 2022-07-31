import axios from 'axios';

export const apiUrlPrefix = 'http://localhost:3100/';

const api = axios.create({
  baseURL: apiUrlPrefix,
  timeout: 20000,
});

export const sendSaveNewRequest = async (data: Book) => {
  return await api.post('book', data);
};

export const sendSaveRequest = async (id: number, data: BookPatch) => {
  return await api.patch('book/' + id, data);
};

export const sendDeleteRequest = async (id: number) => {
  return await api.delete('book/' + id);
};

export const sendGetRequest = async (url: string) => {
  return await api.get(url);
};
