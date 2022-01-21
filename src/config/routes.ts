import { IRoute, ProfileRoleEnum } from 'types/index.d';

const routes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    component: 'Home',
    permissions: [],
  },
  {
    name: 'adminQuery',
    path: '/admin/consulta',
    component: 'AdminQuery',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminEvents',
    path: '/admin/eventos',
    component: 'AdminEvents',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminStreamers',
    path: '/admin/streamers',
    component: 'AdminStreamers',
    permissions: [ProfileRoleEnum.Admin],
  },
  {
    name: 'adminCarousel',
    path: '/admin/carrossel',
    component: 'AdminCarousel',
    permissions: [ProfileRoleEnum.Admin],
  },
];

export default routes;
