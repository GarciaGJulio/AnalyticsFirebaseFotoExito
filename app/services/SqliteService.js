import {
  PERCHA_TABLE_NAME,
} from "../common/sqlite_config";
import {
  PERCHA_TABLE,

} from "../common/table_columns";
import { generateUIDD, getActualDate, getActualDateStock } from "../common/utils";
// import { updateLocalProduct } from "./ProductoService";

export const db_insertPercha = async (
  id_percha,
  estado_percha,
  categoria_general,
  categoria_moderna
) => {
  console.log("insertando PERCHA  -----------------------------");
  console.log(
    id_percha,
    estado_percha,
    categoria_general,
    categoria_moderna
  );
  global.dbModerna.transaction((tx) => {
    // let query_check = `select id_cliente from ${CLIENTE_TABLE.TABLE_NAME} WHERE identificacion = '${identificacion}' OR id_cliente = '${id_cliente}'`;
    // /* tx.executeSql(query_check, [], (_, { rows: { _array } }) => {
    //    if (_array?.length > 0) {
    //      console.log("cliente ya registrado: ", nombre_cuenta, identificacion);
    //    } else {*/
    tx.executeSql(
      `insert into ${PERCHA_TABLE_NAME} (${PERCHA_TABLE.KEY_1},${PERCHA_TABLE.ESTADO_PERCHA},${PERCHA_TABLE.CATEGORIA_MODERNA},${PERCHA_TABLE.CATEGORIA_GENERAL}) values (?,?,?.?);`,
      [
        id_percha,
        estado_percha,
        categoria_general,
        categoria_moderna
      ],
      () => {
        console.log(
          "se ejecuta sentencia insert " +
          PERCHA_TABLE_NAME +
          " OK  "
        );
        console.log("verificando si hay funcion can create order")
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
