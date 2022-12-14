import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)
  const [texts, setTexts] = useState({
    title: '',
    desc: ''
  })

  function toggle() {
    setIsShowing(!isShowing)
  }

  function prompt(title: string, desc: string) {
    setIsShowing(true)
    setTexts({ title, desc })
  }

  return {
    isShowing,
    toggle,
    prompt,
    title: texts.title,
    desc: texts.desc
  }
}

export default useModal
