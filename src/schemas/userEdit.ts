import { isPhoneValid } from 'helpers/validations';
import * as yup from 'yup';

const userEditSchema = yup.object({
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
  bio: yup.string().required('Mini bio é obrigatória').default(''),
  tempImage: yup
    .mixed()
    .test('is an image', 'O arquivo deve ser uma imagem', (value) => {
      return !value || value.type.startsWith('image');
    })
    .test(
      'is not bigger than 5MB',
      'O tamanho da imagem deve ser inferior a 5 MB',
      (value) => {
        return !value || value.size < 5000000;
      }
    ),
  avatar: yup.string().default('').nullable(),
});

export default userEditSchema;
