import { useState } from 'react';
import { HStack, VStack, FlatList, Heading, Text} from 'native-base';
import { ExerciseCard, Group, HomeHeader } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '../routes/app.routes';
export default function HomeScreen() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro']);
    const [exercises, setExercises] = useState(['Supino Reto', 'Supino Inclinado', 'Supino Declinado', 'Crucifixo']);
    const [groupSelected, setGrupoSelected] = useState('Costas'); 

    const navigation = useNavigation<AppRoutesNavigationProps>();
    
    function handleOpenExercise() {
        navigation.navigate('Exercise');
    }
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
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <ExerciseCard name={item} onPress={handleOpenExercise}/>
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