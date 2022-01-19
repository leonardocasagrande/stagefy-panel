import { isPhoneValid } from 'helpers/validations';
import * as yup from 'yup';

const userSchema = yup.object({
  name: yup.string().required('Nome é obrigatório').default(''),
  artisticName: yup
    .string()
    .required('Nome artístico é obrigatório')
    .default(''),
  birthday: yup
    .date()
    .nullable()
    .default(null)
    .typeError('Data inválida')
    .test(
      'required date',
      'Data de nascimento é obrigatória',
      (value) => !!value
    ),
  email: yup.string().email().required('E-mail é obrigatório').default(''),
  phone: yup
    .string()
    .default('')
    .required('Telefone é obrigatório')
    .test('phone is valid', 'Telefone inválido', (value) => {
      if (!value) return false;
      return isPhoneValid(value);
    }),
  zipcode: yup
    .string()
    .required('CEP é obrigatório')
    .default('')
    .min(9, 'CEP deve ter 8 dígitos')
    .max(9, 'CEP deve ter 8 dígitos'),
  bio: yup.string().required('Mini bio é obrigatória').default(''),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .default('')
    .min(8, 'A senha deve conter pelo menos 8 dígitos'),
  confirmPassword: yup
    .string()
    .default('')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
  acceptTerms: yup
    .bool()
    .default(false)
    .oneOf([true], 'Você deve aceitar os termos e condições de uso'),
});

export type TUserSchema = yup.InferType<typeof userSchema>;

export default userSchema;
