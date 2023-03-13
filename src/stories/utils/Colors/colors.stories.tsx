import { theme } from '../theme'

export default {
  title: 'Utils/Colors',
}

type Props = {
  name: string
}

const ColorStyle: React.FC<Props> = ({ name }) => (
  <div
    className={`border-solid border border-borderGray w-32 h-32 rounded-lg bg-${name}`}
  />
)

export const ColorsPalette = (): React.ReactElement => {
  const colors = Object.keys(theme.colors).reduce(
    (acc: { name: string; code: string }[], name: string) => {
      if (typeof (theme.colors as Record<string, unknown>)[name] === 'string') {
        acc.push({
          name,
          code: (
            (theme.colors as Record<string, unknown>)[name] as string
          ).toUpperCase(),
        })
      }
      return acc
    },
    []
  )

  return (
    <div className='flex flex-row w-screen flex-wrap'>
      {colors.map(({ name, code }) => (
        <div className='flex flex-col m-6' key={name}>
          <ColorStyle name={name} />
          <div className='mt-2 flex flex-col items-center text-textBlack'>
            <p>{name}</p>
            <p className='text-sm text-textGray'>{code}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
