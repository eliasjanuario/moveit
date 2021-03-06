import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/32391734?s=460&u=7b34d780b4378d556f0b0e017c6c7bfe93aabcaf&v=4" alt="Elias Januario"/>
      <div>
        <strong>Elias Januario</strong>
        <p>
          <img src="icons/level.svg" alt="Level up"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}