import React, { useState } from 'react';
import { View, FlatList, Text, Pressable, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { jobScreenStyles } from '../styles/jobScreenStyles'; 

const JobFinderScreen = () => {
  const { jobs, loading, fetchJobs, savedJobs, toggleSaveJob, theme, isDarkMode, toggleDarkMode } = useGlobalContext();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(lowerCaseSearch) ||  //search by job name
      job.companyName.toLowerCase().includes(lowerCaseSearch) || //search by company name
      job.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch)) //search by job tags
    );
  });

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
      <Text style={[jobScreenStyles.pageTitle, { color: theme.text }]}>Home Page</Text>
      <Text style={[jobScreenStyles.pageSubText, { color: theme.text }]}>Available Jobs</Text>

      <TextInput
        style={[jobScreenStyles.searchInput, { backgroundColor: theme.cardBackground, color: theme.text }]}
        placeholder="Search by job title, company name, or tags"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobs} />}
        renderItem={({ item }) => (
          <View style={[jobScreenStyles.jobContainer, { backgroundColor: theme.cardBackground }]}>
            <Pressable onPress={() => setExpandedJobId(expandedJobId === item.id ? null : item.id)} style={jobScreenStyles.card}>
              <Text style={[jobScreenStyles.jobTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[jobScreenStyles.jobCompany, { color: theme.text }]}>{item.companyName}</Text>
              <Text style={[jobScreenStyles.jobSalary, { color: theme.text }]}>
                Salary: {item.minSalary === 0 && item.maxSalary === 0 
                  ? "N/A" 
                  : `Php ${item.minSalary} - Php ${item.maxSalary}`}
              </Text>
              {expandedJobId !== item.id && (
                <Text style={[jobScreenStyles.tapHint, { color: theme.text }]}>Tap for more details</Text>
              )}
              
            </Pressable>
            <Pressable onPress={() => setExpandedJobId(expandedJobId === item.id ? null : item.id)}>
              {expandedJobId === item.id && (
                <View style={[jobScreenStyles.expandedDetails, { backgroundColor: theme.cardBackground }]}>
                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Category:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.mainCategory}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Job Type:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.jobType}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Work Model:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.workModel}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Seniority:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.seniorityLevel}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Salary:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>
                    {item.minSalary === 0 && item.maxSalary === 0 
                      ? "N/A" 
                      : `Php ${item.minSalary} - Php ${item.maxSalary}`}
                  </Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Application Link:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.applicationLink}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Locations:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.locations.join(", ")}</Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Description:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>
                    <RenderHtml 
                      contentWidth={width} 
                      source={{ html: item.description }} 
                      defaultTextProps={{ style: { color: theme.text } }} 
                    />
                  </Text>

                  <Text style={[jobScreenStyles.descHeaderText, { color: theme.text }]}>Tags:</Text>
                  <Text style={[jobScreenStyles.descText, { color: theme.text }]}>{item.tags.join(", ")}</Text>
                </View>
              )}
            </Pressable>

            <TouchableOpacity
              style={[jobScreenStyles.saveButton, 
                savedJobs.includes(item.id) ? jobScreenStyles.savedButton : jobScreenStyles.addButton,
                savedJobs.includes(item.id) && { opacity: 0.6 } 
              ]}
              onPress={() => toggleSaveJob(item.id)}
              disabled={savedJobs.includes(item.id)}
            >
              <Text style={jobScreenStyles.buttonText}>{savedJobs.includes(item.id) ? "Saved" : "Save Job"}</Text>
            </TouchableOpacity>

            {savedJobs.includes(item.id) && (
              <TouchableOpacity
                style={jobScreenStyles.applyButton}
                onPress={() => navigation.navigate("Application Form", { savedJob: item })}
              >
                <Text style={jobScreenStyles.buttonText}>Apply</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: theme.text }}>No jobs available.</Text>}
        contentContainerStyle={jobScreenStyles.listContent}
      />

      <View style={jobScreenStyles.buttonContainer}>
        <TouchableOpacity style={jobScreenStyles.botButtons} onPress={() => navigation.navigate("Saved Jobs")}> 
          <Text style={jobScreenStyles.buttonText}>Saved Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[jobScreenStyles.botButtons, { backgroundColor: theme.toggleBackground }]} onPress={toggleDarkMode}>
          <Text style={[jobScreenStyles.buttonText, { color: theme.text }]}>{isDarkMode ? "☾" : "✹"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobFinderScreen;