import { FC, useEffect, useState, useCallback } from 'react'
import Layout from '../Layout'
import { Button, Typography } from '@mui/material'

const Results: FC = () => {
  const [number, setNumber] = useState(0)

  useEffect(() => {
    window.api.onAnswerNumber((_event, newNumber) => {
      setNumber(newNumber)
    })
  }, [])

  const handleButtonClick = useCallback(() => {
    window.api.askNumber()
  }, [])

  return (
    <Layout title="Results">
      <Typography component="p">Number is {number}</Typography>
      <Button onClick={handleButtonClick}>Ask number</Button>
    </Layout>
  )
}

export default Results
