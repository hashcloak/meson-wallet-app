type Props = {
  isActive: boolean
}

const VerticalBar: React.FC<Props> = ({ isActive }) => {
  return (
    <div className='my-4'>
      <svg
        width='74'
        height='34'
        viewBox='0 0 74 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line
          x1='36'
          y1='34'
          x2='36'
          stroke={isActive ? '#38C6F4' : '#E5E5E5'}
          strokeWidth='2'
        />
      </svg>
    </div>
  )
}

export default VerticalBar
