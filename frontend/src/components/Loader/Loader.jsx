import React from 'react'
import './Loader.css';
import { Grid } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='loader-parent'>
     <Grid
  visible={true}
  height="80"
  width="80"
  color="#DF0805"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
  )
}

export default Loader;