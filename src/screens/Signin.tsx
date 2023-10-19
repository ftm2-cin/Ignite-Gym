import {VStack, Image, Center, Text, Heading} from 'native-base';
import { Input } from "@components"
import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

export default function SignInScreen() {
    return (
    <VStack flex={1} bg='gray.700'>
        <Image source={BackGroundImg} alt="Treino" resizeMode='contain' position='absolute'/>
        <Center my={24}>
            <Logo/>
            <Text color="gray.100" fontSize="sm">
                Treine com sua mente e corpo
            </Text>

        </Center>
        <Heading color="gray.100" textAlign="center" fontSize="xl" fontWeight="bold" mb={6}>
            Acesse sua conta
        </Heading>
        <Input placeholder='Email' />
        <Input placeholder='Senha' />
    </VStack>
    );
  }