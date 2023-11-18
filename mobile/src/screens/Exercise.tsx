import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack, Image, ScrollView} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '../routes/app.routes';
import { BoxExercise } from '@components';
import { Feather } from '@expo/vector-icons'
import Body from '@assets/body.svg';
import React from 'react';

export default function ExerciseScreen() {

    const navigation = useNavigation<AppRoutesNavigationProps>();
    
    function GoBack () {
        navigation.goBack();
    }
    return (
        <VStack flex={1} >
                <VStack px={7} bg="gray.600" pt={12}>

                    <TouchableOpacity>
                        <Icon as={Feather} name="arrow-left" size={6} color="green.500" onPress={GoBack}/>
                    </TouchableOpacity>

                    <HStack justifyContent="space-between" mt={5} mb={8} alignItems="center">
                        <Heading color="gray.100" fontSize="lg" flexShrink={1} ml={1}>Supino Reto</Heading>

                        <HStack alignItems="center">
                            <Body/>
                            <Text color="gray.200" fontSize="sm" ml={1} textTransform="capitalize">Costas</Text>
                        </HStack>

                    </HStack>

                </VStack>

                <ScrollView>
                    <VStack flex={1} bg="gray.700" px={7} py={5}>
                        <Image
                            source={{ uri: 'https://blog.gsuplementos.com.br/wp-content/uploads/2021/04/iStock-1246046696.jpg'}}
                            alt="Exercise Photo"
                            w='full'
                            h={80}
                            rounded="lg"
                            mb={4}
                            resizeMode="cover"
                        />
                        <BoxExercise series="3 Séries" repetitions='12 repetições'/>
                    </VStack>
                </ScrollView>
        </VStack>
    );
}