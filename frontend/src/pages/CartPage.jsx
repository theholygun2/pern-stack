import { Button, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const CartPage = () => {
    
    const [ color, setColor ] = useState("Red")
    const [ timeLeft, setTime ] = useState(10)
    const [ isRunning, setRunning ] = useState(false)

  return (
    <>
    <Text>My Favorite color is {color}! </Text>
    <Button onClick={() => setColor("Blue")}>
        Blue
    </Button>

    <Text>Time Left: {timeLeft} </Text>

    <Button>
        Start
    </Button>

    <Button>
        Reset
    </Button>
    </>
  )
}

export default CartPage