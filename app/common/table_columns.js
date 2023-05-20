export const PERCHA_TABLE = {
  NAME: "Percha",
  KEY_1: "id_percha",
  ESTADO_PERCHA: "estado_percha",
  FOREIGH_KEY_1: "id_categoria",
  CATEGORIA_GENERAL: "valor_categoria_general",
  CATEGORIA_MODERNA: "valor_categoria_moderna",
  INDEX_1: "id_percha",
};

export const CLIENT_TABLE = {
  NAME: "cliente",
  KEY_1: "id_cliente",
  ID_TIPO_CLIENTE: "id_tipo_cliente",
  NOMBRE_CLIENTE: "nombre_cliente",
  FOREIGH_KEY_1: "id_tipo_cliente",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_cliente",
};

export const BRANCH_TABLE = {
  NAME: "sucursal",
  KEY_1: "id_sucursal",
  LATITUD: "latitud",
  LONGITUD: "longitud",
  //FOREIGH_KEY_1: "id_auditoria",
  NOMBRE_SUCURSAL: "nombre_sucursal",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_sucursal",
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
  NOMBRE_GRUPO_CLIENTE: "nombre_grupo_cliente",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  FOREIGH_KEY_1: "id_grupo_cliente",
  INDEX_1: "id_tipo_cliente",
};
