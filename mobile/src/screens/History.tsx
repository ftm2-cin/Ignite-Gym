import { useCallback, useState } from 'react';
import { VStack, SectionList, Heading, Center, useToast} from 'native-base';
import { ScreenHeader, HistoryCard } from '@components';
import { api } from '../services/api';
import { AppError } from '../utils/AppError';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryByDayDTO } from '../types/HistoryByDayDTO';

export default function HistoryScreen() {
    const toast = useToast();
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

    async function fetchHistory() {
        try{
            const response = await api.get(`/history`);
            setExercises(response.data);
        }catch
        (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao buscar histórico';
            toast.show({
                 title,
                 placement: 'top',
                 bgColor: 'red.500',
            });
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }
    , []));

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios"/>
            <SectionList
                sections={exercises}
                keyExtractor={ item => item.id }
                renderItem={({ item }) => (
                    <HistoryCard name={item.name} time={item.hour} group={item.group} />
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
