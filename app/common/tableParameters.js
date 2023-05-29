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
        "fecha_modificacion"
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
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    grupo_cliente: {
      data: [
        "id_grupo_cliente",
        "nombre_grupo_cliente",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
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
        "id_grupo_cliente",
        "nombre_grupo_cliente"
      ],
      foreingFields: [
        {
          tableName: "tipo_cliente",
          data: ["nombre_tipo_cliente"],
          foreingKey: "id_tipo_cliente",
        },
      ],
    },
    promocion: {
      data: [
        "id_promocion",
        "id_exhibidor",
        "estado_promocion",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3"
      ],
      foreingFields: [],
    },
    auditoria: {
      data: [
        "id_auditoria",
        "id_preciador",
        "id_percha",
        "id_promocion",
        "id_sucursal",
        "id_cliente"
      ],
      foreingFields: [],
    },
    percha: {
      data: [
        "id_percha",
        "id_categoria",
        "estado_percha",
        "categoria_general",
        "categoria_moderna",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    preciador: {
      data: [
        "id_preciador",
        "id_preciador_portafolio_complementario",
        "id_preciador_portafolio_ideal"
      ],
      foreingFields: [],
    },
    portafolio_complementario: {
      data: [
        "id_portafolio_complementario",
        "id_producto",
        "estado_portafolio_complementario"
      ],
      foreingFields: [],
    },
    preciador_portafolio_complementario: {
      data: [
        "id_preciador_portafolio_complementario",
        "id_portafolio_complementario",
        "precio_portafolio_complementario",
        "estado_preciador_complementario",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    preciador_portafolio_ideal: {
      data: [
        "id_preciador_portafolio_ideal",
        "precio_portafolio_ideal",
        "estado_preciador_ideal",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    exhibidor: {
      data: [
        "id_exhibidor",
        "id_exhibidor_tipo",
        "id_cliente",
        "sucursal",
        "ano_exhibidor",
        "mes_exhibidor",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [
        {
          tableName: "cliente",
          data: ["nombre_cliente"],
          foreingKey: "id_cliente",
        },
        {
          tableName: "exhibidor_tipo",
          data: ["nombre_tipo_exhibidor", "url_imagen_exhibidor"],
          foreingKey: "id_exhibidor_tipo",
        },
      ],
    },
    exhibidor_tipo: {
      data: [
        "id_exhibidor_tipo",
        "nombre_tipo_exhibidor",
        "url_imagen_exhibidor",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    categoria: {
      data: [
        "id_categoria",
        "nombre_categoria",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    producto: {
      data: [
        "id_producto",
        "id_categoria",
        "nombre_producto",
        "url_imagen_producto",
        "precio",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion"
      ],
      foreingFields: [],
    },
    portafolio_ideal: {
      data: [
        "id_portafolio_ideal",
        "id_producto",
        "id_grupo_cliente",
      ],
      "foreingFields": [
        {
          "tableName": "producto",
          "data": [
            "id_categoria",
            "nombre_producto",
            "url_imagen_producto"
          ],
          "foreingKey": "id_producto"
        }
      ]
    },
    planograma: {
      data: [
        "id_planograma",
        "id_categoria",
        "id_grupo_cliente",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3"
      ],
      foreingFields: [
        {
          "tableName": "categoria",
          "data": [
            "nombre_categoria"
          ],
          "foreingKey": "id_categoria"
        }
      ],
    },
  },
};
