import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Modal, Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const data = [
    {
        id: '1',
        label: 'Take advantage of our exclusive house loan offer and make your dream a reality! Competitive interest rates starting at 5.5% p.a. Pre-approval in just 24 hours!',
        action: () => console.log('Pressed house loan offer'),
        icon: 'home',
    },
    {
        id: '2',
        label: 'Your fuel expenses have reached £340 this month. Did you know you could save more on fuel? Consider availing a Fuel Card today for exclusive discounts and benefits on your fuel purchases.',
        action: () => console.log('Pressed fuel offer'),
        icon: 'fuel',
    },
    {
        id: '3',
        label: 'Did you know you could save on your food expenses? Avail our exclusive Food Card today and enjoy discounts on your meals! Start saving now!',
        action: () => console.log('Pressed food offer'),
        icon: 'food',
    },
    {
        id: '4',
        label: 'Unlock more benefits with our card! Use it for other expenses and enjoy exclusive rewards, cashback, and special offers. Don\'t miss out – apply now and make the most of your spending!',
        action: () => console.log('Pressed other expenses offer'),
        icon: 'more',
    },
    {
        id: '5',
        label: '🎉 Special Offer on Entertainment Expenses! 🎉 Upgrade your entertainment experience with our exclusive card! Avail exciting benefits and discounts on your favorite movies, concerts, and more.',
        action: () => console.log('Pressed entertainment offer'),
        icon: 'movie-filter',
    },
];

export default function FloatingButtonWithFlatList({ isOpen, onClose }) {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={item.action}>
            <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color={'#006a4d'}
                style={{ marginRight: 16 }}
            />
            <Text style={styles.listText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <Modal visible={isOpen}
                contentContainerStyle={styles.modalContainer}
            >
                <Text variant='headlineMedium' style={{ marginVertical: -8 }}>Your Offers</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <Button mode='contained' onPress={onClose} style={{ marginLeft: 'auto', marginVertical: 16 }}>CLOSE</Button>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listText: {
        fontSize: 16,
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 16,
        width: "90%",
        margin: "auto",
        height: '90%',
    },
    listContainer: {
        height: '80%'
    }
});
