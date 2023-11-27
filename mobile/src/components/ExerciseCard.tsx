import { HStack, Pressable, Text, Image, VStack, Heading, Icon } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { api } from "../services/api";
import { ExerciseDTO } from "../types/ExerciseDTO";

type Props = {
    data: ExerciseDTO;
    onPress?: () => void;
};

export default function ExerciseCard({data, ...rest}: Props) {
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
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
                    alt="Exercise Photo"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"
                    {...rest}
                />
                <VStack>
                    <Heading fontSize="lg" color="white">{data.name}</Heading>
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