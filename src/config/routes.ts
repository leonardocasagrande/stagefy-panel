import { IRoute, ProfileRoleEnum } from 'types/index.d';

const routes: IRoute[] = [
  {
    name: 'home',
    path: '/',
    component: 'Home',
    permissions: [],
  },
  {
    name: 'streamer',
    path: '/app',
    component: 'Streamer',
    permissions: [ProfileRoleEnum.Professional],
  },
  {
    name: 'streamerProfile',
    path: '/app/perfil',
    component: 'StreamerProfile',
    permissions: [ProfileRoleEnum.Professional],
  },
];

export default routes;
