import React from 'react'
import css from './Button.module.css'

const Button = ({loadMore}) => {
  return (
    <button type="button" className={css.Button} onClick={loadMore}>Load more</button>
  )
}

export default  Button