import loadable from '@loadable/component';
import routes from 'config/routes';
import NotFound from 'pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute } from 'types';
import withError from './HOCs/withError';
import withLoading from './HOCs/withLoading';

const Switcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route: IRoute) => {
          const Component = loadable(() => import(`pages/${route.component}`));
          const EnhacedComponent = withLoading(withError(Component));
          return (
            <Route
              key={route.name}
              path={route.path}
              element={<EnhacedComponent />}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Switcher;
