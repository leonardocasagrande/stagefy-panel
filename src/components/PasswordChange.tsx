import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { getErrorByKey } from 'helpers/utils';
import { useState } from 'react';
import passwordSchema from 'schemas/password';

interface IPasswordChangeProps {
  onSubmit: (password: string) => void;
}

const PasswordChange = ({ onSubmit }: IPasswordChangeProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordShow = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { touched, errors, getFieldProps, handleSubmit } = useFormik({
    validationSchema: passwordSchema,
    initialValues: passwordSchema.getDefault(),
    onSubmit: (val) => onSubmit(val.password),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography fontWeight={600} variant="subtitle1">
          Alteração de senha
        </Typography>
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
        <Button color="secondary" variant="contained">
          Alterar senha
        </Button>
      </Box>
    </form>
  );
};

export default PasswordChange;
