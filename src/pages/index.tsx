import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import { Profile } from '../components/Profile'
import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'
import { Experiencebar } from '../components/ExperienceBar'
import { CompletedChallenges } from '../components/CompletedChallenges'

import styles from '../styles/pages/Home.module.css'

type HomeProps = {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
  const { level, currentExperience, challengesCompleted } = props
  
  return (
    <ChallengesProvider level={level} currentExperience={currentExperience} challengesCompleted={challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <Experiencebar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies
  return {
    props: { 
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted) 
    }
  }
}
