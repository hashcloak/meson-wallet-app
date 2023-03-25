import { useState } from 'react'

export default function Footer() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}>Count+</button>
      </div>
      <p>Footerコンポーネント</p>
    </div>
  )
}
