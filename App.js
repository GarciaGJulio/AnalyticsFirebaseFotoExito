import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';
import ModernaProvider from './app/context/ModernaProvider';

export default function App() {
  return (
    <ModernaProvider>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </ModernaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
