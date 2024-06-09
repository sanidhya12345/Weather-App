import React from 'react'
import {useMediaQuery}  from 'react-responsive'
import App from './App'
import "./App.css"
function Main() {
  const isDesktop=useMediaQuery({query:'(min-width:1224px)'})
  const isMobileorTablet=useMediaQuery({query:'(min-width:425px)'})
  let comp;
  if(isDesktop){
    comp=<App minWidth="1224"></App>
  }
  else if(isMobileorTablet){
    comp=<App minWidth="425"></App>
  }
  return (
    <div className='main'>
        {comp}
    </div>
  )
}

export default Main
