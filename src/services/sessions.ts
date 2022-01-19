import { Axios } from 'config/axiosFetcher';

interface ICreateAccount {
  name: string;
  artisticName: string;
  birthday: string;
  email: string;
  phone: string;
  zipcode: string;
  bio: string;
  password: string;
}

const createAccount = async (body: ICreateAccount) => {
  const { data } = await Axios.post('/professionals', body);
  return data;
};

export { createAccount };
