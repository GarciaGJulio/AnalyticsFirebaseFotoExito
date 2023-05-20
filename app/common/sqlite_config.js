import { openDatabase } from "expo-sqlite";
import { Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { requestMultiple } from "react-native-permissions";
// import DeviceInfo from "react-native-device-info";
// kimport { insertNewStartDayInit } from "../services/StartDayService";
import {
  PERCHA_TABLE,
  CLIENT_TABLE,
  BRANCH_TABLE,
  TYPE_CLIENT_TABLE,
  GROUP_CLIENT_TABLE,
} from "./table_columns";
import { PermissionsAndroid } from "react-native";
import { useEffect } from "react";
import { dataParameters, dataPrueba } from "./tableParameters";
import axios from "axios";
import { db_insertGlobal } from "../services/SqliteService";
const DATABASE_NAME = "MODERNAAPPMOBILEDB";
const results = [];
export const PERCHA_TABLE_NAME = "percha";

const instantiate_local_database = () => {
  if (global.dbModerna == null) {
    global.dbModerna = openDatabase(DATABASE_NAME);
  }
};

const createPerchaTable = () => {
  const sentence = `create table if not exists ${PERCHA_TABLE_NAME} (${PERCHA_TABLE.KEY_1} text primary key not null, ${PERCHA_TABLE.ESTADO_PERCHA} boolean not null, ${PERCHA_TABLE.CATEGORIA_GENERAL} int NOT NULL,${PERCHA_TABLE.CATEGORIA_MODERNA} int NOT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PERCHA_TABLE_NAME);
};

const createSucursalTable = () => {
  const sentence = `create table if not exists ${BRANCH_TABLE.NAME} (${BRANCH_TABLE.KEY_1} text primary key not null, ${BRANCH_TABLE.NOMBRE_SUCURSAL} VARCHAR(43) NOT NULL,${BRANCH_TABLE.LATITUD} FLOAT(10) NOT NULL,${BRANCH_TABLE.LONGITUD} FLOAT(10) NOT NULL,${BRANCH_TABLE.USUARIO_CREACION} TEXT NULL,${BRANCH_TABLE.FECHA_CREACION} TEXT NULL,${BRANCH_TABLE.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, BRANCH_TABLE.NAME);
};

const createClientTable = () => {
  const sentence = `create table if not exists ${CLIENT_TABLE.NAME} (${CLIENT_TABLE.KEY_1} text primary key not null, ${CLIENT_TABLE.FOREIGH_KEY_1} text , ${CLIENT_TABLE.NOMBRE_CLIENTE} text ,${CLIENT_TABLE.USUARIO_CREACION} TEXT,${CLIENT_TABLE.FECHA_CREACION} TEXT ,${CLIENT_TABLE.FECHA_MODIFICACION} TEXT ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, CLIENT_TABLE.NAME);
};

const createTypeClientTable = () => {
  const sentence = `create table if not exists ${TYPE_CLIENT_TABLE.NAME} (${TYPE_CLIENT_TABLE.KEY_1} text primary key not null, ${TYPE_CLIENT_TABLE.FOREIGH_KEY_1} text not null, ${TYPE_CLIENT_TABLE.NOMBRE_TIPO_CLIENTE} VARCHAR(43) NULL, ${TYPE_CLIENT_TABLE.NOMBRE_GRUPO_CLIENTE} VARCHAR(43) NULL,${TYPE_CLIENT_TABLE.USUARIO_CREACION} TEXT NULL,${TYPE_CLIENT_TABLE.FECHA_CREACION} TEXT NULL,${TYPE_CLIENT_TABLE.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, TYPE_CLIENT_TABLE.NAME);
};

const createGroupClientTable = () => {
  const sentence = `create table if not exists ${GROUP_CLIENT_TABLE.NAME} (${GROUP_CLIENT_TABLE.KEY_1} text primary key not null, ${GROUP_CLIENT_TABLE.NOMBRE_GRUPO_CLIENTE} VARCHAR(43) NULL,${GROUP_CLIENT_TABLE.USUARIO_CREACION} TEXT NULL,${GROUP_CLIENT_TABLE.FECHA_CREACION} TEXT NULL,${GROUP_CLIENT_TABLE.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, GROUP_CLIENT_TABLE.NAME);
};

const createTable = async (sentence, table_name, createIndex) => {
  console.log(sentence);
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      sentence,
      [],
      () => {
        if (createIndex) {
          createIndex();
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

/*
export const selectData = (sentence) => {
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      sentence,
      [],
      (_, { rows }) => {
        // rows es un objeto que contiene los resultados de la consulta
        // Puedes acceder a los datos utilizando rows._array
        results = rows._array;
        // Hacer algo con los resultados
      },
      (error) => {
        // Manejar el error si ocurre
        console.error(error);
      }
    );
  });
  console.log(results);
};*/

export const selectData = (sentence) => {
  global.dbModerna.transaction((tx) => {
    tx.executeSql(sentence, [], (_, { rows }) => {
      const result = rows.item(0); // Obtiene el primer resultado de la consulta
      const nombre = result.nombre; // Accede al valor de la columna "nombre"
      console.log(nombre);
    });
  });
};

export const dataAxiosQuery = async () => {
  try {
    console.log("Realizando peticion de datos a la base");
    const response = await axios.post(
      "https://fotoexito1.azurewebsites.net/api/downloadAllDatafromCloudMobile?code=E6AKyZb3LyT2lNVo6IA-vHNNDXjn8gpnTrKNXPKNl2lQAzFurr0_lA==",
      { data: dataParameters.data },
      { headers: { accept: "application/json" } }
    );
    //console.log("DATOS EXTRAIDOS");
    //setClient(response.data)
    //console.log(response.data.data);
    const resp = response.data.data;
    for (const res of resp) {
      //console.log("DATO DEL FOR EACH", res);
      for (const objetoSentencia of res.data) {
        //console.log("DATO DEL 2 FOR EACH", objetoSentencia);
        db_insertGlobal({
          tableName: res.tableName,
          sentence: objetoSentencia,
        });
      }
    }
  } catch (e) {
    console.log(e.response);
    //Alert.alert("Error de inicio de sesion", e.response.data.message);
  }
};

export const load_db_config = async () => {
  // requestPermissions();
  instantiate_local_database();
  createPerchaTable();
  createSucursalTable();
  createClientTable();
  createGroupClientTable();
  createTypeClientTable();
};
