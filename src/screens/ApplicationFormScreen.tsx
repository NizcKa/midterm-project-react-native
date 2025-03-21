import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';

// Define TypeScript interface for API response
interface JobPost {
  id: string;
  jobTitle: string;
  companyName: string;
  salary: number;
  description: string;
}

const API_URL = 'https://empllo.com/api/v1';

const ApplicationForm: React.FC = () => {
  const [data, setData] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);

      console.log("API Response:", response.data); 

      const filteredData = response.data.map((job: any) => ({
        id: uuid.v4(), 
        title: job.title, 
        companyName: job.companyName, 
        salary: job.minSalary,
        description: job.description
      }));

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.jobTitle}</Text>
            <Text>{item.companyName}</Text>
            <Text>{item.salary}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  title: { fontSize: 16, fontWeight: 'bold' },
});

export default ApplicationForm;