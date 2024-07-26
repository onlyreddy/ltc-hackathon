import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { BarChart } from 'react-native-gifted-charts';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import YourOffers from './YourOffers';

// Sample data
const pieData = [
    {
        value: 700,
        color: '#007BFF',
        text: 'House Expenses',
        message:
            'Take advantage of our exclusive house loan offer and make your dream a reality! Competitive interest rates starting at 5.5% p.a.Pre - approval in just 24 hours!',
        icon: 'home',
        detailedData: [
            { date: '1', amount: 150, color: '#007BFF' },
            { date: '10', amount: 200, color: '#007BFF' },
            { date: '20', amount: 350, color: '#007BFF' },
        ],
    },
    {
        value: 340,
        color: '#9C27B0',
        text: 'Fuel',
        icon: 'fuel',
        message:
            'Your fuel expenses have reached £340 this month. Did you know you could save more on fuel? Consider availing a Fuel Card today for exclusive discounts and benefits on your fuel purchases.',
        detailedData: [
            { date: '04', amount: 100, color: '#9C27B0' },
            { date: '10', amount: 120, color: '#9C27B0' },
            { date: '20', amount: 120, color: '#9C27B0' },
        ],
    },
    {
        value: 156,
        color: '#5b4b4b',
        text: 'Food',
        icon: 'food',
        message:
            'Did you know you could save on your food expenses? Avail our exclusive Food Card today and enjoy discounts on your meals! Start saving now!',
        detailedData: [
            { date: '15', amount: 50, color: '#5b4b4b' },
            { date: '25', amount: 60, color: '#5b4b4b' },
            { date: '30', amount: 46, color: '#5b4b4b' },
        ],
    },
    {
        value: 354,
        color: '#FFA5BA',
        text: 'Others',
        icon: 'more',

        message:
            "Unlock more benefits with our card! Use it for other expenses and enjoy exclusive rewards, cashback, and special offers. Don't miss out – apply now and make the most of your spending!",
        detailedData: [
            { date: '20', amount: 100, color: '#FFA5BA' },
            { date: '12', amount: 120, color: '#FFA5BA' },
            { date: '10', amount: 134, color: '#FFA5BA' },
        ],
    },
    {
        value: 200,
        color: '#77d78c',
        text: 'Entrainment',
        icon: 'movie-filter',

        message:
            '🎉 Special Offer on Entertainment Expenses! 🎉Upgrade your entertainment experience with our exclusive card! Avail exciting benefits and discounts on your favorite movies, concerts, and more.',
        detailedData: [
            { date: '07', amount: 100, color: '#77d78c' },
            { date: '21', amount: 75, color: '#77d78c' },
            { date: '29', amount: 25, color: '#77d78c' },
        ],
    },
];

const { width } = Dimensions.get('window');
const radius = width / 2 - 75;
const arc = d3Arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);
const pie = d3Pie()
    .value((d) => d.value)
    .sort(null);

const ExpensesTracker = () => {
    const [selectedExpense, setSelectedExpense] = useState(pieData[0]);
    const [visible, setVisible] = useState(false);
    const [showOffers, setShowOffers] = React.useState(false)

    const showSnackbar = () => setVisible(true);
    const hideSnackbar = () => setVisible(false);

    const handlePressSlice = (index) => {
        setSelectedExpense(pieData[index]);
    };

    const renderBarChart = () => {
        if (!selectedExpense) return null;

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginLeft: 16,
                    }}
                >
                    <MaterialCommunityIcons
                        name={selectedExpense.icon}
                        size={24}
                        color={selectedExpense.color}
                        style={{ marginRight: 12, marginLeft: -16 }}
                    />
                    <Text style={styles.barChartTitle} variant='titleLarge'>
                        Details for {selectedExpense.text}
                    </Text>
                </View>
                <BarChart
                    data={selectedExpense.detailedData.map((item) => ({
                        value: item.amount,
                        label: item.date,
                        frontColor: item.color,
                    }))}
                    height={200}
                    width={300}
                    barWidth={50}
                    showGrid={false}
                />
            </View>
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text variant='headlineMedium' style={{ marginBottom: -16 }}>
                            Expenses - July
                        </Text>
                        <Button mode='contained' onPress={() => setShowOffers(true)}>Your Offers</Button>
                    </View>
                    <Svg width={width - 50} height={width - 50}>
                        <G x={width / 2} y={width / 2}>
                            {pie(pieData).map((slice, index) => (
                                <G key={index}>
                                    <Path
                                        d={arc(slice)}
                                        fill={pieData[index].color}
                                        onPress={() => handlePressSlice(index)}
                                    />
                                </G>
                            ))}
                            <Circle r={radius / 2} fill='#232B5D' />
                            {selectedExpense && (
                                <SvgText
                                    x={0}
                                    y={0}
                                    textAnchor='middle'
                                    fill='white'
                                    fontSize='22'
                                    fontWeight='bold'
                                >
                                    {selectedExpense.value}
                                </SvgText>
                            )}
                            {selectedExpense && (
                                <SvgText
                                    x={0}
                                    y={30}
                                    textAnchor='middle'
                                    fill='white'
                                    fontSize='14'
                                >
                                    {selectedExpense.text}
                                </SvgText>
                            )}
                        </G>
                    </Svg>
                </View>
                {renderBarChart()}
            </View>

            <YourOffers isOpen={showOffers} onClose={() => setShowOffers(false)} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    barChartTitle: {
        marginVertical: 16,
    },

});

export default ExpensesTracker;
