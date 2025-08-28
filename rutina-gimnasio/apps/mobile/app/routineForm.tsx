import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface RoutineFormProps {
    initialData?: { id?: number; title: string; description: string; level: string } | null;
    onSubmit: (data: { title: string; description: string; level: string }) => void;
}

export default function RoutineForm({ initialData, onSubmit }: RoutineFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("BEGINNER");


    //* Validate whether data exists or not
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setLevel(initialData.level);
        } else {
            setTitle("");
            setDescription("");
            setLevel("BEGINNER");
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            alert("Title and Description are required");
            return;
        }
        onSubmit({ title, description, level });
    };

    return (
        <View style={style.container}>
            <Text style={style.label}>Title</Text>
            <TextInput
                style={style.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Routine title"
            />

            <Text style={style.label}>Description</Text>
            <TextInput
                style={[style.input, { height: 200 }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Routine description"
                multiline
            />

            <Text style={style.label}>Level</Text>
            <Picker
                style={style.picker}
                selectedValue={level}
                onValueChange={(itemValue) => setLevel(itemValue)}
            >
                <Picker.Item label="Beginner" value="BEGINNER" />
                <Picker.Item label="Intermediate" value="INTERMEDIATE" />
                <Picker.Item label="Advanced" value="ADVANCED" />
            </Picker>

            <Button title={initialData ? "Update Routine" : "Add Routine"} onPress={handleSubmit} />
        </View>
    );

}

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white"
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: "#333"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    picker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5
    }
});