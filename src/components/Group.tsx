import { Text, Pressable } from "native-base";

type Props = {
    name: string;
    isActived?: boolean;
    onPress?: () => void;
};

export default function Group({name, isActived, onPress, ...rest}: Props) {
    return (
        <Pressable
            mr={3}
            w={24}
            h={10}
            bg="gray.600"
            rounded="md"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            isPressed={isActived}
            _pressed={{
                borderColor: 'green.500',
                borderWidth: 1,
            }}
            onPress={onPress}
            {...rest}
        >
            <Text 
                color={isActived ? 'green.500' : 'gray.200'}
                textTransform="uppercase" 
                fontSize="xs" 
                fontWeight="bold"
            >
                {name}
            </Text>
        </Pressable>
    );
}