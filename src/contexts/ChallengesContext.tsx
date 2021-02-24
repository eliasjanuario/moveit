import { createContext, ReactNode, useState } from 'react'

type ChallengesProviderProps = {
  children: ReactNode
}

type ChallengeContextData = {
  level: number 
  currenteExperience: number  
  challengesCompleted: number 
  levelUp: () => void 
  startNewChallenge: () => void 
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currenteExperience, setCurrenteExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    console.log('new challenge');
  }

  return (
    <ChallengesContext.Provider 
      value={
        { 
          level, 
          currenteExperience, 
          challengesCompleted, 
          levelUp, 
          startNewChallenge 
        }
      }>
      { children }
    </ChallengesContext.Provider>
  )
}