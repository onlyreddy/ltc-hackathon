import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
    Card,
    TextInput,
    Chip,
    Button,
    Text,
} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const chips = [
    { id: '1', label: 'Family' },
    { id: '2', label: 'Investment' },
    { id: '3', label: 'Others' },
];

const NewPayeeForm = () => {
    const [name, setName] = useState('John Doe');
    const [accountNumber, setAccountNumber] = useState('');
    const [secondAccountNumber, setSecondAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [bankName, setBankName] = useState('');
    const [amount, setAmount] = useState(0.0);
    const navigation = useNavigation();
    const [selectedChip, setSelectedChip] = useState(null);

    const handleChipPress = (id) => {
        setSelectedChip(id);
    };

    const handleSubmit = React.useCallback(() => {
        navigation.navigate('ConfirmPayment',
            {
                name,
                accountNumber,
                ifscCode,
                bankName,
                amount,
                selectedChip: chips[selectedChip]?.label,
            }
        );
    }, [name, accountNumber, ifscCode, bankName, amount, selectedChip]);

    const handleCancel = React.useCallback(() => {
        navigation.goBack();
    }, []);

    return (
        <>
            <ScrollView style={styles.container}>
                <Card mode=''>
                    <TextInput
                        mode='flat'
                        value={amount}
                        onChangeText={setAmount}
                        style={styles.input}
                        inputMode='numeric'
                    />
                    <Card.Content>
                        <TextInput
                            mode='outlined'
                            label='Payee Name'
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            mode='outlined'
                            label='Account Number'
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            keyboardType='numeric'
                            style={styles.input}
                        />
                        <TextInput
                            mode='outlined'
                            label='Reenter Account Number'
                            value={secondAccountNumber}
                            onChangeText={setSecondAccountNumber}
                            keyboardType='numeric'
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            mode='outlined'
                            label='IFSC Code'
                            value={ifscCode.toUpperCase()}
                            onChangeText={setIfscCode}
                            style={styles.input}
                        />
                        <TextInput
                            mode='outlined'
                            label='Bank Name'
                            value={bankName}
                            onChangeText={setBankName}
                            style={styles.input}
                        />
                        <Text variant='headlineSmall'>Remarks:</Text>
                        <View style={styles.chipsContainer}>
                            {chips.map((chip) => (
                                <Chip
                                    mode='outlined'
                                    key={chip.id}
                                    style={styles.chip}
                                    selected={selectedChip === chip.id}
                                    onPress={() => handleChipPress(chip.id)}
                                >
                                    {chip.label}
                                </Chip>
                            ))}
                        </View>
                        <Text variant='titleSmall' style={{ marginTop: 8 }}>
                            PAY FROM
                        </Text>
                        <View style={styles.payFrom}>
                            <MaterialCommunityIcons
                                name={'bank'}
                                size={24}
                                color={'#006a4d'}
                            />
                            <View style={styles.pay}>
                                <Text variant='labelSmall'>XXXX4545</Text>
                                <Text variant='labelSmall'>
                                    SA | Account Balance: &#x00A3;4545.54
                                </Text>
                            </View>
                        </View>
                    </Card.Content>
                    <Card.Actions style={styles.actions}>
                        <Button mode='outlined' onPress={handleCancel}>
                            Cancel
                        </Button>
                        <Button mode='contained' onPress={handleSubmit}>
                            Add Payee
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },

    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        marginRight: 24,
    },
    chip: {
        marginHorizontal: 8,
    },
    payFrom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    pay: {
        flex: 1,
        marginLeft: 8,
    },
    actions: {
        marginVertical: 16,
    },
});

export default NewPayeeForm;
