import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/ManualHeader'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="a decentralised lottery sysytem " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      hello
    </div>
  )
}
