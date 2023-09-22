import React from 'react'
import css from './Button.module.css'

const Button = ({loadMore, currentPage: { page, totalPage }}) => {
  return (
    <button type="button" className={css.Button} onClick={loadMore}> {page}/{totalPage} - Load more</button>
  )
}

export default  Button