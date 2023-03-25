import Footer from './footer'
import Header from './header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <h2>This is a admin layout</h2>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
