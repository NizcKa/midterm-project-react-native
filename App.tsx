import { Text, View, Image, ScrollView, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './src/styles/globalStyles';
import { GlobalProvider } from './src/context/globalContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <GlobalProvider>
        <AppNavigator />
      </GlobalProvider>
    </SafeAreaView>
  )
}