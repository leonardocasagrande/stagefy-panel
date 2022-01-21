import { VisibilityOff, Visibility } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { getErrorByKey } from 'helpers/utils';
import { useState } from 'react';
import userSchema, { TUserSchema } from 'schemas/user';
import CEPMaskedInput from './CEPMaskedInput';
import InlineButton from './InlineButton';
import PhoneMaskedInput from './PhoneMaskedInput';

interface ICreateAccountCard {
  onChangeCreate: () => void;
  onSubmit: (values: TUserSchema) => void;
}

const CreateAccountCard = ({
  onChangeCreate,
  onSubmit,
}: ICreateAccountCard) => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  const handlePasswordShow = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: userSchema.getDefault(),
    validationSchema: userSchema,
    onSubmit,
  });

  const handleDateChange = (date: any) => {
    setFieldValue('birthday', date);
  };

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fade in>
      <Card>
        <form onSubmit={handleSubmit}>
          <Box p={6} display="flex" flexDirection="column" gap={6}>
            <Typography variant="h1">Cadastro</Typography>
            <Box display="flex" flexDirection={isSm ? 'column' : 'row'} gap={4}>
              <Box display="flex" flex={1} flexDirection="column" gap={3}>
                <TextField
                  fullWidth
                  label="Nome e sobrenome"
                  placeholder="Digite seu nome"
                  variant="standard"
                  error={!!getErrorByKey('name', touched, errors)}
                  helperText={getErrorByKey('name', touched, errors)}
                  {...getFieldProps('name')}
                />
                <TextField
                  fullWidth
                  label="Nome artístico"
                  placeholder="Digite seu nome artístico"
                  variant="standard"
                  error={!!getErrorByKey('artisticName', touched, errors)}
                  helperText={getErrorByKey('artisticName', touched, errors)}
                  {...getFieldProps('artisticName')}
                />
                <DatePicker
                  disableFuture
                  label="Data de nascimento"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  {...getFieldProps('birthday')}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...getFieldProps('birthday')}
                      fullWidth
                      variant="standard"
                      placeholder="Digite sua data de nascimento"
                      error={!!getErrorByKey('birthday', touched, errors)}
                      helperText={getErrorByKey('birthday', touched, errors)}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  variant="standard"
                  error={!!getErrorByKey('email', touched, errors)}
                  helperText={getErrorByKey('email', touched, errors)}
                  {...getFieldProps('email')}
                />
                <TextField
                  fullWidth
                  label="Telefone"
                  placeholder="Digite seu telefone"
                  variant="standard"
                  error={!!getErrorByKey('phone', touched, errors)}
                  helperText={getErrorByKey('phone', touched, errors)}
                  {...getFieldProps('phone')}
                  InputProps={{
                    inputComponent: PhoneMaskedInput as any,
                  }}
                />
                <TextField
                  fullWidth
                  label="CEP"
                  placeholder="Digite seu cep"
                  variant="standard"
                  error={!!getErrorByKey('zipcode', touched, errors)}
                  helperText={getErrorByKey('zipcode', touched, errors)}
                  {...getFieldProps('zipcode')}
                  InputProps={{
                    inputComponent: CEPMaskedInput as any,
                  }}
                />
                <TextField
                  fullWidth
                  label="Mini bio"
                  placeholder="Nos conte resumidamente sobre a sua 
                trajetória profissional 
                através de uma minibiografia com
                as suas realizações mais relevantes"
                  variant="standard"
                  multiline
                  maxRows={5}
                  error={!!getErrorByKey('bio', touched, errors)}
                  helperText={getErrorByKey('bio', touched, errors)}
                  {...getFieldProps('bio')}
                />
              </Box>
              <Box flex={1} display="flex" flexDirection="column" gap={3}>
                <TextField
                  fullWidth
                  label="Senha"
                  placeholder="Digite sua senha"
                  error={!!getErrorByKey('password', touched, errors)}
                  autoComplete="new-password"
                  helperText={
                    getErrorByKey('password', touched, errors) ??
                    'A senha deve conter pelo menos 8 digitos.'
                  }
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="info"
                          onClick={handlePasswordShow}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirmação de senha"
                  placeholder="Confirme sua senha"
                  error={!!getErrorByKey('confirmPassword', touched, errors)}
                  helperText={getErrorByKey('confirmPassword', touched, errors)}
                  autoComplete="new-password"
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('confirmPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="info"
                          onClick={handlePasswordShow}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl
                  error={!!getErrorByKey('acceptTerms', touched, errors)}
                >
                  <FormControlLabel
                    {...getFieldProps('acceptTerms')}
                    checked={values.acceptTerms}
                    control={<Checkbox color="primary" />}
                    label={
                      <Box>
                        <Typography component="span">Eu aceito os </Typography>
                        <InlineButton onClick={() => console.log('TERMS')}>
                          termos e condições de uso
                        </InlineButton>
                        <Typography component="span"> e </Typography>
                        <InlineButton onClick={() => console.log('POLITICS')}>
                          políticas de privacidade
                        </InlineButton>
                      </Box>
                    }
                  />
                  <FormHelperText
                    error={!!getErrorByKey('acceptTerms', touched, errors)}
                  >
                    {getErrorByKey('acceptTerms', touched, errors)}
                  </FormHelperText>
                </FormControl>
                <Box
                  marginTop="auto"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  alignItems="center"
                >
                  <Box width="200px">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      Cadastrar
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ marginRight: 1 }}
                      variant="overline"
                      component="span"
                    >
                      já tem cadastro?
                    </Typography>
                    <InlineButton onClick={onChangeCreate}>
                      FAÇA LOGIN AGORA
                    </InlineButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Card>
    </Fade>
  );
};

export default CreateAccountCard;
