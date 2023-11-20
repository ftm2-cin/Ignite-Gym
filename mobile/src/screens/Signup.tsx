
import { Input, Button } from "@components"
import {VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import Logo from '@assets/logo.svg';
import BackGroundImg from '@assets/background.png';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '@services';
import { useAuth } from '../hooks/useAuth';
import { AppError } from '../utils/AppError';

type FormData = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
};

const signUpSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória'),
    password_confirm: yup.string().required('Confirmação de Senha obrigatória').oneOf([yup.ref('password')], 'Senhas não conferem'),
})

export default function SignUpScreen() {
    const { control, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    });
    const navigation = useNavigation();

    const handlegoBack = () => {
        navigation.goBack();
    }

    const toast = useToast();
    const { signIn } = useAuth();

    async function onSubmit({name, email, password, password_confirm}: FormData) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password,
                password_confirm
            });
            toast.show({
                title: 'Conta criada com sucesso!',
                placement: 'top',
                bgColor: 'green.500',
            });
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            toast.show({
                title: isAppError ? error.message : 'Erro na criação da conta',
                placement: 'top',
                bgColor: 'red.500',
            });
        }
    }

    return (
        <ScrollView contentContainerStyle = {{ flexGrow: 1}}>
            <VStack flex={1} px={5}>
                <Image source={BackGroundImg} defaultSource={BackGroundImg} alt="Treino" resizeMode='contain' position='absolute'/>
                <Center my={24}>
                    <Logo/>
                    <Text color="gray.100" fontSize="sm">
                        Treine com sua mente e corpo
                    </Text>

                </Center>
                <Heading color="gray.100" textAlign="center" fontSize="xl" fontWeight="bold" mb={6}>
                    Crie sua conta
                </Heading>

                <Controller 
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder='Nome'
                            onChangeText={onChange}
                            value={value}
                            error={errors.name?.message}
                        />
                    )}
                    name="name"
                />

                <Controller 
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder='E-mail'
                            onChangeText={onChange}
                            value={value}
                            error={errors.email?.message}
                        />
                    )}
                    name="email"
                />

                <Controller 
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder='Senha'
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            error={errors.password?.message}
                        />
                    )}
                    name="password"
                />
                <Controller 
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder='Confirme a senha'
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            error={errors.password_confirm?.message}
                        />
                    )}
                    name="password_confirm"
                />
                
                <Button title='Criar e acessar' onPress={handleSubmit(onSubmit)}/>
                <Button title='Voltar para login' variant="outline" mt={18} onPress={handlegoBack}/>
            </VStack>
        </ScrollView>
    );
  }