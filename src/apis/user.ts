import { GetUserReponseType, GetUserRequestType, PatchMeRequestType } from '../schema/userSchema';
import httpClient from '.';

export const getMe = async (): Promise<GetUserReponseType> => {
  const response = await httpClient.get('/users/me');
  return response.data;
};

export const getUser = async (request: GetUserRequestType): Promise<GetUserReponseType> => {
  const { id } = request;
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

export const updateMe = async (request: PatchMeRequestType): Promise<GetUserReponseType> => {
  const response = await httpClient.patch('/users/me', { ...request });
  return response.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await httpClient.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.url;
};

export const updateImage = async (file: File, data: Omit<PatchMeRequestType, 'image'>): Promise<GetUserReponseType> => {
  const imageUrl = await uploadImage(file);
  const updatedData = { ...data, image: imageUrl };
  const response = await updateMe(updatedData);
  return response;
};
