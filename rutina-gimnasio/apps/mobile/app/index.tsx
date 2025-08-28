import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "../services/api";



export default function LoginScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleAuth = async () => {
        try {

            const data = await login(isLogin, name, email, password);


            if (isLogin) {
                await AsyncStorage.setItem("token", data.token);
                console.log("Login success: ", data);
                Alert.alert("Login successful", "Welcome back " );
                router.replace("/dashboard");
            } else {
                console.log("User registered success: ", data);
                Alert.alert("Registration successful", "You can now log in.");
                setIsLogin(true);
            }

        } catch (err: any) {
            console.log(err);
            setError(err.message || "Invalid Credentials");
            Alert.alert("Error ", err.message)
        }
    };



    const translateX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: -50,  // Move 100px to left
                    duration: 5000, // 5 seconds
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }}>
                <ImageBackground
                    source={require("../assets/images/bg_gym.jpg")}
                    style={styles.bg}
                    resizeMode="repeat"
                />
            </Animated.View>
            <Text style={styles.title}>{isLogin ? "Login" : "Sing Up"}</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email.toLowerCase().trim()}
                keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    value={password}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    style={styles.iconContainer}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#555"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={handleAuth}>
                <Text style={styles.btnText}>{isLogin ? "Enter" : "Sing up"}</Text>
            </TouchableOpacity>



            <Text style={styles.switchText}>
                {isLogin ? "Don't have an account?  " : "I have an account "}
                <Text onPress={() => setIsLogin(!isLogin)} style={styles.switchLink}>
                    {isLogin ? " Sing up" : " Login"}
                </Text>
            </Text>
        </View>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    bg: {
        width: width + 150,
        height: height,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center"
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "white"
    },
    iconContainer: {
        paddingHorizontal: 10
    },
    btn: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    switchText: {
        color: "#007AFF",
        fontWeight: "bold",
        marginTop: 20
    },
    switchLink: {
        color: "red",
        marginTop: 10,
        marginLeft: 5,
        textAlign: "center",
        fontStyle: "italic"
    }

});