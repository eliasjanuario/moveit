import { createContext, ReactNode, useContext, useState, useEffect } from 'react'

import { ChallengesContext } from './ChallengesContext'

type CountdownProviderProps = {
  children: ReactNode
}

type CountdownContextData = {
  minutes: number 
  seconds: number
  isActive: boolean
  hasFinished: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)

let countDownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(0.05 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={
      { 
        minutes, 
        seconds, 
        isActive, 
        hasFinished, 
        startCountdown, 
        resetCountdown 
      }
    }>
      { children }
    </CountdownContext.Provider>
  )
}