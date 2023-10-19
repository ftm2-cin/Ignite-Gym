import { Button as NativeBaseButton , Center, IButtonProps} from "native-base";

export default function Button({ ...props }: IButtonProps) {
  return (
    <Center>
        <NativeBaseButton
            bg="gray.700"
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="white"
            fontFamily="body"
            mb={4}
            {...props}
        />
    </Center>
  );
}