import { Button, Text, Timeline } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const CartPage = () => {
    
    const [ color, setColor ] = useState("Red")
    const [ timeLeft, setTime ] = useState(10)
    const [ isRunning, setRunning ] = useState(false)

    useEffect(() => {
      if (!isRunning) return
  
      const intervalId = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId)
            setRunning(false)
            return "Time's up!"
          }
          return prev - 1
        })
      }, 1000)
  
      // Cleanup if component unmounts or isRunning becomes false
      return () => clearInterval(intervalId)
    }, [isRunning])

  return (
    <>
    <Text>My Favorite color is {color}! </Text>
    <Button onClick={() => setColor("Blue")}>
        Blue
    </Button>

    <Text>Time Left: {timeLeft} </Text>

    <Button onClick={() => setRunning(true)}>
        Start
    </Button>

    <Button onClick={() => {setRunning(false); setTime(10)}}>
        Reset
    </Button>
    </>
  )
}

export default CartPage