import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';

import { MarketsPage } from '@modules/markets';
import { PageNotFoundPage } from '@modules/page-not-found';
import { WorkspacePage } from '@modules/workspace';

import { AppRootRoutes } from './app-root-routes.enum';

export const AppRouter: FC = () => (
  <Routes>
    <Route path={AppRootRoutes.Root} element={<MarketsPage />} />

    <Route path={AppRootRoutes.Workspace} element={<WorkspacePage />} />

    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
);
