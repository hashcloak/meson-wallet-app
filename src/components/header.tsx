import Link from 'next/link'
import { Button } from './atoms/Button'

export default function Header() {
  return (
    <div className='flex justify-between'>
      <span className='text-2xl font-bold text-red-900'>This is a test</span>

      <ul>
        <li>
          <Link legacyBehavior href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href='/about'>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href='/about'>
            <Button>Test</Button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
