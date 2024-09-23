import React from 'react'

function Container({children}) {
  // we can write return like this 
  return <div className='w-full max-w-7xl mx-auto p-4'>{children}</div>;
  
}

export default Container