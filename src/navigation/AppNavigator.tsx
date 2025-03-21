import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationForm from '../screens/ApplicationFormScreen';
import JobFinder from '../screens/JobFinderScreen';
import SavedJobs from '../screens/SavedJobsScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Application Form" component={ApplicationForm} />
                <Stack.Screen name="Job Finder" component={JobFinder} />
                <Stack.Screen name="Saved Jobs" component={SavedJobs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;