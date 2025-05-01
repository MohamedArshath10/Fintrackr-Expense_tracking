import React, { useState } from 'react'

const AddIncomeForm = ({onAddIncome}) => {

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        date: "",
        icon: ""
    })
    const handleChange = (key, value) => setIncome({...Income, [key]: value })
  return (
    <div>
        <Input 
            value={income.source}
            onChange={({target}) => handleChange("source", target.value)}
            label="Income Source"
            placeholder="Freelance, Salary, etc..."
            type='text'
        />
    </div>
  )
}

export default AddIncomeForm