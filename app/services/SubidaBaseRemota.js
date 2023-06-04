import { realizarConsulta } from "../common/sqlite_config";



export const subidaBaseRemote = (tablaName, array1, array2) => {
    const url = 'https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==';
    console.log("array1:", array1)
    console.log("array2:", array2)

    const requestBody = {
        typeQuery: 'INSERT',
        data: {
            tableName: tablaName,
            fieldType: array1,
            fieldData: array2
        }
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta:', data);
            // Aquí puedes procesar la respuesta recibida
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar el error en caso de que ocurra
        });


}



export const subidaBaseRemoteTodaAuditoria = async () => {
    // const url = 'https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==';
    // console.log("array1:", array1)
    // console.log("array2:", array2)

    // realizarConsulta("select * from sucursal")r


    const resultadoConsultaSucursal = await realizarConsulta("SELECT * FROM sucursal ORDER BY fecha_creacion DESC LIMIT 1;")
    console.log("SucursalPorEnviar:", resultadoConsultaSucursal[0])

    // const resultadoConsultaPromocion = await realizarConsulta("SELECT * from auditoria as a inner join promocion as p on p.id_promocion = a.id_promocion where a.id_auditoria=(SELECT a.id_auditoria  FROM auditoria ORDER BY fecha_creacion  DESC LIMIT 1)")

    // const resultadoConsultaPromocion = await realizarConsulta("SELECT * from auditoria as a inner join promocion as p on p.id_promocion = a.id_promocion ")
    const resultadoConsultaPromocion2 = await realizarConsulta("SELECT id_promocion from promocion")
    const resultadoConsultaPromocion3 = await realizarConsulta("SELECT id_promocion from auditoria ORDER BY fecha_creacion DESC LIMIT 1")

    // const resultadoConsultaPromocion = await realizarConsulta("SELECT id_auditoria  FROM auditoria ORDER BY fecha_creacion  DESC LIMIT 1")

    console.log("SucursalPorEnviar:", resultadoConsultaPromocion3)
    console.log("SucursalPorEnviar:", resultadoConsultaPromocion2)























    const url = "https://fotoexito1.azurewebsites.net/api/syncAllDataMobile?code=5iWwsyCDEC4IuFK8HgyfnC4DBpm4w_Trf75AwVSdJvGEAzFuezSbSg=="

    const requestBody = {
        typeQuery: 'INSERT',


        "data": {
            "sucursal": {
                "sucursalColumnName": [
                    "fecha_creacion",
                    "fecha_modificacion",
                    "id_sucursal",
                    "latitud",
                    "longitud",
                    "nombre_sucursal",
                    "usuario_creacion"
                ],
                "sucursalData": resultadoConsultaSucursal[0]
            },
            "promocion": {
                "promocionColumnName": [
                    "id_promocion",
                    "id_exhibidor",
                    "estado_promocion",
                    "url_imagen1",
                    "url_imagen2",
                    "url_imagen3"
                ],
                "promocionData": resultadoConsultaPromocion2
            },
            "percha": {
                "perchaColumnName": [
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
                "perchaData": [
                    "'PRCH013'",
                    "'CAT001-SA63'",
                    1,
                    40,
                    30,
                    "''",
                    "''",
                    "''",
                    "'usuario1'",
                    "GETDATE()",
                    "'2023-05-29T17:14:44.347Z'"
                ]
            },
            "portafolio": {
                "portafolioColumnName": [
                    "id_portafolio",
                    "id_producto",
                    "id_grupo_cliente",
                    "tipo"
                ],
                "portafolioData": [
                    "'PRT009'",
                    "'100446'",
                    "'12'",
                    "'C'"
                ]
            },
            "portafolio_auditoria": {
                "portafolio_auditoriaColumnName": [
                    "id_portafolio_auditoria",
                    "id_portafolio",
                    "id_producto"
                ],
                "portafolio_auditoriaData": [
                    "'POC016-AA04'",
                    "'1'",
                    "'100446'"
                ]
            },
            "preciador": {
                "preciadorColumnName": [
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
                    "fecha_modificacion"
                ],
                "preciadorData": [
                    "'6'",
                    "'1'",
                    "'100446'",
                    19.989999771118164,
                    1,
                    "''",
                    "''",
                    "''",
                    "'usuario1'",
                    "'2023-05-29T17:33:19.033Z'",
                    "'2023-05-29T17:33:19.033Z'"
                ]
            },
            "auditoria": {
                "auditoriaColumnName": [
                    "id_auditoria",
                    "id_preciador",
                    "id_percha",
                    "id_promocion",
                    "id_sucursal",
                    "id_cliente",
                    "id_portafolio_auditoria"
                ],
                "auditoriaData": [
                    "'AUD03'",
                    "'2'",
                    "'3'",
                    "'2'",
                    "'c1cccbf2-c853-4aa4-b87c-c07ef1eb1aca'",
                    "'101746'",
                    "'PA001'"
                ]
            }



        }
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta:', data);
            // Aquí puedes procesar la respuesta recibida
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar el error en caso de que ocurra
        });


}