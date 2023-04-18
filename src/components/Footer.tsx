import React from 'react'
import { Box, Button, Text } from "@chakra-ui/react";

function handleClick() {
  window.location.href = "https://example.com/";
}

function Footer() {
  return (
    <Box
      bg="#38B6FF"
      height="100%"
      margin="0" padding="0"
      textAlign={"center"}
      >
      <Text
        onClick={handleClick}
        fontFamily="游ゴシック, YuGothic, sans-serif"
        cursor="pointer"
        _hover={{ cursor: "pointer" }}
        color="white"
        fontSize={"15px"}
        fontWeight={"bold"}>
        トップページに戻る
      </Text>
    </Box>
  )
}

export default Footer