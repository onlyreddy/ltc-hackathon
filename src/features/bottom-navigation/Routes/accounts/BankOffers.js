import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const BankOffers = () => {
    return (
        <View style={styles.container}>
            <Text variant='labelMedium'>JUST FOR YOU</Text>
            <Swiper
                style={styles.wrapper}
                paginationStyle={styles.pagination}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                autoplay
            >
                <Card style={styles.slide}>
                    <>
                        <Text>
                            Get instant loan on your LLOYDS Bank credit card with zero
                            documentation.
                        </Text>
                        <Button mode='contained' style={{ marginRight: 'auto', marginVertical: 8 }}>Get Now</Button>
                    </>
                    <Image source={require('../../../../assets/credit-card.png')} width={30} height={30} style={{ position: 'absolute', bottom: 8, right: 8, top: 24 }} />
                </Card>
                <Card style={styles.slide}>
                    <>
                        <Text>
                            Don't miss the 24*7 support for the Car Loan offer upto € 30000.
                        </Text>
                        <Button mode='contained' style={{ marginRight: 'auto', marginVertical: 8 }}>Get Now</Button>
                    </>
                    <Image source={require('../../../../assets/support.png')} width={40} height={40} style={{ position: 'absolute', bottom: 8, right: 16, top: 24 }} />
                </Card>
                <Card style={styles.slide}>
                    <>
                        <Text>
                            Your opinion matters! Rate your experience and help us to improve.
                        </Text>
                        <Button mode='contained' style={{ marginRight: 'auto', marginVertical: 8 }}>Rate Us</Button>
                    </>
                    <Image source={require('../../../../assets/feedback.jpg')} width={30} height={30} style={{ position: 'absolute', bottom: 8, right: 16, top: 24 }} />
                </Card>
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        flex: 1,
    },
    wrapper: {
        marginTop: 16,
    },
    slide: {
        padding: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pagination: {
        bottom: -10,
    },
    dot: {
        backgroundColor: '#ccdcd8',
    },
    activeDot: {
        backgroundColor: '#006a4d',
    },
    action: {
        width: 125,
        marginTop: -32,
        marginBottom: 16,
    }
});

export default BankOffers;
