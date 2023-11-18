import { useState } from 'react';
import { VStack, SectionList, Heading, Center } from 'native-base';
import { ScreenHeader, HistoryCard } from '@components';

export default function HistoryScreen() {

    const [exercises, setExercises] = useState([
        {
            title: '26.08',
            data: [
                { name: 'Supino Reto', time: '30 mins', group: 'Chest' },
                { name: 'Supino Inclinado', time: '20 mins', group: 'Chest' },
                { name: 'Supino Declinado', time: '25 mins', group: 'Chest' },
                { name: 'Crucifixo', time: '15 mins', group: 'Chest' }
            ]
        },
        {
            title: '27.08',
            data: [
                { name: 'Costas', time: '40 mins', group: 'Back' },
                { name: 'Supino Inclinado', time: '20 mins', group: 'Chest' },
                { name: 'Supino Declinado', time: '25 mins', group: 'Chest' },
                { name: 'Crucifixo', time: '15 mins', group: 'Chest' }
            ]
        }
    ]);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios"/>
            <SectionList
                sections={exercises}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => (
                    <HistoryCard name={item.name} time={item.time} group={item.group} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Heading color="gray.200" fontSize="md" mt={8} mb={3}>{title}</Heading>
                )}
                showsVerticalScrollIndicator={false}
                px={5}
                ListEmptyComponent={() => (
                    <Center flex={1}>
                        <Heading color="gray.100" fontSize="md" mt={8} mb={3}>Nenhum exercício registrado</Heading>
                    </Center>
                )}
            />
        </VStack>
    );
}
