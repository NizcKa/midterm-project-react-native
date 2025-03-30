import React, { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, RefreshControl, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { jobScreenStyles } from "../styles/jobScreenStyles"; 

const SavedJobsScreen = () => {
  const { jobs, loading, fetchJobs, savedJobs, toggleSaveJob, theme, isDarkMode, toggleDarkMode }  = useGlobalContext();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  if (loading && jobs.length === 0) {
    return (
      <View style={[jobScreenStyles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" />
        <Text style={[jobScreenStyles.loadingText, { color: theme.text }]}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={[jobScreenStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[jobScreenStyles.pageTitle, { color: theme.text }]}>Saved Jobs</Text>
      <Text style={[jobScreenStyles.pageSubText, { color: theme.text }]}>Your Saved Jobs</Text>
      <FlatList
        data={savedJobs}
        keyExtractor={(jobId) => jobId}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobs} />}
        renderItem={({ item: jobId }) => {
          const job = jobs.find((j) => String(j.id) === String(jobId));
          return (
            <View style={[jobScreenStyles.jobContainer, { backgroundColor: theme.cardBackground }]}>
              <Pressable onPress={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)} style={jobScreenStyles.card}>
                <Text style={[jobScreenStyles.jobTitle, { color: theme.text }]}>{job.title}</Text>
                <Text style={[jobScreenStyles.jobCompany, { color: theme.text }]}>{job.companyName}</Text>
                <Text style={[jobScreenStyles.jobSalary, { color: theme.text }]}>
                  Salary: {job.minSalary === 0 && job.maxSalary === 0
                    ? "N/A"
                    : `Php ${job.minSalary} - Php ${job.maxSalary}`}
                </Text>
                {expandedJobId !== job.id && (
                  <Text style={[jobScreenStyles.tapHint, { color: theme.text }]}>Tap for more details</Text>
                )}

              </Pressable>
              {expandedJobId === job.id && (
                <Pressable onPress={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}>
                  <View style={[jobScreenStyles.expandedDetails, { backgroundColor: theme.cardBackground }]}>                  
                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Category:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.mainCategory}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Job Type:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.jobType}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Work Model:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.workModel}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Seniority:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.seniorityLevel}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Salary:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>
                      {job.minSalary === 0 && job.maxSalary === 0
                        ? "N/A"
                        : `Php ${job.minSalary} - Php ${job.maxSalary}`}
                    </Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Application Link:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.applicationLink}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Locations:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.locations.join(', ')}</Text>

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Description:</Text>
                    <RenderHtml 
                      contentWidth={width} 
                      source={{ html: job.description }} 
                      defaultTextProps={{ style: { color: theme.text } }} 
                    />

                    <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Tags:</Text>
                    <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{job.tags.join(', ')}</Text>
                  </View>
                </Pressable>
              )}
              <TouchableOpacity style={[jobScreenStyles.saveButton, savedJobs.includes(job.id) ? jobScreenStyles.removeButton : jobScreenStyles.addButton]} onPress={() => toggleSaveJob(job.id)}>
                <Text style={jobScreenStyles.buttonText}>{savedJobs.includes(job.id) ? "Remove Job" : "Save Job"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={jobScreenStyles.applyButton} onPress={() => navigation.navigate("Application Form", { savedJob: job })}>
                <Text style={jobScreenStyles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{ color: theme.text }}>No jobs available.</Text>}
        contentContainerStyle={jobScreenStyles.listContent}
      />
        <View style={jobScreenStyles.buttonContainer}>

          <TouchableOpacity style={jobScreenStyles.botButtons} onPress={() => navigation.navigate("Job Finder")}>
            <Text style={jobScreenStyles.buttonText}>Job Finder</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[jobScreenStyles.botButtons, { backgroundColor: theme.toggleBackground }]} onPress={toggleDarkMode}>
            <Text style={[jobScreenStyles.buttonText, { color: theme.text }]}>{isDarkMode ? "☾" : "✹"}</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default SavedJobsScreen;