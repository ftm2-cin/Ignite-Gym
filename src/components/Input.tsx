import { Input as NativeBaseInput , Center, IInputProps} from "native-base";

export default function Input({ ...rest }: IInputProps) {
  return (
    <Center>
        <NativeBaseInput 
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={4}
        {...rest}
        />
    </Center>
  );
}