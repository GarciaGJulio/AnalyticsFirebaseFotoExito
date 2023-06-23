import { openDatabase } from "expo-sqlite";
import { Alert, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { requestMultiple } from "react-native-permissions";
// import DeviceInfo from "react-native-device-info";
// kimport { insertNewStartDayInit } from "../services/StartDayService";
import {
  CLIENT_TABLE,
  BRANCH_TABLE,
  TYPE_CLIENT_TABLE,
  GROUP_CLIENT_TABLE,
  PERCHA,
  CATEGORY,
  PRODUCT,
  AUDITORIA,
  EXHIBIDOR,
  PRECIADOR,
  COMPLEMENTARY_PORTFOLIO,
  IDEAL_PORFOLIO,
  PRECIADOR_PORTAFOLIO_IDEAL,
  PRECIADOR_PORTAFOLIO_COMPLEMENTARIO,
  PLANOGRAMA,
  //IMAGEN_PLANOGRAMA,
  TYPE_EXHIBIDOR,
  PROMOCION,
  PORTAFOLIO,
  PORTAFOLIO_AUDITORIA,
  PERSISTENCIA,
  VARIABLE,
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

/*
const createPerchaTable = () => {
  const sentence = `create table if not exists ${PERCHA_TABLE_NAME} (${PERCHA_TABLE.KEY_1} text primary key not null, ${PERCHA_TABLE.ESTADO_PERCHA} boolean not null, ${PERCHA_TABLE.CATEGORIA_GENERAL} int NOT NULL,${PERCHA_TABLE.CATEGORIA_MODERNA} int NOT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PERCHA_TABLE_NAME);
};*/

const createPersistencia = () => {
  const sentence = `create table if not exists ${PERSISTENCIA.NAME} (${PERSISTENCIA.KEY_1} text primary key not null , ${PERSISTENCIA.SCREEN_NAME} text not null, ${PERSISTENCIA.TABLE_NAME} text not null, ${PERSISTENCIA.ITEM_ID} text NOT NULL ,${PERSISTENCIA.COLUMN_ID} text NOT NULL,${PERSISTENCIA.EXTRA_INFO} text NULL)`;
  createTable(sentence, PERSISTENCIA.NAME);
};

const createPerchaTable = () => {
  const sentence = `create table if not exists ${PERCHA.NAME} (${PERCHA.KEY_1} text not null,${PERCHA.ID_CATEGORIA} text not null,${PERCHA.ESTADO_PERCHA} SMALLINT not null, ${PERCHA.CATEGORIA_GENERAL} int NOT NULL,${PERCHA.CATEGORIA_MODERNA} int NOT NULL,${PERCHA.URL_IMAGEN1} TEXT null,${PERCHA.URL_IMAGEN2} TEXT null,${PERCHA.URL_IMAGEN3} TEXT null,${PERCHA.USUARIO_CREACION} TEXT NULL,${PERCHA.FECHA_CREACION} TEXT NULL,${PERCHA.FECHA_MODIFICACION} TEXT NULL,PRIMARY KEY (${PERCHA.KEY_1}, ${PERCHA.ID_CATEGORIA}) ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PERCHA.NAME);
};

const createSucursalTable = () => {
  const sentence = `create table if not exists ${BRANCH_TABLE.NAME} (${BRANCH_TABLE.KEY_1} text primary key not null, ${BRANCH_TABLE.NOMBRE_SUCURSAL} VARCHAR(43) NULL,${BRANCH_TABLE.LATITUD} FLOAT(10) NULL,${BRANCH_TABLE.LONGITUD} FLOAT(10) NULL,${BRANCH_TABLE.USUARIO_CREACION} TEXT NULL,${BRANCH_TABLE.FECHA_CREACION} TEXT NULL,${BRANCH_TABLE.FECHA_MODIFICACION} TEXT NULL,${BRANCH_TABLE.ID_CLIENTE} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, BRANCH_TABLE.NAME);
};

const createClientTable = () => {
  const sentence = `create table if not exists ${CLIENT_TABLE.NAME} (${CLIENT_TABLE.KEY_1} text primary key not null, ${CLIENT_TABLE.FOREIGH_KEY_1} text , ${CLIENT_TABLE.NOMBRE_CLIENTE} text ,${CLIENT_TABLE.USUARIO_CREACION} TEXT,${CLIENT_TABLE.FECHA_CREACION} TEXT ,${CLIENT_TABLE.FECHA_MODIFICACION} TEXT, ${CLIENT_TABLE.ID_GRUPO_CLIENTE} TEXT NULL,${CLIENT_TABLE.NOMBRE_GRUPO_CLIENTE} VARCHAR(43) NULL,${CLIENT_TABLE.NOMBRE_TIPO_CLIENTE} VARCHAR(43) NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, CLIENT_TABLE.NAME);
};

const createTypeClientTable = () => {
  const sentence = `create table if not exists ${TYPE_CLIENT_TABLE.NAME} (${TYPE_CLIENT_TABLE.KEY_1} text primary key not null, ${TYPE_CLIENT_TABLE.FOREIGH_KEY_1} text not null, ${TYPE_CLIENT_TABLE.NOMBRE_TIPO_CLIENTE} VARCHAR(43) NULL,${TYPE_CLIENT_TABLE.USUARIO_CREACION} TEXT NULL,${TYPE_CLIENT_TABLE.FECHA_CREACION} TEXT NULL,${TYPE_CLIENT_TABLE.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, TYPE_CLIENT_TABLE.NAME);
};

const createGroupClientTable = () => {
  const sentence = `create table if not exists ${GROUP_CLIENT_TABLE.NAME} (${GROUP_CLIENT_TABLE.KEY_1} text primary key not null, ${GROUP_CLIENT_TABLE.NOMBRE_GRUPO_CLIENTE} VARCHAR(43) NULL,${GROUP_CLIENT_TABLE.USUARIO_CREACION} TEXT NULL,${GROUP_CLIENT_TABLE.FECHA_CREACION} TEXT NULL,${GROUP_CLIENT_TABLE.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, GROUP_CLIENT_TABLE.NAME);
};

const createCategoryTable = () => {
  const sentence = `create table if not exists ${CATEGORY.NAME} (${CATEGORY.KEY_1} text primary key not null, ${CATEGORY.NOMBRE_CATEGORIA} VARCHAR(43) NULL,${CATEGORY.USUARIO_CREACION} TEXT NULL,${CATEGORY.FECHA_CREACION} TEXT NULL,${CATEGORY.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, CATEGORY.NAME);
};

const createPortafolioTable = () => {
  const sentence = `create table if not exists ${PORTAFOLIO.NAME} (${PORTAFOLIO.KEY_1} text not null, ${PORTAFOLIO.ID_PRODUCTO} TEXT NULL,${PORTAFOLIO.ID_GRUPO_CLIENTE} TEXT NULL,${PORTAFOLIO.ESTADO} BOOLEAN ,${PORTAFOLIO.TIPO} TEXT NULL,PRIMARY KEY (${PORTAFOLIO.KEY_1},${PORTAFOLIO.ID_PRODUCTO})) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PORTAFOLIO.NAME);
};

const createPortafolioAuditoriaTable = () => {
  const sentence = `create table if not exists ${PORTAFOLIO_AUDITORIA.NAME} (${PORTAFOLIO_AUDITORIA.KEY_1} text not null, ${PORTAFOLIO_AUDITORIA.ID_PORTAFOLIO} TEXT NOT NULL,${PORTAFOLIO_AUDITORIA.ID_PRODUCTO} TEXT NOT NULL,PRIMARY KEY (${PORTAFOLIO_AUDITORIA.KEY_1},${PORTAFOLIO_AUDITORIA.ID_PORTAFOLIO},${PORTAFOLIO_AUDITORIA.ID_PRODUCTO})) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PORTAFOLIO_AUDITORIA.NAME);
};

const createProductTable = () => {
  const sentence = `create table if not exists ${PRODUCT.NAME} (${PRODUCT.KEY_1} text primary key not null,${PRODUCT.FOREIGH_KEY_1} text null,${PRODUCT.NOMBRE_PRODUCTO} VARCHAR(43) NULL,${PRODUCT.URL_IMAGEN_PRODUCTO} TEXT NULL,${PRODUCT.PRECIO} FLOAT(5) NULL,${PRODUCT.USUARIO_CREACION} TEXT NULL,${PRODUCT.FECHA_CREACION} TEXT NULL,${PRODUCT.FECHA_MODIFICACION} TEXT NULL ) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PRODUCT.NAME);
};

const createAuditTable = () => {
  const sentence = `create table if not exists ${AUDITORIA.NAME} (${AUDITORIA.KEY_1} text primary key not null,${AUDITORIA.ID_PRECIADOR} text null,${AUDITORIA.ID_PERCHA} text null,${AUDITORIA.ID_PROMOCION} text null,${AUDITORIA.ID_SUCURSAL} text null,${AUDITORIA.ID_CLIENTE} TEXT NULL,${AUDITORIA.ID_PORTAFOLIO_AUDITORIA} text NULL,${AUDITORIA.NOMBRE_CLIENTE} text NULL,${AUDITORIA.NOMBRE_SUCURSAL} text NULL,${AUDITORIA.USUARIO_CREACION} VARCHAR(43) NULL,${AUDITORIA.FECHA_CREACION} VARCHAR(43) NULL,${AUDITORIA.SINCRONIZADA} SMALLINT NULL,${AUDITORIA.ID_GRUPO_CLIENTE} TEXT NULL) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, AUDITORIA.NAME);
};

const createExhibidorTable = () => {
  const sentence = `create table if not exists ${EXHIBIDOR.NAME} (${EXHIBIDOR.KEY_1} text primary key not null,${EXHIBIDOR.ID_EXHIBIDOR_TIPO} text null,${EXHIBIDOR.ID_CLIENTE} text null,${EXHIBIDOR.SUCURSAL} VARCHAR(43) null,${EXHIBIDOR.AÑO_EXHIBIDOR} text null,${EXHIBIDOR.MES_EXHIBIDOR} text NULL,${EXHIBIDOR.USUARIO_CREACION} TEXT NULL,${EXHIBIDOR.FECHA_CREACION} TEXT NULL,${EXHIBIDOR.FECHA_MODIFICACION} TEXT NULL,${CLIENT_TABLE.NOMBRE_CLIENTE} TEXT NULL,${TYPE_EXHIBIDOR.NOMBRE_TIPO_EXHIBIDOR} TEXT NULL,${TYPE_EXHIBIDOR.URL_IMAGEN_EXHIBIDOR} TEXT NULL) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, EXHIBIDOR.NAME);
};

const createPromosTable = () => {
  const sentence = `create table if not exists ${PROMOCION.NAME} (${PROMOCION.KEY_1} text not null,${PROMOCION.ID_EXHIBIDOR} text null,${PROMOCION.ESTADO_PROMO} SMALLINT null,${PROMOCION.URL_IMAGEN1} TEXT null,${PROMOCION.URL_IMAGEN2} TEXT null,${PROMOCION.URL_IMAGEN3} TEXT null,PRIMARY KEY (${PROMOCION.KEY_1},${PROMOCION.ID_EXHIBIDOR})) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PROMOCION.NAME);
};

const createPreciadorTable = () => {
  const sentence = `create table if not exists ${PRECIADOR.NAME} (${PRECIADOR.KEY_1} text not null,${PRECIADOR.ID_PORTAFOLIO} text not null,${PRECIADOR.ID_PRODUCTO} text not null,${PRECIADOR.PRECIO} REAL null,${PRECIADOR.ESTADO} SMALLINT not null,${PRECIADOR.URL_IMAGEN1} text null,${PRECIADOR.URL_IMAGEN2} text null,${PRECIADOR.URL_IMAGEN3} text null,${PRECIADOR.USUARIO_CREACION} text not null,${PRECIADOR.FECHA_CREACION} text not null,${PRECIADOR.FECHA_MODIFICACION} text not null,PRIMARY KEY (${PRECIADOR.KEY_1},${PRECIADOR.ID_PORTAFOLIO},${PRECIADOR.ID_PRODUCTO})) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PRECIADOR.NAME);
};

const createPortafolioIdeaTable = () => {
  const sentence = `create table if not exists ${IDEAL_PORFOLIO.NAME} (${IDEAL_PORFOLIO.KEY_1} text not null,${IDEAL_PORFOLIO.FOREIGH_KEY_1} TEXT null,${IDEAL_PORFOLIO.FOREIGH_KEY_2} TEXT null,${IDEAL_PORFOLIO.ID_CATEGORIA} TEXT null,${IDEAL_PORFOLIO.NOMBRE_PRODUCTO} TEXT null,${IDEAL_PORFOLIO.URL_IMAGEN_PRODUCTO} TEXT null,PRIMARY KEY (${IDEAL_PORFOLIO.KEY_1},${IDEAL_PORFOLIO.FOREIGH_KEY_1})) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, IDEAL_PORFOLIO.NAME);
};

