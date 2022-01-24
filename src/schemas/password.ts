import * as yup from 'yup';

const passwordSchema = yup.object({
  password: yup
    .string()
    .required('Senha é obrigatória')
    .default('')
    .min(8, 'A senha deve conter pelo menos 8 dígitos'),
  confirmPassword: yup
    .string()
    .default('')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export default passwordSchema;
