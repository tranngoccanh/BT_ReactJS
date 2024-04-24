import { createContext, useState } from "react";
import { getProfileFromLS } from "../../utils/auth";
  
  const initialAppContext = {
    profile: getProfileFromLS(),
    setProfile: () => null,
  }
  
  export const AppContext = createContext(initialAppContext)
  
  export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState(initialAppContext.profile)
    const [users, setUser] = useState(initialAppContext.users)

    return (
      <AppContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          profile,
          setProfile,
          users,
          setUser
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }