import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useAuth } from 'hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

// TODO: Receber do back
const SCORE = 2.8;
const Streamer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Container>
        <Box
          display="flex"
          mt={8}
          mb={6}
          gap={4}
          flexDirection={isSm ? 'column' : 'row'}
        >
          <Box display="flex" flexDirection="column">
            <Avatar src={user.avatar} sx={{ width: 300, height: 300 }} />
            <Card sx={{ mt: 3, boxShadow: 'none' }}>
              <Box py={4} px={3} gap={2} display="flex" flexDirection="column">
                <Typography variant="h2">
                  {user.professional?.artisticName}
                </Typography>
                <Typography variant="h6">Sobre</Typography>
                <Typography>{user.professional?.bio}</Typography>
              </Box>
            </Card>
            <Card sx={{ mt: 1.5, boxShadow: 'none' }}>
              <Box py={4} px={3} gap={2} display="flex" flexDirection="column">
                <Typography variant="h6">Pontuação geral</Typography>
                <Typography variant="h2" color={theme.palette.warning.main}>
                  {SCORE.toLocaleString('pt-br', {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}
                </Typography>
                <Rating value={SCORE} precision={0.25} readOnly />
              </Box>
            </Card>
            <Box mt={5} display="flex" justifyContent="center">
              <Button
                onClick={() => navigate('/app/perfil')}
                variant="contained"
                color="secondary"
              >
                Editar meu perfil
              </Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={5}>
            <Typography color="secondary" variant="h4">
              Histórico de lives
            </Typography>
            <Box display="flex" gap={0.5} flexWrap="wrap">
              {/* TODO lista de lives */}
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Streamer;
