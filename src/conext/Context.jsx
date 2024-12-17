import React, { createContext, useState } from 'react'

export const addResponseContext = createContext()
export const logoutResponseContext = createContext()
export const chatResponse = createContext()


function Context({ children }) {
  const [addResponse, setAddResponse] = useState("")
  const [log, setLog] = useState(true)
  const [targetedUser, setTargetedUser] = useState([])
  return (
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <logoutResponseContext.Provider value={{ log, setLog }}>
        <chatResponse.Provider value={{ targetedUser, setTargetedUser }}>
          {children}
        </chatResponse.Provider>
      </logoutResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default Context