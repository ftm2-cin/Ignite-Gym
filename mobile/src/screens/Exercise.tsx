import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack, Image, ScrollView, useToast, Box} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '../routes/app.routes';
import { BoxExercise } from '@components';
import { Feather } from '@expo/vector-icons'
import Body from '@assets/body.svg';

import { useEffect, useState  } from 'react';
import { api } from '../services/api';
import { AppError } from '../utils/AppError';
import { ExerciseDTO } from '../types/ExerciseDTO';

type Props = {
    exerciseId: string;
}

export default function ExerciseScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
    const toast = useToast();

    const navigation = useNavigation<AppRoutesNavigationProps>();
    
    const route = useRoute();
    const { exerciseId } = route.params as Props;

    function GoBack () {
        navigation.goBack();
    }

    async function fetchExercise() {
        try{
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);
        }catch
        (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao buscar exercício';
            toast.show({
                 title,
                 placement: 'top',
                 bgColor: 'red.500',
            });
        }finally
        {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
          
          await api.post('/history', { exercise_id: exerciseId });
    
          toast.show({
            title: 'Parabéns! Exercício registrado no seu histórico.',
            placement: 'top',
            bgColor: 'green.500'
          });
    
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : 'Não foi possível registrar exercício.';
    
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
          })
        }
      }
    

    useEffect(() => {
        fetchExercise();
    }
    , [exerciseId]);

    if(isLoading) {
        return (
            <VStack flex={1} justifyContent="center" alignItems="center">
                <Text color="gray.100" fontSize="lg">Carregando...</Text>
            </VStack>
        );
    }
    return (
        <VStack flex={1} >
                <VStack px={7} bg="gray.600" pt={12}>

                    <TouchableOpacity>
                        <Icon as={Feather} name="arrow-left" size={6} color="green.500" onPress={GoBack}/>
                    </TouchableOpacity>

                    <HStack justifyContent="space-between" mt={5} mb={8} alignItems="center">
                        <Heading color="gray.100" fontSize="lg" flexShrink={1} ml={1}>{exercise.name}</Heading>

                        <HStack alignItems="center">
                            <Body/>
                            <Text color="gray.200" fontSize="sm" ml={1} textTransform="capitalize">{exercise.group}</Text>
                        </HStack>

                    </HStack>

                </VStack>

                <ScrollView>
                    <VStack flex={1} bg="gray.700" px={7} py={5}>
                        <Box rounded="lg" mb={3} overflow="hidden">
                            <Image
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
                                alt="Exercise Photo"
                                w='full'
                                h={80}
                                resizeMode="cover"
                            />
                        </Box>
                        <BoxExercise series={exercise.series} repetitions={exercise.repetitions} onPress={handleExerciseHistoryRegister}/>
                    </VStack>
                </ScrollView>
        </VStack>
    );
}