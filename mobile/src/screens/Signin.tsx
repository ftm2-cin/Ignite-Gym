import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base';
import { Input, Button } from "@components"
import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouterProps } from '../routes/auth.routes';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    email: string;
    password: string;
};

const signUpSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória'),
})

export default function SignInScreen() {

    const { control, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation<AuthNavigatorRouterProps>();

    function handleSignUp() {
        navigation.navigate('SignUp');
    }

    function onSubmit({email, password}: FormData) {
        console.log(email, password);
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
                <Button title='Acessar' onPress={handleSubmit(onSubmit)}/>
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