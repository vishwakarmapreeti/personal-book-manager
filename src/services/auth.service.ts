import api from './api';

export async function signIn(data: {
  email: string;
  password: string;
}) {
  const response = await api.post('/auth/signin', data);
  return response.data;
}


export async function logout() {
  const response = await api.post('/auth/logout');
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me');
  return response.data;
}

export async function signUp(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  const response = await api.post(
    '/auth/signup',
    data
  );

  return response.data;
}