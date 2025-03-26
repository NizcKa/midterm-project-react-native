import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, Pressable, ScrollView, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';

const JobFinderScreen = () => {
  const { jobs, loading, fetchJobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(lowerCaseSearch) ||  // Search via title
      job.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))  // Search via tags
    );
  });

  if (loading && jobs.length === 0) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large"/>
        <Text style={[styles.loadingText]}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>

      <Text style={[styles.pageTitle]}>Home Page</Text>
      <Text style={[styles.pageSubText]}>
        Available Jobs
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Job"
        value={searchTerm}
        onChangeText={setSearchTerm} 
      />
      
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchJobs}
          />
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.jobContainer}>

              <Pressable
                onPress={() => openModal(item)}
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    opacity: pressed ? 0.9 : 1,
                  },
                  styles.card
                ]}
              >
                <Text style={[styles.jobTitle]}>{item.title}</Text>
                <Text style={[styles.jobCompany]}>{item.companyName}</Text>
                <Text style={[styles.jobSalary]}>
                  Salary: {item.minSalary} - {item.maxSalary}
                </Text>
              </Pressable>

              <TouchableOpacity
                style={[styles.saveButton, savedJobs.includes(item.id) ? styles.removeButton : styles.addButton]}
                onPress={() => toggleSaveJob(item.id)}
              >
                <Text style={styles.buttonText}>
                  {savedJobs.includes(item.id) ? "Remove Job" : "Save Job"}
                </Text>
              </TouchableOpacity>

              {savedJobs.includes(item.id) && (
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => navigation.navigate("ApplicationForm", { savedJob: item })}
                >
                  <Text style={styles.buttonText}>Apply</Text>
                </TouchableOpacity>
              )}

            </View>
          );
        }}
        ListEmptyComponent={
          <Text>No jobs available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {selectedJob && (
                <>
                  <Text style={[styles.modalTitle]}>
                    {selectedJob.title}
                  </Text>
                  <Text style={[styles.modalText]}>
                    {selectedJob.description}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Category: {selectedJob.mainCategory}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Job Type: {selectedJob.jobType}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Work Model: {selectedJob.workModel}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Seniority: {selectedJob.seniorityLevel}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Salary: {selectedJob.minSalary} - {selectedJob.maxSalary}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Published: {selectedJob.pubDate}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Expires: {selectedJob.expiryDate}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Application Link: {selectedJob.applicationLink}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Locations: {selectedJob.locations.join(', ')}
                  </Text>
                  <Text style={[styles.modalText]}>
                    Tags: {selectedJob.tags.join(', ')}
                  </Text>
                </>
              )}
            </ScrollView>
            <Pressable
              onPress={closeModal}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
                styles.closeButton,
              ]}
            >
              <Text style={[styles.closeButtonText]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style = { styles.buttonContainer }>
        <TouchableOpacity
          style = { styles.savedJobsButton }
          onPress = { () => navigation.navigate("SavedJobs") }
        >
          <Text style = { styles.buttonText }>Saved Jobs</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobContainer: {
    marginBottom: 12, // Space between job items
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Shadow for Android
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  pageSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 100, 
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  savedJobsButton: {
    backgroundColor: "#007BFF", // Bright blue color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
  },
  buttonContainer: {
    position: 'absolute', 
    bottom: 20, 
    left: 16, 
    right: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 10, 
    borderRadius: 10,
  },
  jobCompany: {
    fontSize: 16,
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  savedJobsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  saveButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007bff', // Blue when saving
  },
  removeButton: {
    backgroundColor: '#dc3545', // Red when removing
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});

export default JobFinderScreen;