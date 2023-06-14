import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '~/pages/Home';
import { Step1, Step2, Step3 } from '~/pages/create-new';

const IndexRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/create-new/step1' element={<Step1 />} />
    <Route path='/create-new/step2' element={<Step2 />} />
    <Route path='/create-new/step3' element={<Step3 />} />
  </Routes>
);

export default IndexRoutes;
