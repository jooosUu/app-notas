import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ToastAndroid,
    Alert,
} from 'react-native';
import { router } from 'expo-router';

const VALID_PASSWORD = 'fallout76';

export default function LoginScreen(): React.JSX.Element {
    const [password, setPassword] = useState<string>('');

    const handleLogin = (): void => {
        if (password === VALID_PASSWORD) {
            router.push('/grades');
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Contraseña incorrecta', ToastAndroid.SHORT);
            } else {
                Alert.alert('Error', 'Contraseña incorrecta');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F3F4F6', // Light gray background
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827', // Dark gray text
        marginBottom: 40,
        letterSpacing: 1,
    },
    input: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12, // Rounded corners
        padding: 16,
        marginBottom: 24,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2, // Shadow for Android
    },
    button: {
        backgroundColor: '#3B82F6', // Blue primary button
        width: '85%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
