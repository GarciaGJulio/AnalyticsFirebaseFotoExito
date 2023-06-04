import AsyncStorage from "@react-native-async-storage/async-storage"
import { realizarConsulta } from "../common/sqlite_config"
import { PERSISTENCIA } from "../common/table_columns"
import { db_deleteGlobalLocalDataBase, db_insertGlobalLocalDataBase } from "../services/SqliteService"
export const getCurrentScreenInformation = async (navigation) => {
    try {
        let userFound = await getCurrentScreenUser()
        if (userFound && userFound.length > 0) {
            const infoScreen = await realizarConsulta(`select * from ${userFound[0].nombre_tabla} where ${userFound[0].campo_id}='${userFound[0].id_registro}'`)
            if (infoScreen && infoScreen.length > 0) {
                //onGetInfo(infoScreen[0])
                global.userInfoScreen = {
                    infoScreen: infoScreen[0],
                    userInfo: userFound[0]
                }
            } else {
                global.userInfoScreen = {
                    infoScreen: null,
                    userInfo: userFound[0]
                }

                //onGetInfo(null)
            }

            navigation.navigate(userFound[0].nombre_pantalla)



        } else {
            global.userInfoScreen = null
        }
    } catch (error) {
        console.log(error)
    }

}
export const getCurrentScreenUser = async () => {
    const userId = await getCurrentUserId()
    return await realizarConsulta(`select * from ${PERSISTENCIA.NAME} where ${PERSISTENCIA.KEY_1}='${userId}'`)
}
export const cleanCurrentScreenUser = async () => {
    try{
        const userId = await getCurrentUserId()
        global.userInfoScreen = null
        db_deleteGlobalLocalDataBase({
            tableName: PERSISTENCIA.NAME,
            dataInsertType: getTableKeys(PERSISTENCIA),
            dataInsert: [
                `'${userId}'`
    
            ]
    
        })
    }catch(error){
        console.log("errrr al borrar la fata-----------------*-----------",error)
    }
   
}

export const saveCurrentScreenUser = async (objInfo, extraObj) => {
    try {
        const userId = await getCurrentUserId();
        db_insertGlobalLocalDataBase({
            tableName: PERSISTENCIA.NAME,
            dataInsertType: getTableKeys(PERSISTENCIA),
            dataInsert: [
                `'${userId}'`,
                `'${objInfo.screenName}'`,
                `'${objInfo.tableName}'`,
                `'${objInfo.itemId}'`,
                `'${objInfo.columnId}'`,
                `${extraObj ? `'${JSON.stringify(extraObj)}'` : `'null'`}`
            ]
        })
    } catch (error) {
        console.log(error)

    }

    // return await realizarConsulta(`select * from ${PERSISTENCIA.NAME} where ${PERSISTENCIA.KEY_1}='${userId}'`)
}

const getTableKeys = (tableInfo) => {
    try {
        let tempKeys = Object.keys(tableInfo);
        tempKeys = tempKeys.map((key) => {
            if (key != "NAME") {
                return tableInfo[key];
            }

        })
        return tempKeys.filter((item) => item != undefined)
    } catch (error) {
        return []
    }
}

export const generateSenteceSql = (tableInfo, type) => {
    try {
        if (type == "UPDATE") {
            let sentenceSqlSet = ""
            for (let i = 1; i < tableInfo.dataInsertType.length; i++) {
                sentenceSqlSet += `${tableInfo.dataInsertType[i]}=${tableInfo.dataInsert[i]},`
                // counter += 1;
            }
            return ` UPDATE ${tableInfo.tableName} SET ${sentenceSqlSet.slice(0, -1)} where ${tableInfo.dataInsertType[0]}=${tableInfo.dataInsert[0]}`
        }
        if (type == "DELETE") {

            return ` DELEte FROM ${tableInfo.tableName} where ${tableInfo.dataInsertType[0]}=${tableInfo.dataInsert[0]}`
        }
    } catch (error) {
        return "error"
    }
}

export const getCurrentUserId = async () => {
    return await AsyncStorage.getItem("userId");
}







[
    {
        "id": "100520",
        "id_portafolio": "b6bf4908-2435-411b-a8b3-9c3c8d18eebc",
        "images": {
            "image1": null,
            "image2": null,
            "image3": null,
        },
        "name": "HARINA TREBOL ROJO 50 KG PRUEBAS",
        "price": null,
        "state": false,
        "tipo_portafolio": "C",
        "url": "https://storage.googleapis.com/apk_pedidos_tat/100520.png",
    },
    {
        "id": "100446",
        "id_portafolio": "b6bf4908-2435-411b-a8b3-9c3c8d18eebc",
        "images": {
            "image1": null,
            "image2": null,
            "image3": null,
        },
        "name": "HARINA ESTRELLA DE OCTUBRE 50 KG",
        "price": null,
        "state": false,
        "tipo_portafolio": "C",
        "url": "https://storage.googleapis.com/apk_pedidos_tat/100446.png",
    }

]