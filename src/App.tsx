import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { useEffect, useState } from 'react'
import LoadingScreen from './components/loading-screen'

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: black;
  color: white;
  }
`


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    setTimeout(() => setIsLoading(false), 2000);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  )
}

export default App
