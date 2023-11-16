import { HStack, Pressable, Text, Image, VStack, Heading, Icon } from "native-base";
import { Entypo } from '@expo/vector-icons';

type Props = {
    name: string;
    onPress?: () => void;
};


export default function ExerciseCard({name, ...rest}: Props) {
    return (
        <Pressable
            h={20}
            mb={3}
            bg="gray.500"
            rounded="md"
            justifyContent="center"
            overflow="hidden"
            _pressed={{
                borderColor: 'green.500',
                borderWidth: 1,
            }}
            {...rest}
        >
           <HStack p={2} alignItems="center" pr={4}>
                <Image
                    source={{ uri: 'https://blog.gsuplementos.com.br/wp-content/uploads/2021/04/iStock-1246046696.jpg'}}
                    alt="Exercise Photo"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"
                    {...rest}
                />
                <VStack>
                    <Heading fontSize="lg" color="white">{name}</Heading>
                    <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>3 séries x 12 repetições</Text>
                </VStack>
                <Icon
                    as={<Entypo name="chevron-right" />}
                    color="white"
                    size="sm"
                    ml="auto"
                />
            </HStack>
        </Pressable>
    );
}