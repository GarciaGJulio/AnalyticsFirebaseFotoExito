export const dataParameters = {
  data: {
    sucursal: {
      data: [
        "id_sucursal",
        "nombre_sucursal",
        "latitud",
        "longitud",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    tipo_cliente: {
      data: [
        "id_tipo_cliente",
        "id_grupo_cliente",
        "nombre_tipo_cliente",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [
        {
          tableName: "grupo_cliente",
          data: ["nombre_grupo_cliente"],
          foreingKey: "id_grupo_cliente",
        },
      ],
    },
    grupo_cliente: {
      data: [
        "id_grupo_cliente",
        "nombre_grupo_cliente",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    cliente: {
      data: [
        "id_cliente",
        "id_tipo_cliente",
        "nombre_cliente",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    promociones: {
      data: ["id_promociones", "id_exhibidor", "id_auditoria", "estado_promo"],
      foreingFields: [],
    },
    auditoria: {
      data: [
        "id_auditoria",
        "id_preciador",
        "id_percha",
        "id_promociones",
        "id_sucursal",
        "cliente",
        "tipo_cliente",
      ],
      foreingFields: [],
    },
    percha: {
      data: [
        "id_percha",
        "id_categoria",
        "id_auditoria",
        "estado_percha",
        "categoria_general",
        "categoria_moderna",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    imagen_aplicacion_movil_2: {
      data: [
        "IdImageAppMobile2",
        "id_percha",
        "url_percha_imagen1",
        "url_percha_imagen2",
        "url_percha_imagen3",
      ],
      foreingFields: [],
    },
    imagen_aplicacion_movil: {
      data: [
        "id_imagen_aplicacion_movil",
        "id_preciador_portafolio_ideal",
        "id_preciador_portafolio_complementario",
        "url_preciador_imagen1",
        "url_preciador_imagen2",
        "url_preciador_imagen3",
      ],
      foreingFields: [],
    },
    preciador: {
      data: [
        "id_preciador",
        "id_preciador_portafolio_complementario",
        "id_auditoria",
        "pre_id_preciador_portafolio_ideal",
      ],
      foreingFields: [],
    },
    portafolio_complementario: {
      data: [
        "id_portafolio_complementario",
        "id_producto",
        "id_preciador_portafolio_complementario",
        "estado_portafolio_complementario",
      ],
      foreingFields: [],
    },
    preciador_portafolio_complementario: {
      data: [
        "id_preciador_portafolio_complementario",
        "id_portafolio_complementario",
        "id_preciador",
        "preciador_portafolio_complementario",
        "estado_preciador_complementario",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    preciador_portafolio_ideal: {
      data: [
        "id_preciador_portafolio_ideal",
        "preciador_portafolio_ideal",
        "estado_preciador_ideal",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    exhibidor: {
      data: [
        "id_exhibidor",
        "id_exhibidor_tipo",
        "id_cliente",
        "sucursal",
        "año_exhibidor",
        "mes_exhibidor",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    exhibidor_tipo: {
      data: [
        "id_exhibidor_tipo",
        "nombre_tipo_exhibidor",
        "url_imagen_exhibidor",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    categoria: {
      data: [
        "id_categoria",
        "nombre_categoria",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    producto: {
      data: [
        "id_producto",
        "id_categoria",
        "id_portafolio_complementario",
        "nombre_producto",
        "imagen_producto",
        "precio",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    portafolio_ideal: {
      data: [
        "id_portafolio_ideal",
        "id_portafolio",
        "id_portafolio_ideal_auditoria",
      ],
      foreingFields: [],
    },
    planograma: {
      data: ["id_planograma", "id_categoria", "id_grupo_cliente"],
      foreingFields: [],
    },
    imagen_planograma: {
      data: [
        "id_imagen",
        "id_planograma",
        "url_imagen_planograma_1",
        "url_imagen_planograma_2",
        "url_imagen_planograma_3",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
  },
};

export const dataPrueba = {
  data: {
    sucursal: [
      "id_sucursal",
      "nombre_sucursal",
      "latitud",
      "longitud",
      "usuario_creacion",
      "fecha_creacion",
      "fecha_modificacion",
    ],
    tipo_cliente: {
      data: [
        "id_tipo_cliente",
        "id_grupo_cliente",
        "nombre_tipo_cliente",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [
        {
          tableName: "grupo_cliente",
          data: ["nombre_grupo_cliente"],
        },
      ],
    },
    grupo_cliente: [
      "id_grupo_cliente",
      "nombre_grupo_cliente",
      "usuario_creacion",
      "fecha_creacion",
      "fecha_modificacion",
    ],
    cliente: [
      "id_cliente",
      "id_tipo_cliente",
      "nombre_cliente",
      "usuario_creacion",
      "fecha_creacion",
      "fecha_modificacion",
    ],
  },
};
