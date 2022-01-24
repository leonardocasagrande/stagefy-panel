import { ProfileRoleEnum } from '../types/index.d';

type TRoleDictionary = {
  [key in ProfileRoleEnum]?: TRoleDictionaryValue;
};

type TRoleDictionaryValue = {
  initialUrl: string;
};

const roleDictionary: TRoleDictionary = {
  ADMIN: {
    initialUrl: '/admin/consulta',
  },
  PROFESSIONAL: {
    initialUrl: '/profissional',
  },
};

export default roleDictionary;
