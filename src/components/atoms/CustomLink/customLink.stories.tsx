import CustomLink from '.';

export default {
  title: 'Components/Atmos/CustomLink',
  component: CustomLink,
};

export const Default: React.FC = () => (
  <CustomLink url={'https://'} size={'base'}>
    Sample link
  </CustomLink>
);
