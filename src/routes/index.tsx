import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '~/pages/Home';
// import { AddExistingStep1, AddExistingStep2, AddExistingStep3 } from '~/pages/add-existing';
import Contacts from '~/pages/contacts';
import { Step1, Step2, Step3, Step4 } from '~/pages/create-new';
import Dashboard from '~/pages/dashboard';
import Settings from '~/pages/settings';
import Transactions from '~/pages/transactions';

const IndexRoutes: FC = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/create-new/step1' element={<Step1 />} />
    <Route path='/create-new/step2' element={<Step2 />} />
    <Route path='/create-new/step3' element={<Step3 />} />
    <Route path='/create-new/step4' element={<Step4 />} />
    {/* <Route path='/add-existing/step1' element={<AddExistingStep1 />} />
    <Route path='/add-existing/step2' element={<AddExistingStep2 />} />
    <Route path='/add-existing/step3' element={<AddExistingStep3 />} /> */}
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/transactions' element={<Transactions />} />
    <Route path='/contacts' element={<Contacts />} />
    <Route path='/settings' element={<Settings />} />
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
);

export default IndexRoutes;
