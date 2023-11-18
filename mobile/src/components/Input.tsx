import { Input as NativeBaseInput , Center, IInputProps, FormControl} from "native-base";

type Props = IInputProps & {
  error?: string | null;
};
export default function Input({ error = null ,...props }: Props) {
  const invalid = !!error || props.isInvalid;
  return (
    <Center>
      <FormControl isInvalid={invalid} mb={4}>
          <NativeBaseInput 
              bg="gray.700"
              h={14}
              px={4}
              borderWidth={0}
              fontSize="md"
              color="white"
              fontFamily="body"
              placeholderTextColor="gray.300"
              _focus={{
                  bg: 'gray.700',
                  borderWidth: 1,
                  borderColor: 'green.500',
              }}
              isInvalid={invalid}
              _invalid={
                {
                  borderColor: 'red.500',
                  borderWidth: 1,
                }
              }
              {...props}
          />
          <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      </FormControl>
    </Center>
  );
}