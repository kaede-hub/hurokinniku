import { InputGroup, InputRightElement, Input, Button, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchForm() {
  return (
    
    <form>
        <Input 
        type="text" 
        placeholder="    地名を入力   例:東京"
        borderRadius={"10px"}
        fontFamily="游ゴシック, YuGothic, sans-serif"
        cursor="pointer"
        _hover={{ cursor: "pointer" }}/>
    </form>
    
  );
}

export default SearchForm;
