import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Job Finder" component={JobFinderScreen} />
                <Stack.Screen name="Saved Jobs" component={SavedJobsScreen} />
                <Stack.Screen name="Application Form" component={ApplicationFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;