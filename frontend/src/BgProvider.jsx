import React from 'react'

const BgProvider = ({children}) => {
  return (
      <div className="w-screen h-screen  ">{children}</div>
  );
}

export default BgProvider