import React from 'react'

const functionTemplate = () => {}
export const initValue = {
  data: {},
  setData: functionTemplate,
}
const DataContext = React.createContext(initValue)
export const DataProvider = DataContext.Provider
export default DataContext