import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
        {text1} <span className='text-teal-600'>{text2}</span>
      </h2>
    </div>
  )
}

export default Title
