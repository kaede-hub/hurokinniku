import { InputGroup, InputRightElement, Input, Button, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";


type Props = {
  onSearch: (value: string) => void;
}

function SearchForm(props: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSearch(value);
  }


  return (
    
    <form onSubmit={handleSubmit}>
        <Input 
        type="text" 
        placeholder="    地名を入力   例:東京"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        borderRadius={"10px"}
        fontFamily="游ゴシック, YuGothic, sans-serif"
        cursor="pointer"
        _hover={{ cursor: "pointer" }}/>
        <Button
         borderRadius={"10px"}
         cursor="pointer"
        _hover={{ cursor: "pointer" }}
        fontFamily="游ゴシック, YuGothic,sans-serif">
          検索
        </Button>
    </form>
    
  );
}

export default SearchForm;
