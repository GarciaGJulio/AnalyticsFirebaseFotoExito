export const CLIENT_TABLE = {
  NAME: "cliente",
  KEY_1: "id_cliente",
  ID_TIPO_CLIENTE: "id_tipo_cliente",
  NOMBRE_CLIENTE: "nombre_cliente",
  FOREIGH_KEY_1: "id_tipo_cliente",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  NOMBRE_TIPO_CLIENTE: "nombre_tipo_cliente",
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
  ID_CATEGORIA: "id_categoria",
  ID_PORTAFOLIO_COMPLEMENTARIO: "id_portafolio_complementario",
  NOMBRE_PRODUCTO: "nombre_producto",
  IMAGEN_PRODUCTO: "imagen_producto",
  PRECIO: "precio",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  FOREIGH_KEY_1: "id_categoria",
  INDEX_1: "id_producto",
};

export const IDEAL_PORFOLIO = {
  NAME: "portafolio_ideal",
  KEY_1: "id_portafolio_ideal",
  FOREIGH_KEY_1: "id_producto",
  FOREIGH_KEY_2: "id_portafolio_ideal_auditoria",
  INDEX_1: "portafolio_ideal",
};

export const PLANOGRAMA = {
  NAME: "planograma",
  KEY_1: "id_planograma",
  ID_CATEGORIA: "id_categoria",
  ID_GRUPO_CLIENTE: "id_grupo_cliente",
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

export const IMAGEN_PLANOGRAMA = {
  NAME: "imagen_planograma",
  KEY_1: "id_imagen",
  ID_PLANOGRAMA: "id_planograma",
  URL_IMAGEN_PLANOGRAMA_1: "url_imagen_planograma_1",
  URL_IMAGEN_PLANOGRAMA_2: "url_imagen_planograma_2",
  URL_IMAGEN_PLANOGRAMA_3: "url_imagen_planograma_3",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_imagen",
};

export const AUDITORIA = {
  NAME: "auditoria",
  KEY_1: "id_auditoria",
  ID_PRECIADOR: "id_preciador",
  ID_PERCHA: "id_percha",
  ID_PROMOCIONES: "id_promociones",
  ID_SUCURSAL: "id_sucursal",
  CLIENTE: "cliente",
  TIPO_CLIENTE: "tipo_cliente",
  INDEX_1: "id_auditoria",
};

export const PROMOCIONES = {
  NAME: "promociones",
  KEY_1: "id_promociones",
  ID_EXHIBIDOR: "id_exhibidor",
  ID_AUDITORIA: "id_auditoria",
  ESTADO_PROMO: "estado_promo",
  INDEX_1: "id_promociones",
};

export const PERCHA = {
  NAME: "percha",
  KEY_1: "id_percha",
  ID_CATEGORIA: "id_categoria",
  ID_AUDITORIA: "id_auditoria",
  ESTADO_PERCHA: "estado_percha",
  CATEGORIA_GENERAL: "categoria_general",
  CATEGORIA_MODERNA: "categoria_moderna",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_percha",
};

export const IMAGEN_APLICACION_MOVIL_2 = {
  NAME: "imagen_aplicacion_movil_2",
  KEY_1: "idimageappmobile2",
  ID_PERCHA: "id_percha",
  URL_PERCHA_IMAGEN_1: "url_percha_imagen1",
  URL_PERCHA_IMAGEN_2: "url_percha_imagen2",
  URL_PERCHA_IMAGEN_3: "url_percha_imagen3",
  INDEX_1: "idimageappmobile2",
};

export const IMAGEN_APLICACION_MOVIL = {
  NAME: "imagen_aplicacion_movil",
  KEY_1: "id_imagen_aplicacion_movil",
  ID_PRECIADOR_PORTAFOLIO_IDEAL: "id_preciador_portafolio_ideal",
  ID_PRECIADOR_PORTAFOLIO_COMPLEMENTARIO:
    "id_preciador_portafolio_complementario",
  URL_PRECIADOR_IMAGEN_1: "url_preciador_imagen1",
  URL_PRECIADOR_IMAGEN_2: "url_preciador_imagen2",
  URL_PRECIADOR_IMAGEN_3: "url_preciador_imagen3",
  INDEX_1: "id_imagen_aplicacion_movil",
};

export const PRECIADOR = {
  NAME: "preciador",
  KEY_1: "id_preciador",
  ID_PRECIADOR_PORTAFOLIO_COMPLEMENTARIO:
    "id_preciador_portafolio_complementario",
  ID_AUDITORIA: "id_auditoria",
  PRE_ID_PRECIADOR_PORTAFOLIO_IDEAL: "pre_id_preciador_portafolio_ideal",
  INDEX_1: "id_preciador",
};

export const COMPLEMENTARY_PORTFOLIO = {
  NAME: "portafolio_complementario",
  KEY_1: "id_portafolio_complementario",
  ID_PRODUCTO: "id_producto",
  ID_PRECIADOR_PORTAFOLIO_COMPLEMENTARIO:
    "id_preciador_portafolio_complementario",
  ESTADO_PORTAFOLIO_COMPLEMENTARIO: "estado_portafolio_complementario",
  INDEX_1: "id_portafolio_complementario",
};

export const PRECIADOR_PORTAFOLIO_COMPLEMENTARIO = {
  NAME: "preciador_portafolio_complementario",
  KEY_1: "id_preciador_portafolio_complementario",
  ID_PORTAFOLIO_COMPLEMENTARIO: "id_portafolio_complementario",
  ID_PRECIADOR: "id_preciador",
  PRECIADOR_PORTAFOLIO_COMPLEMENTARIO: "preciador_portafolio_complementario",
  ESTADO_PRECIADOR_COMPLEMENTARIO: "estado_preciador_complementario",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_preciador_portafolio_complementario",
};

export const PRECIADOR_PORTAFOLIO_IDEAL = {
  NAME: "preciador_portafolio_ideal",
  KEY_1: "id_preciador_portafolio_ideal",
  PRECIADOR_PORTAFOLIO_IDEAL: "preciador_portafolio_ideal",
  ESTADO_PRECIADOR_IDEAL: "estado_preciador_ideal",
  USUARIO_CREACION: "usuario_creacion",
  FECHA_CREACION: "fecha_creacion",
  FECHA_MODIFICACION: "fecha_modificacion",
  INDEX_1: "id_preciador_portafolio_ideal",
};
