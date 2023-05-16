import { createAction } from '@reduxjs/toolkit'

const FEATURE = 'signerWallet'
export const setPrimarySigner = createAction(`${FEATURE}/setPrimarySigner`)
