import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text} from 'native-base';
import { ScreenHeader, UserPhoto, Input, Button } from '@components';

const PHOTO_SIZE = 33;
export default function ProfileScreen() {

    const [loading, setLoading] = useState(false);
    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>
            <ScrollView mb={10}>
                <Center mt={6} px={10}>
                    {loading ?
                        <Skeleton h={PHOTO_SIZE} w={PHOTO_SIZE} rounded="full" />
                    :
                        <UserPhoto 
                            source={{ uri: 'https://avatars.githubusercontent.com/u/119615473?v=4'}}
                            alt="User Photo"
                            size={PHOTO_SIZE}
                        />
                    }
                    <TouchableOpacity>
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