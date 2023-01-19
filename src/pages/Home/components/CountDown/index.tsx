import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsdifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsdifference >= totalSeconds) {
          setCycles((state) => {
            return state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                setActiveCycleId(null)

                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              } else {
                return cycle
              }
            })
          })

          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsdifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, cycles])

  return (
    <CountDownContainer>
      <span>{minutes[0] /* pega a PRIMEIRA posição da STRING */}</span>
      <span>{minutes[1] /* pega a SEGUNDA posição da STRING */}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
