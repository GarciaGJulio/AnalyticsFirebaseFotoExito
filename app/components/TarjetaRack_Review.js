import { StyleSheet, Text, View, } from "react-native";
import { FlashList } from "@shopify/flash-list";
import theme from "../theme/theme";
import { useFonts } from "expo-font";
import { Rack_View } from "./Rack_View";

export const TarjetaRack_Review = ({data}) => {

    /*const dataRack = [
        {
            name: "Pan",
            rackPrimary: "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531",
            prod: [{
                img0: "https://media.gettyimages.com/id/1146333350/es/foto/food-on-shelves-of-grocery-store.jpg?s=2048x2048&w=gi&k=20&c=ifOzWbplve6OkYZUQqRa14qwGkE_ELCoc6PDLg3tqAM=",
            }],
        },
        {
            name: "Harina",
            rackPrimary: "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531",
            prod: [{
                img0: 'https://media.istockphoto.com/id/861019856/es/foto/harina-de-grano-entero-en-una-madera-o%C3%ADdos-bagwith-de-taz%C3%B3n-de-fuente-y-cilicio.jpg?s=612x612&w=is&k=20&c=dp3XuGZqt_KA_wZMt-VlnFl8-bD5WH-NLLuaXTvjSL0=',
                img1: "https://media.gettyimages.com/id/1146333347/es/foto/food-on-shelves-of-grocery-store.jpg?s=2048x2048&w=gi&k=20&c=g53D4-XpXPd1Doke0aE1YIgFHQvZTcxOPM1GwsS2-80=",
                img2: 'https://media.istockphoto.com/id/1393397328/es/foto/primer-plano-de-harina-integral-huevos-y-pan-redondo-reci%C3%A9n-horneado-pan-casero-con-una-ramita.jpg?s=612x612&w=is&k=20&c=S1GN72PpY5I6qqMU0QWBKiZHCLrGrnHspCso_4aqJxw=',
            }],

        },
        {
            name: "Avena",
            rackPrimary: "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531",
            prod: [{
                img0: 'https://media.istockphoto.com/id/1354434633/es/foto/taz%C3%B3n-con-una-cucharada-de-harina-de-lentejas-negras-y-frijoles-sobre-una-mesa-de-madera.jpg?s=612x612&w=is&k=20&c=1ZlBa943VDC3fG0mw5eCZh-T8QZozIlE5FdmUwlIxwI=',
                img1: 'https://media.istockphoto.com/id/1220332324/es/foto/vista-de-primer-plano-de-la-harina-de-espelta-entera-org%C3%A1nica-en-una-taza-de-madera.jpg?s=612x612&w=is&k=20&c=scJuGZpnPxkkmlIc3MB4_KC1TAZTNHSgaEvvhAoLoQQ=',
            }],

        },
        {
            name: "Arroz",
            rackPrimary: "https://perchasecuador.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/banner-gondolas-1.jpeg?bwg=1538514531",
            prod: [{
                img0: 'https://media.istockphoto.com/id/684817242/es/foto/harina-en-un-taz%C3%B3n-de-fuente-de-madera-bolsa-de-papel-y-una-cuchara-vista-superior.jpg?s=612x612&w=is&k=20&c=t09aNoDADGrjYa_Btx2oFZvBMEXg5qb2jRrEGKk-4uY=',
            }],
        },
    ];*/

    const [fontLoaded] = useFonts({
        Metropolis: require("../../assets/font/Metropolis-Regular.otf"),
        // Agrega aquí las otras variantes de la fuente si las tienes (p. ej., Bold, Italic, etc.)
      });

    if (!fontLoaded) return null;

    return (
        <View View style={styles.container} >
            <Text style={{ fontWeight: theme.fontWeight.softbold, fontSize: theme.fontSize.subtitle,fontFamily:'Metropolis' }}>PERCHAS</Text>
            <View style={{ flex: 1, width: '100%', marginVertical: 5 }}>
                <FlashList
                    data={data}
                    renderItem={({ item }) => <Rack_View rack={item} />}
                    estimatedItemSize={10}
                    showsVerticalScrollIndicator={false} />
            </View>
        </View >
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        marginVertical: 10,
        alignItems: 'center',
        //paddingHorizontal:100,
        //backgroundColor:'red',
        //marginHorizontal:10,

    },
});

