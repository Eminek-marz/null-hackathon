import { createContext, useContext } from 'react'

export const StudyUnitContext = createContext({
  unitId: 'ds',
  setUnitId: () => {},
})

export function useStudyUnit() {
  return useContext(StudyUnitContext)
}
