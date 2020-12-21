import React, {Component} from 'react'
import Cookies from "js-cookie"
const UserContext = React.createContext()


class UserProvider extends Component {
    // Context state
    state = {
      user: JSON.parse(Cookies.get('user'))
    }
    
    // Method to update state
    setUser = (user) => {
      this.setState((prevState) => ({ user }))
    }
  
    render() {
      const { children } = this.props
      const { user } = this.state
      const { setUser } = this
  
      return (
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          {children}
        </UserContext.Provider>
      )
    }
  }

export const UserConsumer = UserContext.Consumer
export { UserProvider }
export default UserContext