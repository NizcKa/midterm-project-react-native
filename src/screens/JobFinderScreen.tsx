import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, Pressable, ScrollView, ActivityIndicator, RefreshControl, useWindowDimensions } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';

const JobFinderScreen = () => {
  const { jobs, loading, fetchJobs } = useGlobalContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

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
        Here, you may find your desired jobs.
      </Text>
      
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchJobs}
          />
        }
        renderItem={({ item }) => (
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
        )}
        ListEmptyComponent={
          <Text>No jobs available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
      

      {/* Sticky Button to Navigate to SavedJobsScreen */}
      <Pressable
        onPress={() => navigation.navigate('SavedJobs')}
        style={({ pressed }) => [
          styles.savedJobsButton,
          { 
            transform: [{ scale: pressed ? 0.97 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={[styles.savedJobsButtonText]}>
          View Saved Jobs
        </Text>
      </Pressable>

      {/* Modal for Job Details */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 100, // Ensure enough space so list items aren't hidden behind the button
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
  savedJobsButton: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 1,
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
});

export default JobFinderScreen;