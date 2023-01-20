import React, { createContext, ReactNode, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface ICyclesContextProvider {
  children: ReactNode
}

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICreateCycle {
  task: string
  minutesAmount: number
}

interface ICyclesContext {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  interruptedCycle: () => void
  createNewCycle: (data: ICreateCycle) => void
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({ children }: ICyclesContextProvider) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
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
  }

  function createNewCycle(data: ICreateCycle) {
    const newCycle: ICycle = {
      id: uuidV4(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => {
      return [...state, newCycle]
    })

    setActiveCycleId(newCycle.id)

    setAmountSecondsPassed(0)
  }

  function interruptedCycle() {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      })
    })

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        interruptedCycle,
        createNewCycle,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
