import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base';
import { Input, Button } from "@components"
import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

export default function SignUpScreen() {
    return (
        <ScrollView contentContainerStyle = {{ flexGrow: 1}}>
            <VStack flex={1} bg='gray.700' px={5}>
                <Image source={BackGroundImg} alt="Treino" resizeMode='contain' position='absolute'/>
                <Center my={24}>
                    <Logo/>
                    <Text color="gray.100" fontSize="sm">
                        Treine com sua mente e corpo
                    </Text>

                </Center>
                <Heading color="gray.100" textAlign="center" fontSize="xl" fontWeight="bold" mb={6}>
                    Crie sua conta
                </Heading>
                <Input 
                    placeholder='Nome'
                />
                <Input 
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Senha'
                    secureTextEntry
                />
                <Button title='Criar e acessar'/>
                <Button title='Voltar para login' variant="outline" mt={24}/>
            </VStack>
        </ScrollView>
    );
  }