const createPlanogramaTable = () => {
  const sentence = `create table if not exists ${PLANOGRAMA.NAME} (${PLANOGRAMA.KEY_1} text primary key not null,${PLANOGRAMA.ID_CATEGORIA} TEXT null,${PLANOGRAMA.ID_GRUPO_CLIENTE} TEXT null,${PLANOGRAMA.URL_IMAGEN1} TEXT null,${PLANOGRAMA.URL_IMAGEN2} TEXT null,${PLANOGRAMA.URL_IMAGEN3} TEXT null,${PLANOGRAMA.NOMBRE_CATEGORIA} TEXT null) `;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, PLANOGRAMA.NAME);
};

const createExhibidorTipoTable = () => {
  const sentence = `create table if not exists ${TYPE_EXHIBIDOR.NAME} (${TYPE_EXHIBIDOR.KEY_1} text primary key not null,${TYPE_EXHIBIDOR.NOMBRE_TIPO_EXHIBIDOR} TEXT null,${TYPE_EXHIBIDOR.URL_IMAGEN_EXHIBIDOR} TEXT null,${TYPE_EXHIBIDOR.USUARIO_CREACION} TEXT NULL,${TYPE_EXHIBIDOR.FECHA_CREACION} TEXT NULL,${TYPE_EXHIBIDOR.FECHA_MODIFICACION} TEXT NULL)`;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, TYPE_EXHIBIDOR.NAME);
};

