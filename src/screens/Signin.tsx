import {VStack, Image, Center, Text, Heading, ScrollView} from 'native-base';
import { Input, Button } from "@components"
import BackGroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouterProps } from '../routes/auth.routes';
export default function SignInScreen() {

    const navigation = useNavigation<AuthNavigatorRouterProps>();
    function handleSignUp() {
        navigation.navigate('SignUp');
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
                <Input 
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Senha'
                    secureTextEntry
                />
                <Button title='Acessar'/>
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