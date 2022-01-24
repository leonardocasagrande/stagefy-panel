import { DeleteOutlined, PhotoCameraOutlined } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import {
  Avatar,
  Badge,
  Button,
  Container,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import Footer from 'components/Footer';
import Header from 'components/Header';
import withSuccess from 'components/HOCs/withSuccess';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import PhoneMaskedInput from 'components/PhoneMaskedInput';
import { useFormik } from 'formik';
import { getErrorByKey } from 'helpers/utils';
import { useApp } from 'hooks/AppContext';
import { useAuth } from 'hooks/AuthContext';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userEditSchema from 'schemas/userEdit';
import { deleteProfile, updateProfile } from 'services/professionals';

const StreamerProfile = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const theme = useTheme();
  const { user, refreshUserToken, clearAuth } = useAuth();
  const { setErrorMessage, setLoading, setSuccessMessage } = useApp();

  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    getFieldProps,
    setFieldTouched,
    setFieldValue,
    values,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    validationSchema: userEditSchema,
    initialValues: {
      ...userEditSchema.getDefault(),
      ...user,
      ...user.professional,
      birthday: moment(user.professional?.birthday, 'DD/MM/YYYY').toDate(),
    },
    onSubmit: async ({
      name,
      birthday,
      tempImage,
      artisticName,
      bio,
      email,
      phone,
    }) => {
      setLoading(true);
      try {
        await updateProfile({
          name,
          birthday: birthday.toLocaleDateString('pt-BR'),
          artisticName,
          bio,
          email,
          phone,
          avatar: tempImage,
        });
        await refreshUserToken();
        setSuccessMessage('Perfil atualizado com sucesso!');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setErrorMessage(err.response.data.message);
        }
      }
      setLoading(false);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFieldTouched('tempImage');
    if (files) {
      setFieldValue('tempImage', files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('avatar', event.target?.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleProfileDelete = async () => {
    setLoading(true);
    try {
      await deleteProfile();
      clearAuth();
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const handleDateChange = (date: any) => {
    setFieldValue('birthday', date);
  };

  return (
    <Box>
      <Header />
      <Container>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" mt={8} mb={8} gap={2}>
            <Box>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <>
                    <IconButton
                      sx={{
                        width: 52,
                        height: 52,
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                          backgroundColor: theme.palette.background.default,
                        },
                      }}
                      onClick={() => fileInput.current?.click()}
                      color="primary"
                    >
                      <PhotoCameraOutlined sx={{ fontSize: '2rem' }} />
                    </IconButton>
                    <input
                      style={{ display: 'none' }}
                      accept="image/*"
                      type="file"
                      ref={fileInput}
                      onChange={handleFileSelect}
                    />
                  </>
                }
              >
                <Avatar
                  sx={{ width: 300, height: 300 }}
                  alt="user-image"
                  src={values.avatar ?? undefined}
                />
              </Badge>
              {!!getErrorByKey('tempImage', touched, errors) && (
                <FormHelperText error>
                  {getErrorByKey('tempImage', touched, errors)}
                </FormHelperText>
              )}
            </Box>
            <Box display="flex" gap={4}>
              <Box display="flex" flexDirection="column" gap={3} width={300}>
                <Typography variant="h2">
                  {user.professional?.artisticName}
                </Typography>
                <TextField
                  fullWidth
                  label="Sobre"
                  placeholder="Nos conte resumidamente sobre a sua 
                trajetória profissional 
                através de uma minibiografia com
                as suas realizações mais relevantes"
                  variant="standard"
                  multiline
                  maxRows={5}
                  minRows={5}
                  error={!!getErrorByKey('bio', touched, errors)}
                  helperText={getErrorByKey('bio', touched, errors)}
                  {...getFieldProps('bio')}
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={3}>
                <Typography fontWeight={600} variant="subtitle1">
                  Informações gerais
                </Typography>
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
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  variant="standard"
                  error={!!getErrorByKey('email', touched, errors)}
                  helperText={getErrorByKey('email', touched, errors)}
                  {...getFieldProps('email')}
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
              </Box>
              <Box mt={7.4}>
                <TextField
                  fullWidth
                  label="Nome artístico"
                  placeholder="Digite seu nome artístico"
                  variant="standard"
                  error={!!getErrorByKey('artisticName', touched, errors)}
                  helperText={getErrorByKey('artisticName', touched, errors)}
                  {...getFieldProps('artisticName')}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" maxWidth={810}>
              <Button
                onClick={() => setOpenConfirmation(true)}
                color="inherit"
                startIcon={<DeleteOutlined />}
              >
                Excluir perfil
              </Button>
              <Button color="secondary" type="submit" variant="contained">
                Salvar
              </Button>
            </Box>
          </Box>
        </form>
        <ConfirmationModal
          open={openConfirmation}
          description="Você deseja mesmo excluir seu perfil?"
          title="Excluir perfil"
          onAccept={handleProfileDelete}
          onClose={() => setOpenConfirmation(false)}
          primaryButtonText="Excluir"
          primaryButtonColor="success"
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default withSuccess(StreamerProfile);
