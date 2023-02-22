import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default {
  title: 'Components/Page/AddExistingWallet',
  component: { Step1, Step2, Step3 },
}

export const Step1Sample = () => {
  return <Step1 />
}

export const Step2Sample = () => {
  return <Step2 />
}

export const Step3Sample = () => {
  return <Step3 />
}
