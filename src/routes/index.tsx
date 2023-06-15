import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '~/pages/Home';
import { Step1, Step2, Step3, Step4 } from '~/pages/create-new';
import Dashboard from '~/pages/dashboard';

const IndexRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/create-new/step1' element={<Step1 />} />
    <Route path='/create-new/step2' element={<Step2 />} />
    <Route path='/create-new/step3' element={<Step3 />} />
    <Route path='/create-new/step4' element={<Step4 />} />
    <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
);

export default IndexRoutes;
