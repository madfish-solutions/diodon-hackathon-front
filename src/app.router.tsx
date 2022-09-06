import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { AboutPage } from '@modules/about';
import { HomePage } from '@modules/home';
import { PageNotFoundPage } from '@modules/page-not-found';
import { WorkspacePage } from '@modules/workspace';

import { AppRootRoutes } from './app-root-routes.enum';

export const AppRouter: FC = () => (
  <Routes>
    <Route path={AppRootRoutes.Root} element={<HomePage />} />
    <Route path={AppRootRoutes.About} element={<AboutPage />} />
    <Route path={AppRootRoutes.Workspace} element={<WorkspacePage />} />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
);
