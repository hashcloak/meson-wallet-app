import CustomLink from '.'

export default {
  title: 'Components/Atmos/CustomLink',
  component: CustomLink,
}

export const Default = () => (
  <CustomLink url={'https://'} size={'base'}>
    Sample link
  </CustomLink>
)
