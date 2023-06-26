import { PERCHA_TABLE_NAME } from "../common/sqlite_config";
import { CLIENT_TABLE, PERCHA_TABLE, VARIABLE } from "../common/table_columns";

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
    tx.executeSql(query, [], (_, { rows: { _array } }) => {
      const pedidos = [];
      _array.forEach((element) => {
        // let query2 = `SELECT * from ${PRODUCTOS_TABLE_NAME} p LEFT JOIN ${PEDIDO_DETALLE_NAME} d
        // ON ( p.id_producto_sap = d.${PEDIDO_DETALLE_TABLE.ITEM_2} AND d.${PEDIDO_DETALLE_TABLE.ITEM_3} = ${element.id_pedido})`;
        // console.log("query 2: ", query2);
        console.log("ARRAY", element);
        pedidos.push({
          estado_percha: element.estado_percha,
          id_percha: element.id_percha,
        });
      });
      fnsetPercha(pedidos);
      console.log("pedidos : ", pedidos);
      //console.log("productos : ", productos);
    });
  });
};

export const lookForSucursal = (fnsetSucursal) => {
  //return productos;
  let query = `SELECT 
  id_sucursal,
  id_auditoria,
  nombre_sucursal,
  latitud,
  longitud

   from ${CLIENT_TABLE.NAME}`;
  // if (criteria !== "" && criteria !== undefined) {
  //   query += " where descripcion LIKE '%" + criteria + "%'";
  // }
  console.log("query: " + query);
  global.dbModerna.transaction((tx) => {
    tx.executeSql(query, [], (_, { rows: { _array } }) => {
      const pedidos = [];
      _array.forEach((element) => {
        // let query2 = `SELECT * from ${PRODUCTOS_TABLE_NAME} p LEFT JOIN ${PEDIDO_DETALLE_NAME} d
        // ON ( p.id_producto_sap = d.${PEDIDO_DETALLE_TABLE.ITEM_2} AND d.${PEDIDO_DETALLE_TABLE.ITEM_3} = ${element.id_pedido})`;
        // console.log("query 2: ", query2);
        console.log("ARRAY", element);
        pedidos.push({
          id_sucursal: element.id_sucursal,
          id_auditoria: element.id_auditoria,
          nombre_sucursal: element.nombre_sucursal,
          latitud: element.latitud,
          longitud: element.longitud,
        });
      });
      fnsetSucursal(pedidos);
      console.log("datos de la tabla sucursal : ", pedidos);
      //console.log("productos : ", productos);
    });
  });
};

export const lookForVariable = (fnsetVariable) => {
  //return productos;
  let query = `SELECT *
    from ${VARIABLE.NAME}`;
  // if (criteria !== "" && criteria !== undefined) {
  //   query += " where descripcion LIKE '%" + criteria + "%'";
  // }
  console.log("query: " + query);
  global.dbModerna.transaction((tx) => {
    tx.executeSql(query, [], (_, { rows: { _array } }) => {
      const pedidos = [];
      _array.forEach((element) => {
        // let query2 = `SELECT * from ${PRODUCTOS_TABLE_NAME} p LEFT JOIN ${PEDIDO_DETALLE_NAME} d
        // ON ( p.id_producto_sap = d.${PEDIDO_DETALLE_TABLE.ITEM_2} AND d.${PEDIDO_DETALLE_TABLE.ITEM_3} = ${element.id_pedido})`;
        // console.log("query 2: ", query2);
        console.log("ARRAY", element);
        pedidos.push({
          id_variable: element.id_variable,
          id_grupo_cliente: element.id_grupo_cliente,
          nombre_variable: element.nombre_variable,
          estado_variable: element.estado_variable,
          porcentaje_variable: element.porcentaje_variable,
          usuario_creacion: element.usuario_creacion,
          fecha_creacion: element.fecha_creacion,
          fecha_modificacion: element.fecha_modificacion,
        });
      });
      fnsetVariable(pedidos);
      console.log("datos de la tabla variable : ", pedidos.length);
      //console.log("productos : ", productos);
    });
  });
};
