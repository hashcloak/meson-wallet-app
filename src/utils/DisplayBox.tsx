type Props = {
  title: string
  children: React.ReactNode
}

export const DisplayBox: React.FC<Props> = ({ title, children }) => (
  <div className='flex flex-col mb-10'>
    <p className='text-2xl text-textBlack'>{title}</p>
    <div
      className={`border-solid border border-gray-900	py-4 px-8 rounded-2xl drop-shadow-sm bg-bgWhite w-full`}
    >
      {children}
    </div>
  </div>
)
