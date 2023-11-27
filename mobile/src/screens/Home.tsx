import { useCallback, useEffect, useState } from 'react';
import { HStack, VStack, FlatList, Heading, Text, useToast} from 'native-base';
import { ExerciseCard, Group, HomeHeader } from '@components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '../routes/app.routes';


import { api } from '../services/api';
import { AppError } from '../utils/AppError';
import { ExerciseDTO } from '../types/ExerciseDTO';

export default function HomeScreen() {
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGrupoSelected] = useState(groups[0]); 
    const toast = useToast();
    const navigation = useNavigation<AppRoutesNavigationProps>();
    
    function handleOpenExercise(exerciseId : string) {
        navigation.navigate('Exercise', { exerciseId });
    }

    async function fetchGroups() {
        try{
            const response = await api.get('/groups');
            setGroups(response.data);
        }catch
        (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao buscar exercícios';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });
        }
    }

    async function fetchExercisesbyGroup() {
        try{
            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);
            
        }catch
        (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao buscar exercícios';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });
        }
    }

    useEffect(() => {
        fetchGroups();
    }
    , []);

    useFocusEffect(useCallback(() => {
        fetchExercisesbyGroup();
    }
    , [groupSelected]));
    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <Group 
                        name={item} 
                        isActived={groupSelected == item}
                        onPress={() => setGrupoSelected(item)}
                    />
                )}
                horizontal
                my={5}
                _contentContainerStyle={{
                    px: 5,
                }}
                maxH={10}
                minH={10}
                showsHorizontalScrollIndicator={false}
            />
            <VStack flex={1} px={5}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md">Exercícios</Heading>
                    <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
                </HStack>
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <ExerciseCard data={item} onPress={() => handleOpenExercise(item.id)}/>
                    )}
                    _contentContainerStyle={{
                        pb: 8,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </VStack>

        </VStack>
    );
}