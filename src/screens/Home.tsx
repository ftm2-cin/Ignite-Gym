import { HStack, VStack, FlatList, Heading, Text} from 'native-base';
import { ExerciseCard, Group, HomeHeader } from '@components';
import React, { useState } from 'react';

export default function HomeScreen() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro']);
    const [exercises, setExercises] = useState(['Supino Reto', 'Supino Inclinado', 'Supino Declinado', 'Crucifixo']);
    const [groupSelected, setGrupoSelected] = useState('Costas'); 
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
                        <ExerciseCard name={item} />
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