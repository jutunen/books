import axios from 'axios';

export const apiUrlPrefix = 'http://localhost:3100/';

const api = axios.create({
  baseURL: apiUrlPrefix,
  timeout: 20000,
});

export const saveNewRequest = async (data: Book) => {
  const response = await api.post('book', data);
  return response;
};

export const saveRequest = async (id: number, data: BookPatch) => {
  const response = await api.patch('book/' + id, data);
  return response;
};

export const deleteRequest = async (id: number) => {
  const response = await api.delete('book/' + id);
  return response;
};

export const getRequest = async (url: string) => {
  const response = await api.get(url);
  return response;
};
