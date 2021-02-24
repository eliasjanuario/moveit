import { useContext } from 'react'

import styles from '../styles/components/ExperienceBar.module.css'

import { ChallengesContext } from '../contexts/ChallengesContext';

export function Experiencebar() {
  const { currenteExperience, experienceToNextLevel } = useContext(ChallengesContext)

  const percentToNextLevel = Math.round(currenteExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.experienceCurrent} style={{ left: `${percentToNextLevel}%` }}>
          {currenteExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}