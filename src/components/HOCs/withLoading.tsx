import { Backdrop, CircularProgress } from '@mui/material';
import { useApp } from 'hooks/AppContext';

const withLoading = (Component: React.ComponentType) => ({ ...props }) => {
  const { loading } = useApp();

  return (
    <>
      <Component {...props} />
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default withLoading;
