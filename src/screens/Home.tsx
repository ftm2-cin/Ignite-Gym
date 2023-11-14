import { Center, Text, VStack} from 'native-base';
import { HomeHeader } from '@components';
import React from 'react';

export default function HomeScreen() {
    return (
        <VStack flex={1}>
            <HomeHeader />
        </VStack>
    );
}