import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, useToast} from 'native-base';
import { ScreenHeader, UserPhoto, Input, Button } from '@components';
import * as ImagePicker from 'expo-image-picker';

import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../services/api';
import { AppError } from '../utils/AppError';

const PHOTO_SIZE = 33;

type FormData = {
    name: string;
    email: string;
    oldPassword: string;
    password: string | null;
    confirmPassword: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
    oldPassword: yup.string().required('Senha antiga é obrigatória'),
    password: yup.string().required('Nova senha é obrigatória').nullable().transform(value => (value === '' ? null : value)),
    confirmPassword: yup.string()
        .nullable()
        .transform(value => (value === '' ? null : value))
        .required('Confirmação de Senha obrigatória')
        .oneOf([yup.ref('password')], 'Senhas não conferem'),
});

export default function ProfileScreen() {

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('https://avatars.githubusercontent.com/u/119615473?v=4');
    const toast = useToast();
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


    const { user, updateUser } = useAuth();
    const { control, handleSubmit, formState: {errors} } = useForm<FormData>(
        {
            defaultValues: {
                name: user.name,
                email: user.email,
            },
            resolver: yupResolver(schema),
        }
    );

    async function handleProfileUpdate(form: FormData) {
        try {

            const userUpdated = user;
            userUpdated.name = form.name;
            await api.put('/users', form);
            await updateUser(userUpdated);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao atualizar perfil';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil"/>
            <ScrollView mb={10}>
                <Center mt={6}>
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
                </Center>
                <VStack px={10}>
                    <Controller 
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input bg="gray.600" placeholder="Nome" onChangeText={onChange} value={value} error={errors.name?.message}/>
                        )}
                        name="name"
                    />

                    <Controller
                        control={control}
                        render={({ field: { value } }) => (
                            <Input bg="gray.600" placeholder="Email" value={value} isDisabled/>
                        )}
                        name="email"
                    />
                </VStack>

                <VStack mt={6} px={10}>
                    <Text color="gray.100" fontSize="md" fontWeight="bold" mb={2}>Alterar Senha</Text>

                    <Controller 
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input bg="gray.600" placeholder="Senha antiga" onChangeText={onChange} />
                        )}
                        name="oldPassword"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input bg="gray.600" placeholder="Nova senha" onChangeText={onChange} error={errors.password?.message} secureTextEntry/>
                        )}
                        name="password"
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange } }) => (
                            <Input bg="gray.600" placeholder="Confirmar senha" onChangeText={onChange} error={errors.confirmPassword?.message} secureTextEntry/>
                        )}
                        name="confirmPassword"
                    />
                    <Button 
                        mt={6} 
                        title='Atualizar' 
                        onPress={handleSubmit(handleProfileUpdate)}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    );
}
