import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const avatars = [
  {
    id: '1',
    uri: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
  },
  {
    id: '2',
    uri: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Jane Smith',
  },
  {
    id: '3',
    uri: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Mike Johnson',
  },
  {
    id: '4',
    uri: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Emily Davis',
  },
];


const SendMoney = () => {
  const navigation = useNavigation();
  const handlePress = React.useCallback(() => {
    navigation.navigate('NewPayeeForm');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewAll}>
        <Text variant='labelMedium'>SEND MONEY</Text>
        <Button>VIEW ALL</Button>
      </View>
      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={handlePress}>
                <Avatar.Icon
                  size={64}
                  icon='plus'
                  color='#006a4d'
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <Text style={styles.avatarText}>Add New</Text>
            </View>
            <FlatList
              data={avatars}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.avatarItem}>
                  <Avatar.Image size={64} source={{ uri: item.uri }} />
                  <View style={styles.nameContainer}>
                    <Text>{item.name}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: 'transparent',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatarItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  nameContainer: {
    marginTop: 5,
  },
  viewAll: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarWrapper: {
    marginTop: -16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#006a4d',
    borderStyle: 'dashed',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  avatarText: {
    position: 'absolute',
    bottom: -24,
    fontSize: 14,
  },
});
