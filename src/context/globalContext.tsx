import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import uuid from 'react-native-uuid';

interface Job {
    id: string;
    title: string;
    description?: string;
    mainCategory: string;
    applicationLink: string;
    pubDate: string;
    expiryDate: string;
    companyName: string;
    companyLogo: string;
    jobType: string;
    workModel: string;
    seniorityLevel: string;
    minSalary: number;
    maxSalary: number;
    locations: string[];
    tags: string[];
}

interface GlobalContextProps {
    jobs: Job[];
    fetchJobs: () => void;
    loading: boolean;
    savedJobs: string[]; 
    toggleSaveJob: (jobId: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]); 

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };
  
  const fetchJobs = async () => {
    try {
      const response = await fetch('https://empllo.com/api/v1');
      const data = await response.json();
      console.log("Fetched data:", data);

      const jobsArray = Array.isArray(data) ? data : data.jobs;
      if (!jobsArray) {
        throw new Error("No jobs array found in the response");
      }
      const jobsWithId = jobsArray.map((job: any) => ({
        id: job.id ? job.id.toString() : uuid.v4(),
        title: job.title || "",
        description: job.description || "",
        mainCategory: job.mainCategory || "",
        applicationLink: job.applicationLink || "",
        pubDate: job.pubDate || "",
        expiryDate: job.expiryDate || "",
        companyName: job.companyName || "",
        companyLogo: job.companyLogo || "",
        jobType: job.jobType || "",
        workModel: job.workModel || "",
        seniorityLevel: job.seniorityLevel || "",
        minSalary: Number(job.minSalary) || 0,
        maxSalary: Number(job.maxSalary) || 0,
        locations: Array.isArray(job.locations) ? job.locations : [],
        tags: Array.isArray(job.tags) ? job.tags : [],
      }));
      setJobs(jobsWithId);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <GlobalContext.Provider value={{ jobs, fetchJobs, loading, savedJobs, toggleSaveJob }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

