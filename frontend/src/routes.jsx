import React from 'react';
import { Redirect } from 'react-router-dom';
import paths from './pages/paths';
import MainPage from './pages/main/main';
import ConstructorPage from "./pages/constructor/constructor";
import DetailsPage from './pages/details';
import Feature from './pages/feature/feature';

const routes = {
  index: {
    path: paths.index,
    component: () => <Redirect to={paths.main} />,
  },
  constructor: {
    path: paths.constructor,
      component: () => <ConstructorPage/>,
  },
  feature: {
    path: paths.feature,
    component: () => <Feature/>,
  },
  main: {
    path: [paths.main, paths.myDatasets],
    component: () => <MainPage />,
  },
  details: {
    path: paths.details,
    component: () => <DetailsPage />,
  },
};

export default routes;
