import { HStack, Heading, Text, VStack, Icon } from "native-base";
import UserPhoto from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default function HomeHeader(){
    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto 
                size={16} 
                source={{ uri: 'https://avatars.githubusercontent.com/u/119615473?v=4'}}
                alt="User Photo"
                mr={4}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">Olá,</Text>
                <Heading color="gray.100" fontSize="md">Felipe</Heading>
            </VStack>
            <TouchableOpacity>
                <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
            </TouchableOpacity>
        </HStack>
    );
}
