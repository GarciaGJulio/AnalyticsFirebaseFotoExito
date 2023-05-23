import { PERCHA_TABLE_NAME } from "../common/sqlite_config";
import { PERCHA_TABLE, CLIENT_TABLE } from "../common/table_columns";
import {
  generateUIDD,
  getActualDate,
  getActualDateStock,
} from "../common/utils";
// import { updateLocalProduct } from "./ProductoService";

export const db_insertPercha = async (
  id_percha,
  estado_percha,
  categoria_general,
  categoria_moderna
) => {
  console.log("insertando PERCHA  -----------------------------");
  console.log(id_percha, estado_percha, categoria_general, categoria_moderna);
  global.dbModerna.transaction((tx) => {
    // let query_check = `select id_cliente from ${CLIENTE_TABLE.TABLE_NAME} WHERE identificacion = '${identificacion}' OR id_cliente = '${id_cliente}'`;
    // /* tx.executeSql(query_check, [], (_, { rows: { _array } }) => {
    //    if (_array?.length > 0) {
    //      console.log("cliente ya registrado: ", nombre_cuenta, identificacion);
    //    } else {*/
    tx.executeSql(
      `insert into ${PERCHA_TABLE_NAME} (${PERCHA_TABLE.KEY_1},${PERCHA_TABLE.ESTADO_PERCHA},${PERCHA_TABLE.CATEGORIA_MODERNA},${PERCHA_TABLE.CATEGORIA_GENERAL}) values (?,?,?.?);`,
      [id_percha, estado_percha, categoria_general, categoria_moderna],
      () => {
        console.log(
          "se ejecuta sentencia insert " + PERCHA_TABLE_NAME + " OK  "
        );
        console.log("verificando si hay funcion can create order");
        // if (succesFunction) {
        //   // succesFunction();
        // }
      },
      () => {
        console.log("error al insertar tabla " + PERCHA_TABLE_NAME);
        // if (errorFunction) {
        //   errorFunction()
        // }
      }
    );
    /*}
  /*});*/
  });
  return;
};

export const db_insertSucursal = async (
  id_sucursal,
  id_auditoria,
  nombre_sucursal,
  latitud,
  longitud
) => {
  console.log(
    "insertando datos en la tabla Sucursal  -----------------------------"
  );
  console.log(id_sucursal, id_auditoria, nombre_sucursal, latitud, longitud);
  global.dbModerna.transaction((tx) => {
    // let query_check = `select id_cliente from ${CLIENTE_TABLE.TABLE_NAME} WHERE identificacion = '${identificacion}' OR id_cliente = '${id_cliente}'`;
    // /* tx.executeSql(query_check, [], (_, { rows: { _array } }) => {
    //    if (_array?.length > 0) {
    //      console.log("cliente ya registrado: ", nombre_cuenta, identificacion);
    //    } else {*/
    tx.executeSql(
      `insert into ${CLIENT_TABLE.NAME} (${CLIENT_TABLE.KEY_1},${CLIENT_TABLE.FOREIGH_KEY_1},${CLIENT_TABLE.NOMBRE_SUCURSAL},${CLIENT_TABLE.LATITUD},${CLIENT_TABLE.LONGITUD}) values (?,?,?,?,?);`,
      [id_sucursal, id_auditoria, nombre_sucursal, latitud, longitud],
      () => {
        console.log(
          "se ejecuta sentencia insert " + CLIENT_TABLE.NAME + " OK  "
        );
        console.log("verificando si hay funcion can create order");
        // if (succesFunction) {
        //   // succesFunction();
        // }
      },
      () => {
        console.log("error al insertar tabla " + CLIENT_TABLE.NAME);
        // if (errorFunction) {
        //   errorFunction()
        // }
      }
    );
    /*}
  /*});*/
  });
  return;
};

export const db_insertGlobal = async (objSentence) => {
  console.log("DATOS DE OBJECT A INSERTAR", objSentence);
  console.log(
    `insertando datos en la tabla ${objSentence.tableName} -----------------------------`
  );
  console.log();
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      objSentence.sentence,
      [],
      () => {
        console.log(
          "se ejecuta sentencia insert " + objSentence.tableName + " OK  "
        );
        console.log("verificando si hay funcion can create order");
        // if (succesFunction) {
        //   // succesFunction();
        // }
      },
      () => {
        console.log("error al insertar tabla " + objSentence.tableName);
        // if (errorFunction) {
        //   errorFunction()
        // }
      }
    );
    /*}
  /*});*/
  });
  return;
};

export const db_insertGlobalDataAudit = async (objSentence) => {
  console.log("DATOS DE OBJECT A INSERTAR: - - - - - ", objSentence);
  console.log(
    `insertando datos en la tabla: ${objSentence.tableName} -----------------------------`
  );
  //console.log();
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO " +
        objSentence.tableName +
        " (" +
        objSentence.dataInsertType.join() +
        ") VALUES(" +
        objSentence.dataInsert.join() +
        ")",
      [],
      () => {
        console.log(
          "se ejecuta sentencia insert " + objSentence.tableName + " OK  "
        );
        console.log("Validando insercion de datos");
      },
      () => {
        console.log("error al insertar tabla " + objSentence.tableName);
        // if (errorFunction) {
        //   errorFunction()
        // }
      }
    );
    /*}
  /*});*/
  });
  return;
};
