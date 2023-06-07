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
      foreingFields: [],
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
        "id_grupo_cliente",
        "nombre_grupo_cliente",
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
        "url_imagen3",
      ],
      foreingFields: [],
    },
    portafolio_auditoria: {
      data: ["id_portafolio_auditoria", "id_portafolio", "id_producto"],
      foreingFields: [],
    },
    portafolio: {
      data: ["id_portafolio", "id_producto", "id_grupo_cliente", "tipo"],
      foreingFields: [],
    },
    auditoria: {
      data: [
        "id_auditoria",
        "id_preciador",
        "id_percha",
        "id_promocion",
        "id_sucursal",
        "id_cliente",
        "usuario_creacion",
        "fecha_creacion",
      ],
      foreingFields: [
        {
          tableName: "cliente",
          data: ["nombre_cliente"],
          foreingKey: "id_cliente",
        },
        {
          tableName: "cliente",
          data: ["nombre_grupo_cliente"],
          foreingKey: "id_cliente",
        },
        {
          tableName: "sucursal",
          data: ["nombre_sucursal"],
          foreingKey: "id_sucursal",
        },
      ],
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
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    preciador: {
      data: [
        "id_preciador",
        "id_portafolio",
        "id_producto",
        "precio",
        "estado",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3",
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
        "ano_exhibidor",
        "mes_exhibidor",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
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
        "nombre_producto",
        "url_imagen_producto",
        "precio",
        "usuario_creacion",
        "fecha_creacion",
        "fecha_modificacion",
      ],
      foreingFields: [],
    },
    planograma: {
      data: [
        "id_planograma",
        "id_categoria",
        "id_grupo_cliente",
        "url_imagen1",
        "url_imagen2",
        "url_imagen3",
      ],
      foreingFields: [
        {
          tableName: "categoria",
          data: ["nombre_categoria"],
          foreingKey: "id_categoria",
        },
      ],
    },
  },
};
