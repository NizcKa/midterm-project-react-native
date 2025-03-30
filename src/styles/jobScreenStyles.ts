import { StyleSheet } from 'react-native';

export const jobScreenStyles = StyleSheet.create({
    container: {
        flex: 1
      },

    jobContainer: {
        marginBottom: 12,
        padding: 12,
        borderRadius: 10
    },
    buttonContainer: {
        position: "absolute", 
        bottom: 20, 
        left: 16, 
        right: 16, 
        flexDirection: "row",  
        alignItems: "center",  
        justifyContent: "center", 
        gap: 10, 
        paddingVertical: 10, 
        borderRadius: 10 
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center'
    },
    pageSubText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
    listContent: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 100
    },
    card: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4
    },
    botButtons: {
        backgroundColor: "#17A2B8",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    jobCompany: {
        fontSize: 16,
        marginBottom: 4
    },
    jobSalary: {
        fontSize: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10
    },
    searchInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 12,
        fontSize: 16,
    },
    saveButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: '#007bff'
    },
    removeButton: {
        backgroundColor: '#dc3545'
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    applyButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center"
    },
    expandedDetails: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    descHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8
    },
    descText: {
        fontSize: 16,
        marginBottom: 4,
    },
    tapHint: {
        fontSize: 12,
        color: "gray",
        paddingTop: 10,
        marginBottom: 10,
    },
    savedButton: {
        backgroundColor: "#2ecc71"
    }
});