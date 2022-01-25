import { IProfessional } from 'types';
import { Axios } from 'config/axiosFetcher';

interface IUpdateProfile {
  avatar?: File;
  name: string;
  artisticName: string;
  birthday: string;
  email: string;
  phone: string;
  bio: string;
}

const updateProfile = async ({
  avatar,
  name,
  artisticName,
  birthday,
  email,
  phone,
  bio,
}: IUpdateProfile) => {
  const formData = new FormData();
  if (avatar) formData.append('avatar', avatar);

  formData.append('artisticName', artisticName);
  formData.append('name', name);
  formData.append('birthday', birthday);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('bio', bio);

  const { data } = await Axios.put<IProfessional>('/professionals', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const deleteProfile = async () => {
  await Axios.delete('/professionals');
};

export { updateProfile, deleteProfile };
