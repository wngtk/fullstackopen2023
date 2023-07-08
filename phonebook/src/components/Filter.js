import { useState } from 'react'

const Filter = ({ updateFilterText }) => {
    const [text, setText] = useState('')
  
    const handleChange = (e) => {
      const value = e.target.value
      setText(value)
      updateFilterText(value)
    }
  
    return (
      <div>
        filter shown with
        <input type="text" value={text} onChange={handleChange} />
      </div>
    )
}

export default Filter
  