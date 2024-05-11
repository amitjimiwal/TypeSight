import React from 'react'

const WrongWord = ({letter}:{letter:string}) => {
  return (
    <span className='wrong'>
      {letter}
    </span>
  )
}

export default WrongWord