const createVariableTable = () => {
  const sentence = `create table if not exists ${VARIABLE.NAME} (${VARIABLE.KEY_1} text primary key not null,${VARIABLE.ID_GRUPO_CLIENTE} TEXT not null,${VARIABLE.NOMBRE_VARIABLE} TEXT null,${VARIABLE.ESTADO_VARIABLE} BOOLEAN null,${VARIABLE.PORCENTAJE_VARIABLE} DECIMAL NULL,${VARIABLE.USUARIO_CREACION} TEXT NULL,${VARIABLE.FECHA_CREACION} TEXT NULL,${TYPE_EXHIBIDOR.FECHA_MODIFICACION} TEXT NULL)`;
  // const sentenceIndex = `CREATE INDEX ${CLIENTE_TABLE.INDEX_1} ON ${CLIENTE_TABLE.TABLE_NAME} (${CLIENTE_TABLE.ITEM_6});`
  createTable(sentence, TYPE_EXHIBIDOR.NAME);
};

const createTable = async (sentence, table_name, createIndex) => {
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

export const selectData = (sentence, setArray) => {
  console.log("EJECUTANDO SENTENCIA: " + sentence + " . . . . ");
  global.dbModerna.transaction((tx) => {
    tx.executeSql(sentence, [], (_, { rows }) => {
      // Manipula los resultados de la consulta aquí
      const { _array } = rows;
      setArray(_array);
      console.log(_array);
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
    console.log("resp: - - - - - - - - - - ", resp);
    for (const res of resp) {
      //console.log("DATO DEL FOR EACH", res);
      for (const objetoSentencia of res.data) {
        //console.log("DATO DEL 2 FOR EACH", objetoSentencia)
        //Alert.alert("SENTENCIAS A INSERTAR:", objetoSentencia);
        db_insertGlobal({
          tableName: res.tableName,
          sentence: objetoSentencia,
        });
      }
    }
    return true;
  } catch (e) {
    console.log(e.response);
    //Alert.alert("Error de inicio de sesion", e.response.data.message);
    return false;
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
  createProductTable();
  createCategoryTable();
  createAuditTable();
  createExhibidorTable();
  createPromosTable();
  createPreciadorTable();
  createPortafolioTable();
  createPortafolioAuditoriaTable();
  //createPortafolioComTable();
  createPortafolioIdeaTable();
  //createPreciadorPortafolioComTable();
  //createPreciadorPortafolioIdeaTable();
  createPlanogramaTable();
  createExhibidorTipoTable();
  createPersistencia();
  //createPortfolioTable();
  createVariableTable();
};

export const realizarConsulta = (sentence) => {
  return new Promise((resolve, reject) => {
    global.dbModerna.transaction((tx) => {
      tx.executeSql(
        sentence,
        [],
        (_, { rows }) => {
          const { _array } = rows;
          resolve(_array);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const handleSelectDataBase = (sentence, onSuccess, onError) => {
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      sentence,
      [],
      (_, { rows }) => {
        const { _array } = rows;
        onSuccess(_array);
      },
      (_, error) => onError(error)
    );
  });
};

/*
export const realizarConsulta = (sentence, onSuccess, onError) => {
  global.dbModerna?.transaction((tx) => {
    tx.executeSql(
      sentence,
      [],
      (_, { rows: { _array } }) => {
        console.log("Datos de la consulta interna: ", _array);
        onSuccess(_array);
      },
      (_, error) => {
        console.log("Error al consultar la tabla: ", error);
        onError(error);
      }
    );
  });
};
*/
/*const realizarConsulta = (sentence) => {
  global.dbModerna?.transaction((tx) => {
    tx.executeSql(
      sentence,
      [],
      (_, { rows: { _array } }) => {
        console.log("Datos de la consulta interna: ", _array);
        return (_array);
      },
      () => {
        console.log("Error al consultar la tabla");
      }
    );
  });
};*/
