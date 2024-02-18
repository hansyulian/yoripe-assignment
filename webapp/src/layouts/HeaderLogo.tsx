import { Box, Image, Text } from "@mantine/core"
import yoripeLogo from '../assets/yoripe-logo.webp';
import layoutStyles from './layout.module.scss'


export const HeaderLogo = () => {
  return (
    <Box className={layoutStyles.headerLogo}>
      <Image src={yoripeLogo} h={15} w='auto'/>      
      <Text>Hans Yulian</Text>
    </Box>

  )
}