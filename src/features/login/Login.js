import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { TextInput, Button, Appbar, useTheme } from "react-native-paper";
import BiometricAuth from "../bio-metric/BiometricAuth";
import { useNavigation } from "@react-navigation/native";
import AudioRecorder from './Audio';

const Login = () => {
    const [username, setUsername] = React.useState("johndoe");
    const [password, setPassword] = React.useState("");
    const [isLoginDisabled, setIsLoginDisabled] = React.useState(false);
    const { colors } = useTheme();
    const navigation = useNavigation();

    React.useEffect(
        () => setIsLoginDisabled(username === "" || password === ""),
        [useTheme, password]
    );

    const handleLogin = React.useCallback(() => {
        navigation.navigate("BottomTabs");
    }, []);


    return (
        <ScrollView>
            <Appbar.Header
                style={{ backgroundColor: colors.primary }}
                mode="small"
            >
                <View style={[styles.flexContainer, { flex: 1 }]}>
                    <Text style={styles.title}>My App</Text>
                </View>
                <Appbar.Action icon="phone" onPress={() => { }} color="#fff" />
            </Appbar.Header>
            <View style={styles.logonContainer}>
                <Text style={styles.loginText}>
                    Please enter logon details.
                </Text>
                <TextInput
                    placeholder="Username"
                    mode="outlined"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    mode="outlined"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.password}
                />
                <Button
                    mode="contained"
                    style={styles.continue}
                    disabled={isLoginDisabled}
                    onPress={handleLogin}
                >
                    Continue
                </Button>
                <BiometricAuth />
                <View style={styles.flexContainer}>
                    <Text style={styles.forgotText}>
                        I've forgotten my logon details.
                    </Text>
                    <AudioRecorder />
                    <Text style={styles.forgotText}>
                        Hint: Tap on the Mic to say 'Logon'
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.new}>
                        Not used Internet Banking with us before?
                    </Text>
                    <Text>
                        If you can bank with us, you can manage your accounts
                        online. First, you will need to create your logon
                        details.
                    </Text>
                    <Button mode="contained" style={styles.newLogon}>
                        Create logon details
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    flexContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    logonContainer: {
        padding: 16,
    },
    loginText: {
        color: "#006a4d",
        paddingVertical: 16,
    },
    continue: {
        marginTop: 16,
        marginBottom: 16,
    },
    forgotText: {
        color: "#006a4d",
        fontWeight: "600",
        paddingVertical: 12,
    },
    new: {
        fontSize: 20,
        paddingBottom: 8,
        alignSelf: "flex-start",
    },
    newLogon: {
        width: "100%",
        marginVertical: 16,
    },
    footer: {
        alignItems: "center",
    },
    password: {
        marginVertical: 24,
    },
});
