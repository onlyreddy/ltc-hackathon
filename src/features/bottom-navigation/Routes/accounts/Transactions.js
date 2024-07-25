import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Text, SegmentedButtons, Card, Divider, Button } from 'react-native-paper'

const sampleData = {
    accounts: [
        { id: '1', title: 'Account A', amount: '€1200', date: '2024-07-01' },
        { id: '2', title: 'Account B', amount: '€3200', date: '2024-07-05' },
    ],
    creditCards: [
        { id: '3', title: 'Credit Card X', amount: '€150', date: '2024-07-10' },
        { id: '4', title: 'Credit Card Y', amount: '€250', date: '2024-07-15' },
    ],
    upcoming: [
        { id: '5', title: 'Upcoming Payment A', amount: '€100', date: '2024-07-20' },
        { id: '6', title: 'Upcoming Payment B', amount: '€200', date: '2024-07-25' },
    ],
};


const Transactions = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('accounts');
    const [filter, setFilter] = React.useState('');

    const filteredData = sampleData[selectedCategory].filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
    );

    const onValueChange = React.useCallback((value) => {
        setSelectedCategory(value)
    }, [])

    return (

        <ScrollView style={styles.container}>
            <View style={styles.filters}>
                <Text variant='labelMedium' style={styles.header}>TRANSACTIONS</Text>
                <Card style={styles.transactions} mode='outlined'>
                    <SegmentedButtons
                        value={selectedCategory}
                        onValueChange={onValueChange}
                        style={styles.buttons}
                        buttons={[
                            {
                                value: 'accounts',
                                label: 'Accounts',
                                checkedColor: '#fff',
                            },
                            {
                                value: 'creditCards',
                                label: 'Credit Card',
                                checkedColor: '#fff',
                            },
                            {
                                value: 'upcoming', label: 'Upcoming',
                                checkedColor: '#fff',
                            },
                        ]}
                        checkedColor='#006a4d'
                        uncheckedColor="red"
                        density='regular'
                        theme={{
                            colors: {
                                secondaryContainer: '#006a4d',
                                // onSurface: '#42d34e'
                            }
                        }}
                    />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Card.Title title={item.title} subtitle={item.amount} />
                                <Card.Content>
                                    <Text style={styles.date}>{item.date}</Text>
                                </Card.Content>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                    <Card.Actions>
                        <Button mode='text'>View All</Button>
                    </Card.Actions>
                </Card>
            </View>
        </ScrollView>
    )
}

export default Transactions

const styles = StyleSheet.create({
    header: {
        paddingBottom: 16
    },
    buttons: {
        padding: 16,
        paddingHorizontal: 8
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    card: {
        marginBottom: 10,
    },
    date: {
        color: 'gray',
        fontSize: 12,
    },
})