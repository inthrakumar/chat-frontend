import axios from 'axios';

const defAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

const privateAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export { defAxios, privateAxios };
