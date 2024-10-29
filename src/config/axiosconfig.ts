import axios from 'axios';

const defAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const privateAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export { defAxios, privateAxios };
