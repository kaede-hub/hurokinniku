import { Box, Link } from '@chakra-ui/react'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa';


function Header() {
  return (
    <Box as="header" bg="#38B6FF" height="100px" margin="0" padding="0">
    <Box display="flex" alignItems="center" height="100%">
      <img src="/images/logo.png" alt="Logo" height="80px" />
      <Box ml="auto">
        <Link href="https://twitter.com/K7943914490636"
        textDecoration="none">
          <Box 
          display="flex" 
          alignItems="center" 
          mr={"70px"}
          color="white"
          fontSize={"15px"}
          fontFamily="游ゴシック, YuGothic, sans-serif"
          cursor="pointer"
          _hover={{ cursor: "pointer" }}>
            <FaEnvelope size={15} />
            <Box ml={2}>フィードバッグ</Box>
          </Box>
        </Link>
      </Box>
    </Box>
  </Box>
  )
}

export default Header;