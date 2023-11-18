import { useState } from 'react';
import {VStack, Image, Center, Text, Heading, ScrollView, useToast } from 'native-base';
import { Input, Button } from "@components"

import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouterProps } from '../routes/auth.routes';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../hooks/useAuth';
import { AppError } from '../utils/AppError';

type FormData = {
    email: string;
    password: string;
};

const signInSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória'),
})

export default function SignInScreen() {
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const { control, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });

    const navigation = useNavigation<AuthNavigatorRouterProps>();

    function handleSignUp() {
        navigation.navigate('SignUp');
    }

    const toast = useToast();

    async function onSubmit({email, password}: FormData) {
        try{
            setLoading(true);
            await signIn(email, password);
        }
        catch(err){
            const isAppError = err instanceof AppError;
            if (isAppError) {
                toast.show({
                    title: err.message,
                    placement: 'top',
                    bgColor: 'red.500',
                });
            }
            else {
                toast.show({
                    title: 'Erro no servidor',
                    placement: 'top',
                    bgColor: 'red.500',
                });
            }
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle = {{ flexGrow: 1}}>
            <VStack flex={1} px={5}>
                <Image 
                    source={BackGroundImg} 
                    defaultSource={BackGroundImg} 
                    alt="Treino" 
                    resizeMode='contain' 
                    position='absolute'
                />
                <Center my={24}>
                    <Logo/>
                    <Text color="gray.100" fontSize="sm">
                        Treine com sua mente e corpo
                    </Text>

                </Center>
                <Heading 
                    color="gray.100" 
                    textAlign="center" 
                    fontSize="xl" 
                    fontWeight="bold" 
                    mb={6}
                >
                    Acesse sua conta
                </Heading>
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
                <Button title='Acessar' onPress={handleSubmit(onSubmit)} disabled={loading}/>
                <Center my={20}>
                    <Text color="gray.100" textAlign="center" fontSize="sm" mb={4}>
                        Ainda não tem acesso?
                    </Text>
                    <Button title='Criar Conta' variant="outline" onPress={handleSignUp}/>
                </Center>
            </VStack>
        </ScrollView>
    );
  }