import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { router } from 'expo-router';

interface Grade {
    id: string;
    label: string;
    value: number;
}

export default function GradesScreen(): React.JSX.Element {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [currentInput, setCurrentInput] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleAdd = (): void => {
        const parsed = parseFloat(currentInput);

        if (isNaN(parsed) || parsed < 0 || parsed > 5) {
            setErrorMsg('No valido');
            return;
        }

        setErrorMsg(null);

        const newGrade: Grade = {
            id: Date.now().toString(),
            label: `nota ${grades.length + 1}`,
            value: parsed,
        };

        setGrades((prev: Grade[]) => [...prev, newGrade]);
        setCurrentInput('');
    };

    const calculateAverage = (): string => {
        if (grades.length === 0) {
            return '0.00';
        }
        const sum = grades.reduce((acc: number, g: Grade) => acc + g.value, 0);
        return (sum / grades.length).toFixed(2);
    };

    const handleClear = (): void => {
        setGrades([]);
        setCurrentInput('');
        setErrorMsg(null);
    };

    const handleExit = (): void => {
        router.replace('/');
    };

    const renderGradeItem = ({ item }: { item: Grade }): React.JSX.Element => (
        <View style={styles.gradeItem}>
            <Text style={styles.gradeText}>
                {item.label}: {item.value.toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Error message */}
            {errorMsg !== null && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            )}

            {/* Input row */}
            <View style={styles.inputRow}>
                <Text style={styles.label}>Nota:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={currentInput}
                    onChangeText={setCurrentInput}
                    placeholder="0 - 5"
                />
            </View>

            {/* Add button */}
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>

            {/* Average */}
            <View style={styles.averageRow}>
                <Text style={styles.averageText}>Promedio: {calculateAverage()}</Text>
            </View>

            {/* History */}
            <View style={styles.historyContainer}>
                <FlatList
                    data={grades}
                    keyExtractor={(item: Grade) => item.id}
                    renderItem={renderGradeItem}
                />
            </View>

            {/* Bottom buttons */}
            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.bottomButton} onPress={handleClear}>
                    <Text style={styles.buttonText}>Borrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomButton} onPress={handleExit}>
                    <Text style={styles.buttonText}>Salir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
        backgroundColor: '#F3F4F6', // Light gray background
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        borderWidth: 1,
        borderColor: '#EF4444',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    errorText: {
        color: '#B91C1C',
        fontSize: 15,
        fontWeight: '700',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginRight: 12,
        fontWeight: '600',
        color: '#374151',
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: '#111827',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        backgroundColor: '#10B981', // Green add button
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    averageRow: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    averageText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
    },
    historyContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    gradeItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gradeText: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: '500',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomButton: {
        backgroundColor: '#6B7280', // Gray buttons
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 14,
        width: '48%',
        alignItems: 'center',
        shadowColor: '#6B7280',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    bottomButtonExit: {
        backgroundColor: '#EF4444', // Red exit button
    },
});
