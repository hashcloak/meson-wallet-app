import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import Layout from '@/components/Layout'

export default function About() {
  return <h1>About Page</h1>
}

About.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>
}
