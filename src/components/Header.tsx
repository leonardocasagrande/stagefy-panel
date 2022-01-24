import { AppBar, Box } from '@mui/material';
import logo from 'assets/images/logo_stagefy_appbar.png';

const Header = () => {
  return (
    <AppBar position="static">
      <Box py={3} maxWidth={1000} margin="0 auto" px={1} width="100%">
        <img height={41} width={193} src={logo} alt="logo" />
      </Box>
    </AppBar>
  );
};

export default Header;
