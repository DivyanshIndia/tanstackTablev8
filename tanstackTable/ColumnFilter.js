import React from 'react'
import styles from './ColumnFilter.module.css'

const ColumnFilter = ({value, setValue}) => {
  return (
    <div className={styles.search}>
        <input
        placeholder='Search record..'
        value={value}
        onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}

export default ColumnFilter