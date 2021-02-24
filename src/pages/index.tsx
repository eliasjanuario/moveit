import Head from 'next/head'

import { Profile } from '../components/Profile'
import { Countdown } from '../components/Countdown'
import { Experiencebar } from '../components/ExperienceBar'
import { CompletedChallenges } from '../components/CompletedChallenges'

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <Experiencebar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  )
}
