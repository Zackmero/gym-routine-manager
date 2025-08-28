import { createRoutine, deleteRoutine, getRoutines, updateRoutine } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoutineForm from "./routineForm";


export default function DashboardScreen() {
    const [routines, setRoutines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);

    //* If edit routine is selected
    const [selectRoutine, setSelectRoutine] = useState<any | null>(null);

    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    router.replace("/");
                    return;
                }

                const data = await getRoutines();
                setRoutines(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);




    const handleSaveRoutine = async (FormData: any) => {
        try {
            if (selectRoutine) {
                const updated = await updateRoutine(selectRoutine.id, FormData);
                setRoutines((prev) =>
                    prev.map((r) => (r.id === updated.routine.id ? updated.routine : r))
                );
            } else {
                const created = await createRoutine(FormData);
                setRoutines((prev) => [...prev, created.routine]);
            }

            setShowForm(false);
            setSelectRoutine(null);
        } catch (err) {
            console.error(err);
        }
    }





    //* Delete Routine
    const handleDeleteRoutine = async (id: number) => {
        Alert.alert(
            "Confirm delete",
            "Are you sure  you want to delete this routine?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteRoutine(id);
                            setRoutines((prev) => prev.filter((r) => r.id !== id));
                            Alert.alert("Deleted routine successfully");
                        } catch (err) {
                            console.error(err);
                            Alert.alert("Error", "Could not delete routine");
                        }
                    }
                }

            ]
        )
    };

    //* Logout Method
    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        router.replace("/");
    };


    if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;


    return (
        <View style={styles.container}>
            {/* Header */}

            <View style={styles.header}>
                <Text style={styles.title}>My Routine</Text>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.addBtn} onPress={() => setShowForm(true)} >
                <Text style={styles.addBtnText}>Add Routine</Text>
            </TouchableOpacity>

            {/* List */}
            <FlatList
                data={routines}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                        <Text style={styles.cardLevel}>Level: {item.level}</Text>
                        <Text style={styles.cardDate}>
                            Added: {new Date(item.createdAt).toLocaleDateString()}
                        </Text>

                        <View style={styles.action}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: "#007AFF" }]}
                                onPress={() => {
                                    setSelectRoutine(item);
                                    setShowForm(true);
                                }}
                            >
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: "#FF3B30" }]}
                                onPress={() => handleDeleteRoutine(item.id)}
                            >
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

    

            <Modal visible={showForm} animationType="slide">
                <RoutineForm
                    initialData={selectRoutine}
                    onSubmit={handleSaveRoutine}
                />
                <Button title="Cancel" onPress={() => setShowForm(false)} />
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F7FA"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    logoutBtn: {
        padding: 10,
        backgroundColor: "#FF3B30",
        borderRadius: 8
    },
    logoutText: {
        color: "white",
        fontWeight: "bold"
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center"
    },
    addBtn: {
        backgroundColor: "#34C759",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15
    },
    addBtnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    card: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 2
    },
    btn: {
        margin: 5
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
    },
    cardDescription: {
        fontSize: 14,
        marginVertical: 5,
        color: "#555"
    },
    cardLevel: {
        fontSize: 14,
        fontWeight: 600,
        color: "#007AFF"
    },
    cardDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 5
    },
    action: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 10
    },
    actionText: {
        color: "white",
        fontWeight: "600"
    },
})