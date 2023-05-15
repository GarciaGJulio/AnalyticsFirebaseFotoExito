import { openDatabase } from "expo-sqlite";
import { Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { requestMultiple } from "react-native-permissions";
// import DeviceInfo from "react-native-device-info";
// kimport { insertNewStartDayInit } from "../services/StartDayService";
import {
    PERCHA_TABLE,
} from "./table_columns";
import { PermissionsAndroid } from "react-native";
const DATABASE_NAME = "MODERNAAPPMOBILEDB";

export const PERCHA_TABLE_NAME = "cliente";


const instantiate_local_database = () => {
    if (global.dbModerna == null) {
        global.dbModerna = openDatabase(DATABASE_NAME);
    }
};

const createPerchaTable = () => {
    const sentence = `create table if not exists ${PERCHA_TABLE_NAME} (${PERCHA_TABLE.KEY_1} text primary key not null, ${PERCHA_TABLE.ESTADO_PERCHA} boolean not null)`;
    // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
    createTable(sentence, PERCHA_TABLE_NAME);
};
const createTable = async (sentence, table_name, createIndex) => {
    console.log(sentence);
    global.dbModerna.transaction((tx) => {
        tx.executeSql(
            sentence,
            [],
            () => {
                if (createIndex) {
                    createIndex()
                }

                console.log("Se ejecuta sentencia create table " + table_name + " OK");
            },
            (e) => {
                console.log("error al crear tabla: " + table_name);
            }
        );
    });
    return;
};


export const load_db_config = async () => {
    // requestPermissions();
    instantiate_local_database();
    createPerchaTable();
};

