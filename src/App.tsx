import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { useEffect, useState } from 'react'
import LoadingScreen from './components/loading-screen'
import { auth } from './firebase'

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: black;
  color: white;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
