import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import notFound from 'assets/images/404.jpg';
import { useAuth } from 'hooks/AuthContext';
import roleDictionary from 'contents/roleDictionary';

const NotFound = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const handleGoBack = () => {
    if (user && user.profileRole) {
      const route = roleDictionary[user.profileRole];
      if (route) {
        navigate(route.initialUrl);
        return;
      }
    }
    navigate('/');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        justifyContent="center"
      >
        <Typography variant="h2" align="center">
          Página não encontrada
        </Typography>
        <img src={notFound} alt="not-found" />
        <Button onClick={handleGoBack}>Voltar</Button>
      </Box>
    </Container>
  );
};

export default NotFound;
