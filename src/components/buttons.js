import React from 'react'

export const Button = ({ color, classes, onClick, children, url }) => (
  <div url={ url } className={`d-flex justify-content-center align-items-center ${ classes ? classes : ''}`} style={{ color: 'white', backgroundColor: color ? color : 'grey', textAlign: 'center', cursor: 'pointer' }} onClick={ onClick }>
    { children }
  </div>
)