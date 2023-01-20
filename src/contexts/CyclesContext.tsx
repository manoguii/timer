import React, { createContext, ReactNode, useReducer, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { cyclesReducer, ICycle } from '../reducers/cycles'

interface ICyclesContextProvider {
  children: ReactNode
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
  interruptCycle: () => void
  createNewCycle: (data: ICreateCycle) => void
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({ children }: ICyclesContextProvider) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

  function createNewCycle(data: ICreateCycle) {
    const newCycle: ICycle = {
      id: uuidV4(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        interruptCycle,
        createNewCycle,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
