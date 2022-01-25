import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import stagefyLogo from 'assets/images/logo_stagefy.png';
import axios from 'axios';
import CreateAccountCard from 'components/CreateAccountCard';
import LoginCard from 'components/LoginCard';
import Modal from 'components/modals/Modal';
import { useApp } from 'hooks/AppContext';
import { useAuth } from 'hooks/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLoginSchema } from 'schemas/login';
import { TUserSchema } from 'schemas/user';
import { createAccount } from 'services/sessions';

const Home = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const navigate = useNavigate();

  const { setErrorMessage, setLoading } = useApp();

  const { signIn } = useAuth();

  const [create, setCreate] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setCreate(false);
  };

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const handleLogin = async (info: TLoginSchema) => {
    try {
      await signIn(info);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  const handleCreateAccount = async ({
    name,
    artisticName,
    bio,
    birthday,
    email,
    password,
    phone,
    zipcode,
  }: TUserSchema) => {
    setLoading(true);
    try {
      await createAccount({
        name,
        artisticName,
        bio,
        birthday: birthday!.toLocaleDateString('pt-br'),
        email,
        password,
        phone: phone.replace(/[^0-9]/g, ''),
        zipcode: zipcode.replace(/[^0-9]/g, ''),
      });
      setOpen(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Erro ao criar conta');
      }
    }
    setLoading(false);
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Container>
        <Box
          my={4}
          display="flex"
          flexDirection={isSm ? 'column' : 'row'}
          gap={create || isSm ? 4 : 12}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={4}
            maxWidth={create ? 400 : 680}
          >
            <img src={stagefyLogo} alt="logo" />
            <Typography variant="subtitle1">
              Tornando o bilinguismo acessível através de experiências
              artísticas e culturais ao vivo e gamificadas.
            </Typography>
          </Box>
          <Box flex={1}>
            {create ? (
              <CreateAccountCard
                onChangeCreate={() => setCreate(!create)}
                onSubmit={handleCreateAccount}
              />
            ) : (
              <LoginCard
                onSubmit={handleLogin}
                onChangeCreate={() => setCreate(!create)}
              />
            )}
          </Box>
        </Box>
      </Container>
      <Modal
        title="cadastro realizado!"
        description="Seu cadastro foi realizado com sucesso! Obrigada pelo interesse na Stagefy, entraremos em contato com você em breve através do seu e-mail."
        open={open}
        onClose={handleClose}
      >
        <Box mt={4} display="flex" alignItems="center" justifyContent="center">
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Ok, obrigada!
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
