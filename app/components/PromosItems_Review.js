import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { PromosItemsDetails_Review } from './PromosItemsDetails_Review';

export const PromosItems_Review = ({ data }) => {
    const DATA = [
        {
            name: "Exhibidor Tipo 1",
            prod: [{
                img0: 'https://media.istockphoto.com/id/484679158/es/foto/harina-en-una-bolsa-en-la-mesa-y-spikelets.jpg?s=612x612&w=is&k=20&c=UtdmDnMAKjpEyLnaRuLYZsiqFMpBFDXRbL4qOxNODSA=',
            }],
        },
        {
            name: "Exhibidor Tipo 2",
            prod: [{
                img0: 'https://media.istockphoto.com/id/861019856/es/foto/harina-de-grano-entero-en-una-madera-o%C3%ADdos-bagwith-de-taz%C3%B3n-de-fuente-y-cilicio.jpg?s=612x612&w=is&k=20&c=dp3XuGZqt_KA_wZMt-VlnFl8-bD5WH-NLLuaXTvjSL0=',
                img1: 'https://media.istockphoto.com/id/484679158/es/foto/harina-en-una-bolsa-en-la-mesa-y-spikelets.jpg?s=612x612&w=is&k=20&c=UtdmDnMAKjpEyLnaRuLYZsiqFMpBFDXRbL4qOxNODSA=',
                img2: 'https://media.istockphoto.com/id/1393397328/es/foto/primer-plano-de-harina-integral-huevos-y-pan-redondo-reci%C3%A9n-horneado-pan-casero-con-una-ramita.jpg?s=612x612&w=is&k=20&c=S1GN72PpY5I6qqMU0QWBKiZHCLrGrnHspCso_4aqJxw=',
            }],

        },
        {
            name: "Exhibidor Tipo 3",
            prod: [{
                img0: 'https://media.istockphoto.com/id/1354434633/es/foto/taz%C3%B3n-con-una-cucharada-de-harina-de-lentejas-negras-y-frijoles-sobre-una-mesa-de-madera.jpg?s=612x612&w=is&k=20&c=1ZlBa943VDC3fG0mw5eCZh-T8QZozIlE5FdmUwlIxwI=',
                img1: 'https://media.istockphoto.com/id/1220332324/es/foto/vista-de-primer-plano-de-la-harina-de-espelta-entera-org%C3%A1nica-en-una-taza-de-madera.jpg?s=612x612&w=is&k=20&c=scJuGZpnPxkkmlIc3MB4_KC1TAZTNHSgaEvvhAoLoQQ=',
            }],

        },
        {
            name: "Exhibidor Tipo 4",
            prod: [{
                img0: 'https://media.istockphoto.com/id/684817242/es/foto/harina-en-un-taz%C3%B3n-de-fuente-de-madera-bolsa-de-papel-y-una-cuchara-vista-superior.jpg?s=612x612&w=is&k=20&c=t09aNoDADGrjYa_Btx2oFZvBMEXg5qb2jRrEGKk-4uY=',
            }],

        },
    ];

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                renderItem={({ item }) => <PromosItemsDetails_Review exhibitor={item} />}
                estimatedItemSize={4}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginBottom: 10
    },
})