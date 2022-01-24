import {
  AppBar,
  Box,
  ButtonBase,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import logo from 'assets/images/logo_stagefy_appbar.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static">
      <Box
        py={3}
        maxWidth={1000}
        margin="0 auto"
        px={1}
        width="100%"
        display={isSm ? 'flex' : 'block'}
        justifyContent="center"
      >
        <ButtonBase onClick={() => navigate('/profissional')}>
          <img height={41} width={193} src={logo} alt="logo" />
        </ButtonBase>
      </Box>
    </AppBar>
  );
};

export default Header;
