import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IProps {
  children: React.ReactNode
}

const Portal: (props: IProps) => React.ReactPortal | null = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
        children,
        document.querySelector('#portal') as Element | DocumentFragment
      )
    : null
}

export default Portal
