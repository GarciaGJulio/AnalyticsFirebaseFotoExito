import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme/theme';
import Logotipo from '../../../assets/moderna/Logotipo-espiga-amarilla-letras-blancas.png';
import * as Animatable from 'react-native-animatable';
import ItemBranch_Review from '../../components/ItemBranch_Review';
import { realizarConsulta } from '../../common/sqlite_config';

const ListBranch = () => {

    const [audit,setAudit] = useState([]);
    let sucursal = [
        { id: 1, client: "Cliente1", name: "Sucursal1", state: true },
        { id: 2, client: "Cliente2", name: "Sucursal2", state: false },
        { id: 3, client: "Cliente3", name: "Sucursal3", state: true },
    ]


    const consultarYCopiarContenido = async () => {
        try {
          // Realiza la consulta a la base de datos
          const resultadoConsulta = await realizarConsulta("SELECT * FROM auditoria");
      
          // Copia el contenido después de la consulta
          //await copiarContenido(resultadoConsulta);
          setAudit(resultadoConsulta)
          console.log('Copia de contenido completada con éxito: ',resultadoConsulta);
        } catch (error) {
          console.error('Error al consultar o copiar el contenido:', error);
        }
      };

    useEffect(() => {
        consultarYCopiarContenido()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={Logotipo} style={styles.image} />
            </View>
            <Animatable.View animation={"fadeInUp"} style={styles.contentContainer}>
                <Text style={styles.title}>Puedes revisar las visitas ya realizadas presionando en una sucursal de interés.</Text>
                <View style={styles.contentContainerBranch}>
                    <FlatList showsVerticalScrollIndicator={false}
                        data={sucursal}
                        renderItem={({ item }) => <ItemBranch_Review branch={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </Animatable.View>
        </View>
    );
}

export default ListBranch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.modernaRed,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 313,
        height: 112,
        resizeMode: 'cover'
    },
    imageContainer: {
        bottom: '35%'
    },
    contentContainer: {
        width: theme.dimensions.maxWidth,
        height: 536,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentContainerBranch: {
        margin: 1,
        width: 320,
        height: '80%'
    },
    title: {
        marginTop: 10,
        padding: 13,
        fontSize: theme.fontSize.subtitle,
        marginBottom: 25,
    },
});