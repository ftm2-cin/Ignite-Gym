import { HStack, Heading, Text, VStack, Icon } from "native-base";
import UserPhoto from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/useAuth";
import defaultUserPhoto from '@assets/userPhotoDefault.png';
export default function HomeHeader(){
    const { user, signOut } = useAuth();
    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto 
                size={16} 
                source={user.avatar ? { uri: user.avatar } : defaultUserPhoto}
                alt="User Photo"
                mr={4}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">Olá,</Text>
                <Heading color="gray.100" fontSize="md">{user.name}</Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
            </TouchableOpacity>
        </HStack>
    );
}
