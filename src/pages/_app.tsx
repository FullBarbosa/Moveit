import '../styles/global.css'


import { useState } from 'react'

// useContext
import { ChallengesProvider } from '../contexts/ChallengsContext'
import { CountdownContext, CountdownProvider } from '../contexts/CountdownContext'

function MyApp({ Component, pageProps }) {

  const [ level, setLevel] = useState(1)

  function levelUp(){

    setLevel(() => level +1)
  }


  return (
  // metodo para utilizar useContext envolvendo a aplicação no context
  <ChallengesProvider>
    <CountdownProvider>
      <Component {...pageProps} />
    </CountdownProvider>
  </ChallengesProvider>

  )
}

export default MyApp