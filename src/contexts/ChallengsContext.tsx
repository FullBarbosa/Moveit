import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challengs from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

import api from '../service/api'
import LoginModal from '../components/LoginModal';

interface challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: Date;
  type: string;
}

interface ChallegsContextData {
  
  gitName: string;
  gitImg: string;
  level: number;
  currentExperience: number;
  challengesCompletad: number;
  activeChallenge: challenge;
  experienceToNextLevel: number;
  setLogGit: any;

  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
  teste: (event:SyntheticEvent) => void;

}

interface ChallengesProviderProps {
  children: ReactNode
  level: number;
  currentExperience: number;
  challengesCompletad: number;
  gitName: string;
  gitImg: string;
  loginModal: boolean;
}


export const ChallegsContext = createContext({} as ChallegsContextData)

export function ChallengesProvider({
  children,

  ...rest
}: ChallengesProviderProps) {

  

  const [loginModal, setLoginModal] = useState(rest.loginModal ?? false)

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompletad, setchallengesCompletad] = useState(rest.challengesCompletad ?? 0)
  const [gitName, setGitName] = useState(rest.gitName)
  const [gitImg, setGitImg] = useState(rest.gitImg)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const [logGit, setLogGit] = useState()

  useEffect(() => {

    if (loginModal) {
      Cookies.set('loginModal', String(loginModal))
      Cookies.set('GitUser', String(gitName))
      Cookies.set('GitImg', String(gitImg))  
    }
  }, [loginModal])

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(() => level + 1)
    setisLevelUpModalOpen(true)
  }

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompletad', String(challengesCompletad))
    

  }, [level, currentExperience, challengesCompletad])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challengs.length)

    const challenge = challengs[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play

    if (Notification.permission === 'granted') {
      new Notification('novo desafio!!!', {
        body: `Valendo ${challenge.amount} Xp!`
      })
    }
  }


  function resetChallenge() {
    setActiveChallenge(null)
  }


  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      levelUp();
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setchallengesCompletad(challengesCompletad + 1)
  }

  function closeModal() {
    setisLevelUpModalOpen(false)
  }

  async function teste(event:any) {
    event.preventDefault()
    const dados = await api.get(logGit)
    const { name, avatar_url } = dados.data
    setGitName(name)
    setGitImg(avatar_url)
    setLoginModal(true)
    
  }


  return (
    <ChallegsContext.Provider
      value={{
        gitName,
        gitImg,
        setLogGit,
        teste,
        level,
        levelUp,
        currentExperience,
        startNewChallenge,
        challengesCompletad,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeModal,
      }}>


      {  loginModal && children || <LoginModal />}
      { isLevelUpModalOpen && < LevelUpModal />}


    </ChallegsContext.Provider>
  )
}