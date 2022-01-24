import { Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import tiktok from 'assets/images/tiktok.png';
import googlePlay from 'assets/images/google-play-badge.png';
import ios from 'assets/images/ios-badge.png';

const Footer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box marginTop="auto" py={4} bgcolor={theme.palette.background.paper}>
      <Container>
        <Box
          display="flex"
          flexDirection={isSm ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5">redes sociais</Typography>
            <Box display="flex" justifyContent="space-between">
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ width: 40 }} color="inherit">
                <img src={tiktok} alt="tiktok" />
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5">E-mail</Typography>
            <Typography variant="caption" fontWeight={400}>
              SUPORTE@STAGEFY.COM.BR
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5">telefone</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <WhatsApp />
              <Typography variant="caption" fontWeight={400}>
                (41) 9999-9999
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <img width={111} height={31} src={ios} alt="ios" />
            <img width={108} height={32} src={googlePlay} alt="google-play" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
