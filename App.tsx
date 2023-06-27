import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigations/stack'
import SplashScreen from './src/screens/splash'

const App = () => {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000)
  }, [])
  return (
    <>
      {showSplash &&
        <SplashScreen />
      }
      {!showSplash &&
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      }
    </>
  )
}

export default App