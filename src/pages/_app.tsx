import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const admin = router.route.startsWith('/admin') ? true : false

  // const getLayout = admin
  //   ? (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
  //   : (page: ReactNode) => <Layout>{page}</Layout>

  // return <>{getLayout(<Component {...pageProps} />)}</>
  return <Component />
}
