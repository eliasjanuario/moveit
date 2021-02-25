import { useContext } from 'react'

import styles from '../styles/components/ChallengeBox.module.css'

import { CountdownContext } from '../contexts/CountdownContext'
import { ChallengesContext } from '../contexts/ChallengesContext'

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)

  function handleChallengeDone() {
    completeChallenge()
    resetCountdown()
  }
  
  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }
  
  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount}xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="Challenge"/>
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button type="button" className={styles.challengeActiveFailedButton} onClick={handleChallengeFailed}>Falhei</button>
              <button type="button" className={styles.challengeActiveDoneButton} onClick={handleChallengeDone}>Completei</button>
            </footer>
          </div>
        ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              Avance de nível completando desafios
            </p>
          </div>
        )
      }
    </div>
  )
}