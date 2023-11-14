import { HStack, VStack, FlatList, Heading, Text} from 'native-base';
import { Group, HomeHeader } from '@components';
import React, { useState } from 'react';

export default function HomeScreen() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro']); 
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
                    px: 8,
                }}
                maxH={10}
            />
            <VStack flex={1} px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md">Exercícios</Heading>
                    <Text color="gray.200" fontSize="sm">4</Text>
                </HStack>
            </VStack>

        </VStack>
    );
}