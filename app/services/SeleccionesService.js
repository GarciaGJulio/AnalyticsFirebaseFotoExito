import {
  PERCHA_TABLE_NAME,
} from "../common/sqlite_config";
import {
  PERCHA_TABLE,

} from "../common/table_columns";



export const lookForPerchas = (fnsetPercha) => {
  //return productos;
  let query = `SELECT 
  id_percha,
    estado_percha

   from ${PERCHA_TABLE_NAME}`;
  // if (criteria !== "" && criteria !== undefined) {
  //   query += " where descripcion LIKE '%" + criteria + "%'";
  // }
  console.log("query: " + query);
  global.dbModerna.transaction((tx) => {
    tx.executeSql(
      query,
      [], (_, { rows: { _array } }) => {
        const pedidos = [];
        _array.forEach((element) => {
          // let query2 = `SELECT * from ${PRODUCTOS_TABLE_NAME} p LEFT JOIN ${PEDIDO_DETALLE_NAME} d
          // ON ( p.id_producto_sap = d.${PEDIDO_DETALLE_TABLE.ITEM_2} AND d.${PEDIDO_DETALLE_TABLE.ITEM_3} = ${element.id_pedido})`;
          // console.log("query 2: ", query2);
          console.log("ARRAY", element)
          pedidos.push({
            estado_percha: element.estado_percha,
            id_percha: element.id_percha,
          });
        });
        fnsetPercha(pedidos);
        console.log("pedidos : ", pedidos);
        //console.log("productos : ", productos);
      }
    );
  });
};