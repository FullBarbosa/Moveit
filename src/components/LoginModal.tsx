import React, { useContext, useState } from 'react'

import style from '../styles/pages/index.module.css'

import { ChallegsContext } from '../contexts/ChallengsContext'

const LoginModal = () => {

  const{teste, setLogGit}= useContext(ChallegsContext)
  
  return (
    
      <div className={style.container}>
        <div className={style.logo}>
        </div>
        <div className={style.login}>

          <img src="../../../img/Logo.png" alt="" />

          <section>
            <h1>Bem-vindo!</h1>
            <img src="../../../img/Git.png" alt="" />

            <form onSubmit={teste}>
              <input type="text" onChange={(event) => setLogGit(event.target.value)} />
              <button >
                <img src="../../../img/Vector.png" alt="" />
              </button>
            </form>
          </section>
        </div>
      </div>
  )
}


export default LoginModal
