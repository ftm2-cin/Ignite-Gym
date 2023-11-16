import { HStack, Heading, Text, VStack } from "native-base";

type HistoryCardProps = {
    group: string;
    name: string;
    time: string;
}
export default function HistoryCard({ name, group, time }: HistoryCardProps) {
    return (
        <HStack bg="gray.700" borderRadius={8} justifyContent="space-between" px={5} py={4} mb={3} bgColor="gray.600" alignItems="center">
            <VStack mr={5}>
                <Heading color="gray.100" fontSize="md" textTransform="capitalize">{group}</Heading>
                <Text color="gray.100" fontSize="lg">{name}</Text>
            </VStack>
            <Text color="gray.300" fontSize="md">{time}</Text>
        </HStack>
    );
}