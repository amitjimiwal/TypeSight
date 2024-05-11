import React, { ReactNode } from 'react'
interface Props{
     children:ReactNode
}
const TypingContext = ({children}:Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default TypingContext
