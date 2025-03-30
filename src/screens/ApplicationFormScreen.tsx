import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useGlobalContext } from '../context/globalContext';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

const ApplicationFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const savedJob = route.params?.savedJob;
  const { theme, isDarkMode, toggleDarkMode }  = useGlobalContext();


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    contactNumber: Yup.string().matches(/^\d{11}$/, "Must be a valid 11-digit number").required("Contact number is required"),
    reason: Yup.string().required("Reason is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", contactNumber: "", reason: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        Alert.alert("Application Submitted", `Your application for ${savedJob?.title} at ${savedJob?.companyName} has been submitted!`, [
          { text: "Okay", onPress: () => navigation.navigate("Job Finder") },
        ]);
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Text style={[styles.title, { color: theme.text }]}>Apply for {savedJob?.title}</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>Company: {savedJob?.companyName}</Text>

          {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput 
            style={[styles.input, { color: theme.text }]} 
            placeholder="Your Name" 
            placeholderTextColor={ theme.text } 
            value={values.name} 
            onChangeText={handleChange("name")} 
            onBlur={handleBlur("name")} 
          />

          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput 
            style={[styles.input, { color: theme.text }]} 
            placeholder="Your Email" 
            placeholderTextColor={ theme.text } 
            value={values.email} 
            onChangeText={handleChange("email")} 
            onBlur={handleBlur("email")} 
            keyboardType="email-address" 
          />

          {touched.contactNumber && errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
          <TextInput 
            style={[styles.input, { color: theme.text }]} 
            placeholder="Contact Number" 
            placeholderTextColor={ theme.text } 
            value={values.contactNumber} 
            onChangeText={handleChange("contactNumber")} 
            onBlur={handleBlur("contactNumber")} 
            keyboardType="phone-pad" 
          />

          {touched.reason && errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
          <TextInput 
            style={[styles.textArea, { color: theme.text }]} 
            placeholder="Why should we hire you?" 
            placeholderTextColor={ theme.text } 
            value={values.reason} 
            onChangeText={handleChange("reason")} 
            onBlur={handleBlur("reason")} 
            multiline 
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
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
  errorText: { color: "red", fontSize: 14, marginBottom: 5, paddingTop: 3 },
});

export default ApplicationFormScreen;
