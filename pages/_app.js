import Header from '../src/components/Header'
import { CanvasProvider } from '../src/context/CanvasContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CanvasProvider>
        <Header />
        <Component {...pageProps} />
      </CanvasProvider>
    </>
  )
}

export default MyApp
