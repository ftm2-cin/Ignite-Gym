import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text} from 'native-base';
import { ScreenHeader, UserPhoto, Input, Button } from '@components';
import * as ImagePicker from 'expo-image-picker';

const PHOTO_SIZE = 33;

export default function ProfileScreen() {

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('https://avatars.githubusercontent.com/u/119615473?v=4');

    async function handleSelectImage() {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Eita, precisamos de acesso às suas fotos...');
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
            });
            if (!result.canceled) {
                setPhoto(result.assets[0].uri);
            }
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>
            <ScrollView mb={10}>
                <Center mt={6} px={10}>
                    {loading ?
                        <Skeleton h={PHOTO_SIZE} w={PHOTO_SIZE} rounded="full" />
                    :
                        <UserPhoto 
                            source={{ uri: photo}}
                            alt="User Photo"
                            size={PHOTO_SIZE}
                        />
                    }
                    <TouchableOpacity onPress={handleSelectImage}>
                        <Text color="green.500" fontSize="md" fontWeight="bold" mt={3} mb={8}>Editar foto</Text>
                    </TouchableOpacity>
                    <Input bg="gray.600" placeholder="Nome" />
                    <Input bg="gray.600" placeholder="Email" isDisabled/>
                </Center>

                <VStack mt={6} px={10}>
                    <Text color="gray.100" fontSize="md" fontWeight="bold" mb={2}>Alterar Senha</Text>
                    <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry/>
                    <Input bg="gray.600" placeholder="Nova senha" />
                    <Input bg="gray.600" placeholder="Confirmar senha" />
                    <Button mt={6} title='Atualizar'>Salvar</Button>
                </VStack>
            </ScrollView>
        </VStack>
    );
}
