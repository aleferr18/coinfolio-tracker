import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import UserContextProvider from '../store/user-context'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {

  return <UserContextProvider>
          <Head>
            <title>Coinfolio - Crypto Tracker</title>
          </Head>
          <Layout>
              <Component {...pageProps} />
          </Layout>
          </UserContextProvider>
}

export default MyApp
