import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ModernaHeader from '../../components/ModernaHeader';
import StyledButton from '../../components/StyledButton';
import theme from '../../theme/theme';

export default function ComponentsTest() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModernaHeader />
      <View style={styles.container}>
        <Text>MODO DE prueba</Text>
        <StyledButton
          title={'Guardar'}
          buttonColor={theme.colors.modernaRed}
          iconName={"content-save-all-outline"}
          iconType={"material-community"}
          size={theme.buttonSize.df}
        />
        <StyledButton
          title={'Cancelar'}
          buttonColor={theme.colors.modernaYellow}
          iconName={"cancel"}
          iconType={"material-icon"}
          size={theme.buttonSize.df}
        />
        <StyledButton
          title={'Siguiente'}
          buttonColor={theme.colors.modernaRed}
          iconName={"arrow-right-circle"}
          iconType={"feather"}
          size={theme.buttonSize.df}
        />
        <View style={{ flexDirection: 'row', width: theme.dimensions.maxWidth, justifyContent: 'space-evenly' }}>
          <StyledButton
            title={'Cancelar'}
            buttonColor={theme.colors.modernaYellow}
            iconName={"cancel"}
            iconType={"material-icon"}
            size={theme.buttonSize.df}
          />
          <StyledButton
            title={'Siguiente'}
            buttonColor={theme.colors.modernaRed}
            iconName={"arrow-right-circle"}
            iconType={"feather"}
            size={theme.buttonSize.df}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
