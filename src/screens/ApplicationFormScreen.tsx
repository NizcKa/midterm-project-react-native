import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ApplicationFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const savedJob = route.params?.savedJob; // Get passed job data

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !contactNumber || !reason) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    Alert.alert(
      "Application Submitted",
      `Your application for ${savedJob?.title} at ${savedJob?.companyName} has been submitted!`,
      [
        {
          text: "Okay",
          onPress: () => navigation.goBack(), // Return to Job Finder Screen
        },
      ]
    );

    // Clear form fields
    setName("");
    setEmail("");
    setContactNumber("");
    setReason("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for {savedJob?.title}</Text>
      <Text style={styles.subtitle}>Company: {savedJob?.companyName}</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.textArea}
        placeholder="Why should we hire you?"
        value={reason}
        onChangeText={setReason}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, color: "gray" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  textArea: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, height: 100, marginBottom: 10 },
  submitButton: { backgroundColor: "blue", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ApplicationFormScreen;
