import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import {NotificationsProvider} from 'web3uikit'
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
  </MoralisProvider>
  )
 
}

export default MyApp
