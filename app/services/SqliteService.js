import { Alert } from "react-native";
import { PERCHA_TABLE_NAME, realizarConsulta } from "../common/sqlite_config";
import { PERCHA_TABLE, CLIENT_TABLE } from "../common/table_columns";
import {
  generateUIDD,
  getActualDate,
  getActualDateStock,
} from "../common/utils";
import { generateSenteceSql } from "../utils/Utils";
import { subidaBaseRemoteTodaAuditoria } from "./SubidaBaseRemota";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
// import { updateLocalProduct } from "./ProductoService";

export const db_insertPercha = async (
  id_percha,
  estado_percha,
  categoria_general,
  categoria_moderna
) => {
  // console.log("insertando PERCHA  -----------------------------");
  // console.log(id_percha, estado_percha, categoria_general, categoria_moderna);
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

// Función asincrónica para borrar la base de datos completa
export const borrarBaseDeDatos = async () => {
  console.log("INVOCANDO BORRADO EN FUNCION");
  await new Promise((resolve, reject) => {
    global.dbModerna.transaction((tx) => {
      const borrarPromises = [
        tx.executeSql(`DELETE FROM sqlite_master WHERE type='table';`),
        tx.executeSql(`DELETE FROM sqlite_sequence;`),
      ];
      Promise.all(borrarPromises)
        .then(() => {
          console.log("La base de datos ha sido borrada.");
          resolve(); // Resolve después de borrar todas las tablas
        })
        .catch((error) => {
          console.error("Error al borrar la base de datos:", error);
          reject(error); // Reject en caso de error
        });
    }, reject); // Pasar reject como el segundo argumento de db.transaction
  });
};

// Función asincrónica para borrar la base de datos completa
export const borrarTablasDeBaseDeDatos = async () => {
  console.log("INVOCANDO BORRADO EN FUNCION");
  await new Promise((resolve, reject) => {
    global.dbModerna.transaction((tx) => {
      const borrarPromises = [
        tx.executeSql(`DELETE FROM cliente`),
        tx.executeSql(`DELETE FROM sucursal`),
        tx.executeSql(`DELETE FROM preciador`),
        tx.executeSql(`DELETE FROM percha`),
        tx.executeSql(`DELETE FROM promocion`),
        tx.executeSql(`DELETE FROM cliente`),
        tx.executeSql(`DELETE FROM tipo_cliente`),
        tx.executeSql(`DELETE FROM grupo_cliente`),
        tx.executeSql(`DELETE FROM portafolio`),
        tx.executeSql(`DELETE FROM portafolio_auditoria`),
        tx.executeSql(`DELETE FROM exhibidor`),
        tx.executeSql(`DELETE FROM exhibidor_tipo`),
        tx.executeSql(`DELETE FROM categoria`),
        tx.executeSql(`DELETE FROM producto`),
        tx.executeSql(`DELETE FROM planograma`),
        tx.executeSql(`DELETE FROM auditoria`),
        tx.executeSql(`DELETE FROM variable`),
      ];
      Promise.all(borrarPromises)
        .then(() => {
          console.log("La base de datos ha sido borrada.");
          resolve(); // Resolve después de borrar todas las tablas
        })
        .catch((error) => {
          console.error("Error al borrar la base de datos:", error);
          reject(error); // Reject en caso de error
        });
    }, reject); // Pasar reject como el segundo argumento de db.transaction
  });
};

export const db_insertSucursal = async (
  id_sucursal,
  id_auditoria,
  nombre_sucursal,
  latitud,
  longitud
) => {
  // console.log(
  //   "insertando datos en la tabla Sucursal  -----------------------------"
  // );
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
  // console.log("DATOS DE OBJECT A INSERTAR", objSentence);
  // console.log(
  //   `insertando datos en la tabla ${objSentence.tableName} -----------------------------`
  // );
  // console.log();
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      objSentence.sentence,
      [],
      () => {
        console.log(
          "se ejecuta sentencia insert " + objSentence.tableName + " OK  "
        );
        console.log("verificando si hay funcion can create order");
        /*Alert.alert(
          `Exito al insertar los datos en la tabla ${objSentence.tableName} `
        );*/
        // if (succesFunction) {
        //   // succesFunction();
        // }
      },
      () => {
        console.log("error al insertar tabla " + objSentence.tableName);
        /*Alert.alert(
          `Error al insertar los datos en la tabla ${objSentence.tableName} `
        );*/
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
  // console.log("DATOS DE OBJECT A INSERTAR: - - - - - ", objSentence);
  // console.log(
  //   `insertando datos en la tabla: ${objSentence.tableName} -----------------------------`
  // );
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

export const db_insertGlobalLocalDataBase = async (objTable) => {
  let sentenceSql =
    "INSERT INTO " +
    objTable.tableName +
    " (" +
    objTable.dataInsertType.join() +
    ") VALUES(" +
    objTable.dataInsert.join() +
    ")";
  console.log("sentenceSql", sentenceSql);
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      sentenceSql,
      [],
      (_, { rows }) => {
        const { _array } = rows;
        //_array);
        console.log("campos de persistencia ingresados");
      },
      (_, error) => {
        console.log("error al campos de persistencia ingresados", error);
        try {
          db_updateGlobalLocalDataBase(objTable);
        } catch (erro) {
          console.log("error", erro);
        }
        // reject(error)
      }
    );
  });
};

export const db_updateGlobalLocalDataBase = async (objTable) => {
  console.log(
    "acutualizando userScreen",
    generateSenteceSql(objTable, "UPDATE")
  );

  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      generateSenteceSql(objTable, "UPDATE"),
      [],
      (_, { rows }) => {
        const { _array } = rows;
        console.log("actualizado con exito el userScreen");
      },
      (_, error) => {
        console.log(" error al actualizar el userScreen");
      }
    );
  });
};

export const db_deleteGlobalLocalDataBase = async (objTable) => {
  console.log(
    "ELIMANDO userScreen//////////////////////////////////////////////////////////",
    generateSenteceSql(objTable, "DELETE")
  );

  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      generateSenteceSql(objTable, "DELETE"),
      [],
      (_, { rows }) => {
        const { _array } = rows;
        console.log("actualizado con exito el userScreen");
      },
      (_, error) => {
        console.log(" error al actualizar el userScreen");
      }
    );
  });
};
