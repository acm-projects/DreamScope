import { Text } from 'react-native';

type OptionType = {
    name: string;
};

export default function ListOptions({ option }: { option: OptionType }) {
    return <Text style={{ fontSize: 30 }}>{option.name}</Text>;
}