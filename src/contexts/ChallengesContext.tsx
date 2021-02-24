import { createContext, ReactNode, useState } from 'react'

import challenges from '../../challenges.json'

type ChallengesProviderProps = {
  children: ReactNode
}

type Challenge = {
  type: 'body' | 'eye'
  description: string
  amount: number
}

type ChallengeContextData = {
  level: number 
  activeChallenge: Challenge
  currenteExperience: number  
  challengesCompleted: number 
  experienceToNextLevel: number 
  levelUp: () => void 
  resetChallenge: () => void 
  startNewChallenge: () => void 
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [currenteExperience, setCurrenteExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const experienceToNextLevel = Math.pow((level + 1 * 4), 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
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
          currenteExperience, 
          challengesCompleted,
          experienceToNextLevel
        }
      }>
      { children }
    </ChallengesContext.Provider>
  )
}