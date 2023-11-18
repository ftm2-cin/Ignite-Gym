import { Box, HStack, Text } from "native-base";
import SeriesSvg from '@assets/series.svg';
import RepSvg from '@assets/repetitions.svg';
import Button from "./Button";


type BoxExerciseProps = {
    series: string;
    repetitions: string;
    onPress?: () => void;
}
export default function BoxExercise({onPress, series, repetitions}: BoxExerciseProps) {
    return (
        <Box bg="gray.600" rounded="md" px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                <HStack alignItems="center" mb={2}>
                    <SeriesSvg/>
                    <Text color="gray.200" fontSize="sm" ml={2} textTransform="capitalize">{series}</Text>
                </HStack>

                <HStack alignItems="center" mb={2}>
                    <RepSvg/>
                    <Text color="gray.200" fontSize="sm" ml={2} textTransform="capitalize">{repetitions}</Text>
                </HStack>
            </HStack>

            <Button title="Marcar como realizado" onPress={onPress}/>
        </Box>
    );
}