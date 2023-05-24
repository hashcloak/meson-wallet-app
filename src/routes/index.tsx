import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '~/pages/Home';
import { Step1 } from '~/pages/create-new';

const IndexRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/create-new/step1' element={<Step1 />} />
  </Routes>
);

export default IndexRoutes;
