import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CameraScreen from '../camera/Camera';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [voiceCommand, setVoiceCommand] = React.useState(false);
  const [trustedPerson, setTrustedPerson] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false)
  const navigation = useNavigation()

  const handleSave = React.useCallback(() => {
    setNotificationsEnabled(false);
    setDarkModeEnabled(false);
    setVoiceCommand(false);
    setTrustedPerson(false);

    navigation.goBack();
  }, []);

  const handleCancel = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const handleTrustedUser = React.useCallback(() => {
    setTrustedPerson((value) => !value)
    setOpenCamera(true)
    console.log('inside');
  }, [])

  console.log('inside', openCamera);
  return (
    <View style={styles.container}>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Voice commands</Text>
        <Switch
          value={voiceCommand}
          onValueChange={setVoiceCommand}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Add a trusted person</Text>
        <Switch
          value={trustedPerson}
          onValueChange={handleTrustedUser}
        />
      </View>
      {openCamera &&
        <CameraScreen />
      }
      <View style={styles.actions}>
        <Button
          mode='outlined'
          onPress={handleCancel}
          style={{ marginRight: 16 }}
        >CANCEL</Button>
        <Button
          mode='contained'
          onPress={handleSave}
        >RESET SETTINGS</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginVertical: 16
  }
});

export default SettingsScreen;
