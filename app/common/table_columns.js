export const CLIENT_TABLE = {
  NAME: "cliente",
  KEY_1: "id_cliente",
  FOREIGH_KEY_1: "id_tipo_cliente",
  NOMBRE_CLIENTE: "nombre_cliente",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  ID_GRUPO_CLIENTE: "id_grupo_cliente",
  NOMBRE_GRUPO_CLIENTE: "nombre_grupo_cliente",
  NOMBRE_TIPO_CLIENTE: "nombre_tipo_cliente",
  INDEX_1: "id_cliente",
};

export const BRANCH_TABLE = {
  NAME: "sucursal",
  KEY_1: "id_sucursal",
  ID_CLIENTE: "id_cliente",
  LATITUD: "latitud",
  LONGITUD: "longitud",
  //FOREIGH_KEY_1: "id_auditoria",
  NOMBRE_SUCURSAL: "nombre_sucursal",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_sucursal",
};

export const PORTAFOLIO_AUDITORIA = {
  NAME: "portafolio_auditoria",
  KEY_1: "id_portafolio_auditoria",
  ID_PORTAFOLIO: "id_portafolio",
  ID_PRODUCTO: "id_producto",
};

export const PORTAFOLIO = {
  NAME: "portafolio",
  KEY_1: "id_portafolio",
  ID_PRODUCTO: "id_producto",
  ID_GRUPO_CLIENTE: "id_grupo_cliente",
  TIPO: "tipo",
};

export const GROUP_CLIENT_TABLE = {
  NAME: "grupo_cliente",
  KEY_1: "id_grupo_cliente",
  NOMBRE_GRUPO_CLIENTE: "nombre_grupo_cliente",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_grupo_cliente",
};

export const TYPE_CLIENT_TABLE = {
  NAME: "tipo_cliente",
  KEY_1: "id_tipo_cliente",
  ID_GRUPO_CLIENTE: "id_grupo_cliente",
  NOMBRE_TIPO_CLIENTE: "nombre_tipo_cliente",
  USUARIO_CREACION: "usuario_creacion",
  //NOMBRE_GRUPO_CLIENTE: "nombre_grupo_cliente",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  FOREIGH_KEY_1: "id_grupo_cliente",
  INDEX_1: "id_tipo_cliente",
};

export const CATEGORY = {
  NAME: "categoria",
  KEY_1: "id_categoria",
  NOMBRE_CATEGORIA: "nombre_categoria",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_categoria",
};

export const PRODUCT = {
  NAME: "producto",
  KEY_1: "id_producto",
  FOREIGH_KEY_1: "id_categoria",
  NOMBRE_PRODUCTO: "nombre_producto",
  URL_IMAGEN_PRODUCTO: "url_imagen_producto",
  PRECIO: "precio",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_producto",
};

export const IDEAL_PORFOLIO = {
  NAME: "portafolio_ideal",
  KEY_1: "id_portafolio_ideal",
  FOREIGH_KEY_1: "id_producto",
  FOREIGH_KEY_2: "id_grupo_cliente",
  ID_CATEGORIA: "id_categoria",
  NOMBRE_PRODUCTO: "nombre_producto",
  URL_IMAGEN_PRODUCTO: "url_imagen_producto",
  INDEX_1: "id_portafolio_ideal",
};

/*
export const PORFOLIO = {
  NAME: "portafolio",
  KEY_1: "id_portafolio",
  FOREIGH_KEY_1: "id_portafolio_ideal",
  FOREIGH_KEY_2: "id_portafolio_complementario",
  INDEX_1: "id_portafolio",
};
*/
export const PLANOGRAMA = {
  NAME: "planograma",
  KEY_1: "id_planograma",
  ID_CATEGORIA: "id_categoria",
  ID_GRUPO_CLIENTE: "id_grupo_cliente",
  URL_IMAGEN1: "url_imagen1",
  URL_IMAGEN2: "url_imagen2",
  URL_IMAGEN3: "url_imagen3",
  NOMBRE_CATEGORIA: "nombre_categoria",
  INDEX_1: "id_planograma",
};

export const EXHIBIDOR = {
  NAME: "exhibidor",
  KEY_1: "id_exhibidor",
  ID_EXHIBIDOR_TIPO: "id_exhibidor_tipo",
  ID_CLIENTE: "id_cliente",
  SUCURSAL: "sucursal",
  AÑO_EXHIBIDOR: "ano_exhibidor",
  MES_EXHIBIDOR: "mes_exhibidor",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_exhibidor",
};

export const TYPE_EXHIBIDOR = {
  NAME: "exhibidor_tipo",
  KEY_1: "id_exhibidor_tipo",
  NOMBRE_TIPO_EXHIBIDOR: "nombre_tipo_exhibidor",
  URL_IMAGEN_EXHIBIDOR: "url_imagen_exhibidor",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_exhibidor_tipo",
};

export const AUDITORIA = {
  NAME: "auditoria",
  KEY_1: "id_auditoria",
  ID_PRECIADOR: "id_preciador",
  ID_PERCHA: "id_percha",
  ID_PROMOCION: "id_promocion",
  ID_SUCURSAL: "id_sucursal",
  ID_CLIENTE: "id_cliente",
  ID_PORTAFOLIO_AUDITORIA: "id_portafolio_auditoria",
  NOMBRE_CLIENTE: "nombre_cliente",
  NOMBRE_SUCURSAL: "nombre_sucursal",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  SINCRONIZADA: "sincronizada",
  INDEX_1: "id_auditoria",
};

export const PROMOCION = {
  NAME: "promocion",
  KEY_1: "id_promocion",
  ID_EXHIBIDOR: "id_exhibidor",
  ESTADO_PROMO: "estado_promocion",
  URL_IMAGEN1: "url_imagen1",
  URL_IMAGEN2: "url_imagen2",
  URL_IMAGEN3: "url_imagen3",
  INDEX_1: "id_promocion",
};

export const PERCHA = {
  NAME: "percha",
  KEY_1: "id_percha",
  ID_CATEGORIA: "id_categoria",
  ESTADO_PERCHA: "estado_percha",
  CATEGORIA_GENERAL: "categoria_general",
  CATEGORIA_MODERNA: "categoria_moderna",
  URL_IMAGEN1: "url_imagen1",
  URL_IMAGEN2: "url_imagen2",
  URL_IMAGEN3: "url_imagen3",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_percha",
};

export const PRECIADOR = {
  NAME: "preciador",
  KEY_1: "id_preciador",
  ID_PORTAFOLIO: "id_portafolio",
  ID_PRODUCTO: "id_producto",
  PRECIO: "precio",
  ESTADO: "estado",
  URL_IMAGEN1: "url_imagen1",
  URL_IMAGEN2: "url_imagen2",
  URL_IMAGEN3: "url_imagen3",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_preciador",
};

export const PERSISTENCIA = {
  NAME: "persistencia",
  KEY_1: "id_persistencia",
  SCREEN_NAME: "nombre_pantalla",
  TABLE_NAME: "nombre_tabla",
  ITEM_ID: "id_registro",
  COLUMN_ID: "campo_id",
  EXTRA_INFO: "extra_info",
};
