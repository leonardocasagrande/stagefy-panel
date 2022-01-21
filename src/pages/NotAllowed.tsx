import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import notAllowed from 'assets/images/401.jpg';
import roleDictionary from 'contents/roleDictionary';
import { useAuth } from 'hooks/AuthContext';

const NotAllowed = () => {
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
          Página não autorizada
        </Typography>
        <img src={notAllowed} alt="not-authorized" />
        <Button onClick={handleGoBack}>Voltar</Button>
      </Box>
    </Container>
  );
};

export default NotAllowed;
