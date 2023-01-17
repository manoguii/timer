import { useState } from 'react'
import { Button } from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="primary" />
      <Button variant="secondary"/>
      <Button variant="success"/>
      <Button variant="danger"/>
    </>
  )
}

export default App
