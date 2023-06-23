import axios from "axios";
import { realizarConsulta } from "../common/sqlite_config";
import { SubirAlonedrive } from "./onedrive";
import { Alert } from "react-native";

export const subidaBaseRemote = (tablaName, array1, array2) => {
  const url =
    "https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==";
  console.log("array1:", array1);
  console.log("array2:", array2);

  const requestBody = {
    typeQuery: "INSERT",
    data: {
      tableName: tablaName,
      fieldType: array1,
      fieldData: array2,
    },
  };

  fetch(url, {
    method: "POST",
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta:", data);
      // Aquí puedes procesar la respuesta recibida
    })
    .catch((error) => {
      console.error("Error:", error);
      Alert.alert(
        "Pérdida de conexión",
        "La sincronización de los datos ha fallado debido a una desconexión a internet. Por favor, vuelve a intentarlo cuando tengas una conexión estable"
      );
      // Aquí puedes manejar el error en caso de que ocurra
    });
};

export const subidaBaseRemoteTodaAuditoria = async (
  id_auditoria,
  fn,
  setRefresh,
  refresh
) => {
  const consultaAudit = await realizarConsulta(
    `SELECT id_auditoria,id_preciador,id_percha,id_promocion,id_sucursal,id_cliente,id_portafolio_auditoria,usuario_creacion,fecha_creacion FROM auditoria`
  );
  const consultaPromocion = await realizarConsulta(
    `SELECT s.*  FROM sucursal AS s INNER JOIN auditoria AS a ON a.id_sucursal = s.id_sucursal where a.id_auditoria='${id_auditoria}'`
  );
  console.log("RESULTADOS DE CONSULTA AUDITORIA: ", consultaAudit);
  const consulta = await realizarConsulta(
    `SELECT * FROM sucursal where id_sucursal='${id_auditoria}'`
  );
  console.log("RESULTADOS DE CONSULTA: ", consulta);
  console.log("ID_AUDITORIA: ", id_auditoria);
  console.log("RESULTADOS DE CONSULTA PROMOCION: ", consultaPromocion);

  const sucursalData = await realizarConsulta(
    `SELECT s.* 
    FROM sucursal AS s 
    INNER JOIN auditoria AS a ON a.id_sucursal = s.id_sucursal 
    WHERE a.id_auditoria ='${id_auditoria}'`
  );
  const promocionData = await realizarConsulta(
    `SELECT p.*  FROM promocion AS p INNER JOIN auditoria AS a ON a.id_promocion = p.id_promocion WHERE a.id_auditoria = '${id_auditoria}'`
  );

  console.log(
    "****************************ANALIZANDO PROMOCIONES*****************************************"
  );
  console.log(promocionData);
  console.log(
    "*****************************************************************************************"
  );
  for (let i = 0; i < promocionData.length; i++) {
    console.log(
      "###########################################################################"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 1: ",
      promocionData[i].url_imagen1
    );
    console.log(
      "###########################################################################"
    );
    if (promocionData[i].url_imagen1 === "undefined") {
      promocionData[i].url_imagen1 = "null";
    } else if (promocionData[i].url_imagen1 === "null") {
      promocionData[i].url_imagen1 = "null";
    } else {
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        promocionData[i].url_imagen1
      );
      promocionData[i].url_imagen1 = await SubirAlonedrive(
        promocionData[i].url_imagen1,
        "" +
          promocionData[i].id_promocion +
          "-" +
          promocionData[i].id_exhibidor +
          "-1"
      );
    }
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 2: ",
      promocionData[i].url_imagen2
    );
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    if (promocionData[i].url_imagen2 === "undefined") {
      promocionData[i].url_imagen2 = "null";
    } else if (promocionData[i].url_imagen2 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        promocionData[i].url_imagen2
      );
      promocionData[i].url_imagen2 = await SubirAlonedrive(
        promocionData[i].url_imagen2,
        "" +
          promocionData[i].id_promocion +
          "-" +
          promocionData[i].id_exhibidor +
          "-2"
      );
    }
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 3: ",
      promocionData[i].url_imagen3
    );
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    if (promocionData[i].url_imagen3 === "undefined") {
      promocionData[i].url_imagen3 = "null";
    } else if (promocionData[i].url_imagen3 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        promocionData[i].url_imagen3
      );
      promocionData[i].url_imagen3 = await SubirAlonedrive(
        promocionData[i].url_imagen3,
        "" +
          promocionData[i].id_promocion +
          "-" +
          promocionData[i].id_exhibidor +
          "-3"
      );
    }
  }
  console.log(
    "**************************** PROMOCIONES COMPLETO *****************************************"
  );
  console.log(promocionData);
  console.log(
    "*****************************************************************************************"
  );
  const perchaData = await realizarConsulta(
    `SELECT p.* from percha as p inner join auditoria as a on a.id_percha=p.id_percha where a.id_auditoria ='${id_auditoria}'`
  );

  console.log(
    "**************************** ANALIZANDO PERCHAS *****************************************"
  );
  console.log(perchaData);
  console.log(
    "*****************************************************************************************"
  );
  for (let i = 0; i < perchaData.length; i++) {
    console.log(
      "###########################################################################"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 1: ",
      perchaData[i].url_imagen1
    );
    console.log(
      "###########################################################################"
    );
    if (perchaData[i].url_imagen1 === "undefined") {
      perchaData[i].url_imagen1 = "null";
    } else if (
      perchaData[i].url_imagen1 === "null" ||
      perchaData[i].url_imagen1 === null
    ) {
      perchaData[i].url_imagen1 = "null";
    } else {
      console.log(
        "ID PERCHA 1: ",
        "" + perchaData[i].id_percha + "-" + perchaData[i].id_categoria
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log("URL ACTUAL * * * * * * ** * : ", perchaData[i].url_imagen1);
      perchaData[i].url_imagen1 = await SubirAlonedrive(
        perchaData[i].url_imagen1,
        "" + perchaData[i].id_percha + "-" + perchaData[i].id_categoria + "-1"
      );
    }
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    console.log("\nANALIZANDO REGISTRO - IMAGEN 2:", perchaData[i].url_imagen2);
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    if (perchaData[i].url_imagen2 === "undefined") {
      perchaData[i].url_imagen2 = "null";
    } else if (
      perchaData[i].url_imagen2 === "null" ||
      perchaData[i].url_imagen2 === null
    ) {
      perchaData[i].url_imagen2 = "null";
    } else {
      console.log(
        "ID PERCHA 2: ",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log("URL ACTUAL * * * * * * ** * : ", perchaData[i].url_imagen2);
      perchaData[i].url_imagen2 = await SubirAlonedrive(
        perchaData[i].url_imagen2,
        "" + perchaData[i].id_percha + "-" + perchaData[i].id_categoria + "-2"
      );
    }
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    console.log("\nANALIZANDO REGISTRO - IMAGEN 3", perchaData[i].url_imagen3);
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    if (perchaData[i].url_imagen3 === "undefined") {
      perchaData[i].url_imagen3 = "null";
    } else if (
      perchaData[i].url_imagen3 === "null" ||
      perchaData[i].url_imagen3 === null
    ) {
      perchaData[i].url_imagen3 = "null";
    } else {
      console.log(
        "ID PERCHA 3: ",
        "" + perchaData[i].id_percha + "-" + perchaData[i].id_categoria
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log("URL ACTUAL * * * * * * ** * : ", perchaData[i].url_imagen3);
      perchaData[i].url_imagen3 = await SubirAlonedrive(
        perchaData[i].url_imagen3,
        "" + perchaData[i].id_percha + "-" + perchaData[i].id_categoria + "-3"
      );
    }
  }
  console.log(
    "**************************** PERCHAS COMPLETO *****************************************"
  );
  console.log(perchaData);
  console.log(
    "*****************************************************************************************"
  );

  const portafolioData = await realizarConsulta(
    `SELECT DISTINCT p.* 
    FROM portafolio AS p
    INNER JOIN portafolio_auditoria AS pa ON pa.id_portafolio = p.id_portafolio
    INNER JOIN auditoria AS a ON a.id_portafolio_auditoria = pa.id_portafolio_auditoria
    WHERE a.id_auditoria = '${id_auditoria}' AND p.tipo = 'C'`
  );

  const portafolioDataModificado = portafolioData.map((item) => ({
    ...item,
    estado: true,
  }));

  const portafolio_auditoriaData = await realizarConsulta(
    `SELECT pa.* from portafolio_auditoria as pa inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria where a.id_auditoria ='${id_auditoria}'`
  );
  const preciadorData = await realizarConsulta(
    `SELECT p.* from preciador as p inner join auditoria as a on a.id_preciador=p.id_preciador where a.id_auditoria ='${id_auditoria}'`
  );

  console.log(
    "**************************** ANALIZANDO PRECIADOR *****************************************"
  );
  console.log(preciadorData);
  console.log(
    "*****************************************************************************************"
  );
  for (let i = 0; i < preciadorData.length; i++) {
    console.log(
      "###########################################################################"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 1: ",
      preciadorData[i].url_imagen1
    );
    console.log(
      "###########################################################################"
    );
    if (preciadorData[i].url_imagen1 === "undefined") {
      preciadorData[i].url_imagen1 = "null";
    } else if (preciadorData[i].url_imagen1 === "null") {
      preciadorData[i].url_imagen1 = "null";
    } else {
      console.log(
        "ID DE PRECIADOR 1:",
        "" + preciadorData[i].id_preciador + "-" + preciadorData[i].id_producto
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        preciadorData[i].url_imagen1
      );
      preciadorData[i].url_imagen1 = await SubirAlonedrive(
        preciadorData[i].url_imagen1,
        "" +
          preciadorData[i].id_preciador +
          "-" +
          preciadorData[i].id_producto +
          "-1"
      );
    }
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 2: ",
      preciadorData[i].url_imagen2
    );
    console.log(
      "///////////////////////////////////////////////////////////////////////////"
    );
    if (preciadorData[i].url_imagen2 === "undefined") {
      preciadorData[i].url_imagen2 = "null";
    } else if (preciadorData[i].url_imagen2 === "null") {
      preciadorData[i].url_imagen2 = "null";
    } else {
      console.log(
        "ID DE PRECIADOR 2:",
        "" + preciadorData[i].id_preciador + "-" + preciadorData[i].id_producto
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        preciadorData[i].url_imagen2
      );
      preciadorData[i].url_imagen2 = await SubirAlonedrive(
        preciadorData[i].url_imagen2,
        "" +
          preciadorData[i].id_preciador +
          "-" +
          preciadorData[i].id_producto +
          "-2"
      );
    }
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    console.log(
      "\nANALIZANDO REGISTRO - IMAGEN 3: ",
      preciadorData[i].url_imagen3
    );
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
    );
    if (preciadorData[i].url_imagen3 === "undefined") {
      preciadorData[i].url_imagen3 = "null";
    } else if (preciadorData[i].url_imagen3 === "null") {
      preciadorData[i].url_imagen3 = "null";
    } else {
      console.log(
        "ID DE PRECIADOR 3:",
        "" + preciadorData[i].id_preciador + "-" + preciadorData[i].id_producto
      );
      console.log("IMAGEN ENCONTRADA!!!!! - - - -- CREANDO URL-----------");
      console.log(
        "URL ACTUAL * * * * * * ** * : ",
        preciadorData[i].url_imagen3
      );
      preciadorData[i].url_imagen3 = await SubirAlonedrive(
        preciadorData[i].url_imagen3,
        "" +
          preciadorData[i].id_preciador +
          "-" +
          preciadorData[i].id_producto +
          "-3"
      );
    }
  }

  console.log(
    "**************************** PRECIADOR COMPLETO *****************************************"
  );
  console.log(preciadorData);
  console.log(
    "*****************************************************************************************"
  );

  const auditoriaData = await realizarConsulta(
    `SELECT *
     FROM auditoria 
     WHERE id_auditoria='${id_auditoria}'`
  );

  console.log("sucursalData:", sucursalData);
  console.log("promocionData:", promocionData);
  console.log("perchaData:", perchaData);
  console.log("portafolioData:", portafolioDataModificado);
  console.log("portafolio_auditoriaData:", portafolio_auditoriaData);
  console.log("preciadorData:", preciadorData);
  console.log("auditoriaData:", auditoriaData);

  const url =
    "https://fotoexito1.azurewebsites.net/api/functionSync?code=lssWxD8c3jE3ioCuvj-xR-9uNa54TCNgxHu7MgqCb4YOAzFuPimo3g==";

  const requestBody = {
    typeQuery: "SYNC",
    data: {
      sucursal: sucursalData,
      promocion: promocionData,
      percha: perchaData,
      portafolio: portafolioDataModificado,
      portafolio_auditoria: portafolio_auditoriaData,
      preciador: preciadorData,
      auditoria: auditoriaData,
    },
  };

  console.log(" * **  ** *  ** * * * * * * * * * * * * * * * * * * ");
  console.log("REQUEST BODY;: - - - ", requestBody);
  console.log(" * **  ** *  ** * * * * * * * * * * * * * * * * * * ");
  try {
    const resp = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(resp.data);
    console.log("REGISTRO INGRESADO CON EXITO?: ", resp.data.result);
    fn(false);
    if (resp.data.result) {
      console.log("CAMBIANDO ESTADO - - - -- - ");
      const stateAudit = await realizarConsulta(
        `UPDATE auditoria SET sincronizada=true
         WHERE id_auditoria='${id_auditoria}'`
      );
      console.log("respuesta de cambiar estado: ", stateAudit);
      setRefresh(!refresh);
      //console("CAMBIO EL ESTADO?  ", auditoriaData);
      Alert.alert("Auditoria registrada", "Auditoría registrada con éxito");
    } else {
      console.log("ERROR AL INSERTAR LOS DATOS - - - -- - ");
      fn(false);
      Alert.alert(
        "Error al registrar la auditoria",
        "No se ha podido registrar la auditoria en estos momentos, por favor vuelva a intentarlo"
      );
    }
  } catch (e) {
    console.log("ERROR DENTRO DE LA FUNCION: ", e.response.data.result);
    console.log("ERROR DENTRO DE LA FUNCION: ", e.response.data);
    fn(false);
    /*Alert.alert(
      "Error al registrar la auditoria a traves de la función",
      "Ha ocurrido un error inesperado al tratar de subir los datos a la base, por favor vuelva a intentarlo"
    );*/
  }
};
