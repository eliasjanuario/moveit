import { createContext, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'

type ChallengesProviderProps = {
  children: ReactNode
  level: number
  currentExperience: number
  challengesCompleted: number
}

type Challenge = {
  type: 'body' | 'eye'
  description: string
  amount: number
}

type ChallengeContextData = {
  level: number 
  activeChallenge: Challenge
  currentExperience: number  
  challengesCompleted: number 
  experienceToNextLevel: number 
  levelUp: () => void 
  resetChallenge: () => void 
  completeChallenge: () => void 
  startNewChallenge: () => void 
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children, ...props }: ChallengesProviderProps) {
  const [level, setLevel] = useState(props.level ?? 1)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={
        { 
          level, 
          levelUp, 
          resetChallenge,
          activeChallenge,
          startNewChallenge, 
          completeChallenge,
          currentExperience, 
          challengesCompleted,
          experienceToNextLevel
        }
      }>
      { children }
    </ChallengesContext.Provider>
  )
}