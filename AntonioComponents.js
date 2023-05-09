import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TarjPercha from './app/components/TarjetaPercha';
import { useState } from 'react';
import TarjPromo from './app/components/TarjetaPromo';

export default function App() {
  const [valueGeneral, setValueGeneral] = useState();
  const [valueModerna, setValueModerna] = useState();
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>

      <TarjPromo exhibidorNombre={"Exhibidor 1"} onChangeStatus={setChecked} />

      <TarjPercha categoriaNombre={"PAN"} oncha onChangeTextModerna={setValueModerna} onChangeTextGeneral={setValueGeneral} />
      <Text>General:{valueGeneral}</Text>
      <Text>Moderna:{valueModerna}</Text>
      <Text>Status:{checked ? "si" : "no"}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
