import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Avatar, Text } from 'react-native-paper';

const quickLinks = [
    { id: '1', icon: 'bank-transfer', label: 'Send Money' },
    { id: '2', icon: 'credit-card', label: 'Cards' },
    { id: '3', icon: 'file-document-outline', label: 'Payments' },
    { id: '4', icon: 'transit-transfer', label: 'Transfers' },
    { id: '5', icon: 'receipt', label: 'Statements' },
    { id: '6', icon: 'support-agent', label: 'Support' },
];

const QuickLinks = () => {
    return (
        <View style={styles.container}>
            <Text variant='labelMedium'>QUICK LINKS</Text>
            <Card style={styles.card} mode='outlined'>
                <Card.Content>
                    <FlatList
                        data={quickLinks}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Avatar.Icon size={64} icon={item.icon} style={styles.avatar} />
                                <Text style={styles.label}>{item.label}</Text>
                            </View>
                        )}
                    />
                </Card.Content>
            </Card>
        </View>
    );
};

export default QuickLinks;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 0
    },
    card: {
        marginTop: 16,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    avatar: {
        marginBottom: 5,
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
    },
});
