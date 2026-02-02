import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);
export const fetchPosts = () => API.get('/posts');
export const createPost = (postData) => {
  if (postData instanceof FormData) {
    return API.post('/posts', postData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
  return API.post('/posts', postData);
};
export const likePost = (id) => API.put(`/posts/${id}/like`);
export const commentPost = (id, text) => API.post(`/posts/${id}/comment`, { text });
