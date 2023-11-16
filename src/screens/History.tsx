import { Center, VStack } from 'native-base';
import { ScreenHeader } from '@components';

export default function HistoryScreen() {
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios"/>
        </VStack>
    );
}