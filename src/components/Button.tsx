import { Button as NativeBaseButton , IButtonProps, Text} from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export default function Button({title, variant, ...props}: ButtonProps) {
  return (
      <NativeBaseButton
        w="full"
        h={14}
        mb={6}
        bg={ variant == "outline" ? "transparent" : "green.500"}
        borderWidth={ variant == "outline" ? 1 : 0}
        borderColor="green.500"
        rounded={"sm"}
        _pressed={{ bg: variant == "outline" ? "gray.500" : "green.600"}}
        {...props}
      >
      <Text
        fontSize="sm"
        fontWeight="bold"
        color={ variant == "outline" ? "green.500" : "white"}
      >
        {title}
      </Text>
      </NativeBaseButton>
  );
}