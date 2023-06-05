import { realizarConsulta } from "../common/sqlite_config";
import { SubirAlonedrive } from "./onedrive";

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
    body: JSON.stringify(requestBody),
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
      // Aquí puedes manejar el error en caso de que ocurra
    });
};

export const subidaBaseRemoteTodaAuditoria = async (id_auditoria) => {
  // const url = 'https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==';
  // console.log("array1:", array1)
  // console.log("array2:", array2)

  // realizarConsulta("select * from sucursal")r

  //
  const consultaAudit = await realizarConsulta(`SELECT * FROM auditoria`);
  const consultaPromocion = await realizarConsulta(
    `SELECT s.*  FROM sucursal AS s INNER JOIN auditoria AS a ON a.id_sucursal = s.id_sucursal where a.id_auditoria='${id_auditoria}'`
  );
  console.log("RESULTADOS DE CONSULTA AUDITORIA: ", consultaAudit);
  const consulta = await realizarConsulta(
    `SELECT * FROM sucursal where id_sucursal='4325b6f6-b5b5-40ba-9978-75d833388d7b'`
  );
  console.log("RESULTADOS DE CONSULTA: ", consulta);
  console.log("ID_AUDITORIA: ", id_auditoria);
  console.log("RESULTADOS DE CONSULTA PROMOCION: ", consultaPromocion);
  const sucursalData = await realizarConsulta(
    `SELECT s.* 
    FROM sucursal AS s 
    INNER JOIN auditoria AS a ON a.id_sucursal = s.id_sucursal 
    WHERE a.id_auditoria ='4325b6f6-b5b5-40ba-9978-75d833388d7b'`
  );
  const promocionData = await realizarConsulta(
    `SELECT s.*  FROM sucursal AS s INNER JOIN auditoria AS a ON a.id_sucursal = s.id_sucursal WHERE a.id_auditoria = '${id_auditoria}'`
  );

  console.log("-----------completoPromo", promocionData);
  for (let i = 0; i < promocionData.length; i++) {
    console.log("objeto img1  promocion", promocionData[i].url_imagen1);
    if (promocionData[i].url_imagen1 === "undefined") {
      promocionData[i].url_imagen1 = "null";
    } else if (promocionData[i].url_imagen1 === "null") {
      promocionData[i].url_imagen1 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen1,
          promocionData[i].url_imagen1,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen2 = await SubirAlonedrive(
        promocionData[i].url_imagen1,
        promocionData[i].url_imagen1,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
    console.log("objeto  img 2 promocion", promocionData[i].url_imagen2);
    if (promocionData[i].url_imagen2 === "undefined") {
      promocionData[i].url_imagen2 = "null";
    } else if (promocionData[i].url_imagen2 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen2,
          promocionData[i].url_imagen2,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen2 = await SubirAlonedrive(
        promocionData[i].url_imagen2,
        promocionData[i].url_imagen2,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
    console.log("objeto  img3 promocion", promocionData[i].url_imagen3);
    if (promocionData[i].url_imagen3 === "undefined") {
      promocionData[i].url_imagen3 = "null";
    } else if (promocionData[i].url_imagen3 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen3,
          promocionData[i].url_imagen3,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen3 = await SubirAlonedrive(
        promocionData[i].url_imagen3,
        promocionData[i].url_imagen3,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
  }
  console.log("-----------completoPromodepuesFOR", promocionData);
  const perchaData = await realizarConsulta(
    `SELECT p.* from percha as p inner join auditoria as a on a.id_percha=p.id_percha where a.id_auditoria ='${id_auditoria}'`
  );

  console.log("-----------completoPromo", perchaData);
  for (let i = 0; i < perchaData.length; i++) {
    console.log("objeto img1  promocion", perchaData[i].url_imagen1);
    if (perchaData[i].url_imagen1 === "undefined") {
      perchaData[i].url_imagen1 = "null";
    } else if (perchaData[i].url_imagen1 === "null") {
      perchaData[i].url_imagen1 = "null";
    } else {
      console.log(
        "id percha1:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen1,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen1 = await SubirAlonedrive(
        perchaData[i].url_imagen1,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img 2 promocion", perchaData[i].url_imagen2);
    if (perchaData[i].url_imagen2 === "undefined") {
      perchaData[i].url_imagen2 = "null";
    } else if (perchaData[i].url_imagen2 === "null") {
      perchaData[i].url_imagen2 = "null";
    } else {
      console.log(
        "id percha2:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen2,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen2 = SubirAlonedrive(
        perchaData[i].url_imagen2,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img3 promocion", perchaData[i].url_imagen3);
    if (perchaData[i].url_imagen3 === "undefined") {
      perchaData[i].url_imagen3 = "null";
    } else if (perchaData[i].url_imagen3 === "null") {
      perchaData[i].url_imagen3 = "null";
    } else {
      console.log(
        "id percha3:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen3,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen3 = SubirAlonedrive(
        perchaData[i].url_imagen3,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
  }
  console.log("-----------completoPerchadepuesFOR", perchaData);

  const portafolioData = await realizarConsulta(
    `SELECT p.* from portafolio as p inner join portafolio_auditoria as pa on pa.id_portafolio=p.id_portafolio inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria where a.id_auditoria ='${id_auditoria}'`
  );
  const portafolio_auditoriaData = await realizarConsulta(
    `SELECT pa.* from portafolio_auditoria as pa inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria where a.id_auditoria ='${id_auditoria}'`
  );
  const preciadorData = await realizarConsulta(
    `SELECT p.* from preciador as p inner join auditoria as a on a.id_preciador=p.id_preciador where a.id_auditoria ='${id_auditoria}'`
  );

  console.log("-----------completoPromo", preciadorData);
  for (let i = 0; i < preciadorData.length; i++) {
    console.log("objeto img1  promocion", preciadorData[i].url_imagen1);
    if (preciadorData[i].url_imagen1 === "undefined") {
      preciadorData[i].url_imagen1 = "null";
    } else if (preciadorData[i].url_imagen1 === "null") {
      preciadorData[i].url_imagen1 = "null";
    } else {
      console.log(
        "id percha1:",
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          preciadorData[i].url_imagen1,
          "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
        )
      );
      preciadorData[i].url_imagen1 = await SubirAlonedrive(
        preciadorData[i].url_imagen1,
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
    }
    console.log("objeto  img 2 promocion", preciadorData[i].url_imagen2);
    if (preciadorData[i].url_imagen2 === "undefined") {
      preciadorData[i].url_imagen2 = "null";
    } else if (preciadorData[i].url_imagen2 === "null") {
      preciadorData[i].url_imagen2 = "null";
    } else {
      console.log(
        "id percha2:",
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          preciadorData[i].url_imagen2,
          "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
        )
      );
      preciadorData[i].url_imagen2 = SubirAlonedrive(
        preciadorData[i].url_imagen2,
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
    }
    console.log("objeto  img3 promocion", preciadorData[i].url_imagen3);
    if (preciadorData[i].url_imagen3 === "undefined") {
      preciadorData[i].url_imagen3 = "null";
    } else if (preciadorData[i].url_imagen3 === "null") {
      preciadorData[i].url_imagen3 = "null";
    } else {
      console.log(
        "id percha3:",
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          preciadorData[i].url_imagen3,
          "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
        )
      );
      preciadorData[i].url_imagen3 = SubirAlonedrive(
        preciadorData[i].url_imagen3,
        "" + preciadorData[i].id_categoria + "-" + preciadorData[i].id_percha
      );
    }
  }
  console.log("-----------completoPerchadepuesFOR", preciadorData);

  const auditoriaData = await realizarConsulta(
    "SELECT  id_auditoria,id_preciador,id_percha,id_promocion,id_sucursal,id_cliente,id_portafolio_auditoria from auditoria"
  ); // where id_auditoria ="+ id_auditoria);

  console.log("sucursalData:", sucursalData);
  console.log("promocionData:", promocionData);
  console.log("perchaData:", perchaData);
  console.log("portafolioData:", portafolioData);
  console.log("portafolio_auditoriaData:", portafolio_auditoriaData);
  console.log("preciadorData:", preciadorData);
  console.log("auditoriaData:", auditoriaData);

  const url =
    "https://fotoexito1.azurewebsites.net/api/syncAllDataMobile?code=5iWwsyCDEC4IuFK8HgyfnC4DBpm4w_Trf75AwVSdJvGEAzFuezSbSg==";

  const requestBody = {
    data: {
      sucursal: sucursalData,
      promocion: promocionData,
      percha: perchaData,
      portafolio: portafolioData,
      portafolio_auditoria: portafolio_auditoriaData,
      preciador: preciadorData,
      auditoria: auditoriaData,
    },
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
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
      // Aquí puedes manejar el error en caso de que ocurra
    });
};

///falta el where de sincronizada
export const subidaBaseRemoteTodaAuditoria2 = async (id_auditoria) => {
  // const url = 'https://fotoexito1.azurewebsites.net/api/functionGeneral?code=PfkH6TT2D6DBtUdFhK5lHf2-7Z62TpVnNL6_Z4Oz8KY_AzFucJZ_Vg==';
  // console.log("array1:", array1)
  // console.log("array2:", array2)

  // realizarConsulta("select * from sucursal")r

  //
  const sucursalData = await realizarConsulta(
    "SELECT s.* from sucursal as s inner join auditoria as a on a.id_sucursal=s.id_sucursal"
  ); // where a.id_auditoria = id_auditoria");

  const promocionData = await realizarConsulta(
    "SELECT p.* from promocion as p inner join auditoria as a on a.id_promocion=p.id_promocion"
  ); // where a.id_auditoria ="+ id_auditoria");

  console.log("-----------completoPromo", promocionData);
  for (let i = 0; i < promocionData.length; i++) {
    console.log("objeto img1  promocion", promocionData[i].url_imagen1);
    if (promocionData[i].url_imagen1 === "undefined") {
      promocionData[i].url_imagen1 = "null";
    } else if (promocionData[i].url_imagen1 === "null") {
      promocionData[i].url_imagen1 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen1,
          promocionData[i].url_imagen1,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen2 = await SubirAlonedrive(
        promocionData[i].url_imagen1,
        promocionData[i].url_imagen1,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
    console.log("objeto  img 2 promocion", promocionData[i].url_imagen2);
    if (promocionData[i].url_imagen2 === "undefined") {
      promocionData[i].url_imagen2 = "null";
    } else if (promocionData[i].url_imagen2 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen2,
          promocionData[i].url_imagen2,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen2 = await SubirAlonedrive(
        promocionData[i].url_imagen2,
        promocionData[i].url_imagen2,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
    console.log("objeto  img3 promocion", promocionData[i].url_imagen3);
    if (promocionData[i].url_imagen3 === "undefined") {
      promocionData[i].url_imagen3 = "null";
    } else if (promocionData[i].url_imagen3 === "null") {
      promocionData[i].url_imagen2 = "null";
    } else {
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          promocionData[i].url_imagen3,
          promocionData[i].url_imagen3,
          "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
        )
      );
      promocionData[i].url_imagen3 = await SubirAlonedrive(
        promocionData[i].url_imagen3,
        promocionData[i].url_imagen3,
        "" + promocionData[i].id_promocion + "-" + "id_exhibidor"
      );
    }
  }
  console.log("-----------completoPromodepuesFOR", promocionData);
  const perchaData = await realizarConsulta(
    "SELECT p.* from percha as p inner join auditoria as a on a.id_percha=p.id_percha"
  ); // where a.id_auditoria ="+ id_auditoria");

  console.log("-----------completoPromo", perchaData);
  for (let i = 0; i < perchaData.length; i++) {
    console.log("objeto img1  promocion", perchaData[i].url_imagen1);
    if (perchaData[i].url_imagen1 === "undefined") {
      perchaData[i].url_imagen1 = "null";
    } else if (perchaData[i].url_imagen1 === "null") {
      perchaData[i].url_imagen1 = "null";
    } else {
      console.log(
        "id percha1:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen1,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen1 = await SubirAlonedrive(
        perchaData[i].url_imagen1,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img 2 promocion", perchaData[i].url_imagen2);
    if (perchaData[i].url_imagen2 === "undefined") {
      perchaData[i].url_imagen2 = "null";
    } else if (perchaData[i].url_imagen2 === "null") {
      perchaData[i].url_imagen2 = "null";
    } else {
      console.log(
        "id percha2:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen2,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen2 = SubirAlonedrive(
        perchaData[i].url_imagen2,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img3 promocion", perchaData[i].url_imagen3);
    if (perchaData[i].url_imagen3 === "undefined") {
      perchaData[i].url_imagen3 = "null";
    } else if (perchaData[i].url_imagen3 === "null") {
      perchaData[i].url_imagen3 = "null";
    } else {
      console.log(
        "id percha3:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen3,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen3 = SubirAlonedrive(
        perchaData[i].url_imagen3,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
  }
  console.log("-----------completoPerchadepuesFOR", perchaData);

  const portafolioData = await realizarConsulta(
    "SELECT p.* from portafolio as p inner join portafolio_auditoria as pa on pa.id_portafolio=p.id_portafolio inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria"
  ); // where a.id_auditoria ="+ id_auditoria");
  const portafolio_auditoriaData = await realizarConsulta(
    "SELECT pa.* from portafolio_auditoria as pa inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria"
  ); // where a.id_auditoria ="+ id_auditoria");
  const preciadorData = await realizarConsulta(
    "SELECT p.* from preciador as p inner join auditoria as a on a.id_preciador=p.id_preciador"
  ); // where a.id_auditoria ="+ id_auditoria");

  console.log("-----------completoPromo", perchaData);
  for (let i = 0; i < perchaData.length; i++) {
    console.log("objeto img1  promocion", perchaData[i].url_imagen1);
    if (perchaData[i].url_imagen1 === "undefined") {
      perchaData[i].url_imagen1 = "null";
    } else if (perchaData[i].url_imagen1 === "null") {
      perchaData[i].url_imagen1 = "null";
    } else {
      console.log(
        "id percha1:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen1,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen1 = await SubirAlonedrive(
        perchaData[i].url_imagen1,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img 2 promocion", perchaData[i].url_imagen2);
    if (perchaData[i].url_imagen2 === "undefined") {
      perchaData[i].url_imagen2 = "null";
    } else if (perchaData[i].url_imagen2 === "null") {
      perchaData[i].url_imagen2 = "null";
    } else {
      console.log(
        "id percha2:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen2,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen2 = SubirAlonedrive(
        perchaData[i].url_imagen2,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
    console.log("objeto  img3 promocion", perchaData[i].url_imagen3);
    if (perchaData[i].url_imagen3 === "undefined") {
      perchaData[i].url_imagen3 = "null";
    } else if (perchaData[i].url_imagen3 === "null") {
      perchaData[i].url_imagen3 = "null";
    } else {
      console.log(
        "id percha3:",
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
      console.log(
        "URLProvisional",
        await SubirAlonedrive(
          perchaData[i].url_imagen3,
          "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
        )
      );
      perchaData[i].url_imagen3 = SubirAlonedrive(
        perchaData[i].url_imagen3,
        "" + perchaData[i].id_categoria + "-" + perchaData[i].id_percha
      );
    }
  }
  console.log("-----------completoPerchadepuesFOR", perchaData);

  const auditoriaData = await realizarConsulta(
    "SELECT  id_auditoria,id_preciador,id_percha,id_promocion,id_sucursal,id_cliente,id_portafolio_auditoria from auditoria"
  ); // where id_auditoria ="+ id_auditoria);

  console.log("sucursalData:", sucursalData);
  console.log("promocionData:", promocionData);
  console.log("perchaData:", perchaData);
  console.log("portafolioData:", portafolioData);
  console.log("portafolio_auditoriaData:", portafolio_auditoriaData);
  console.log("preciadorData:", preciadorData);
  console.log("auditoriaData:", auditoriaData);

  const url =
    "https://fotoexito1.azurewebsites.net/api/syncAllDataMobile?code=5iWwsyCDEC4IuFK8HgyfnC4DBpm4w_Trf75AwVSdJvGEAzFuezSbSg==";

  const requestBody = {
    data: {
      sucursal: sucursalData,
      promocion: promocionData,
      percha: perchaData,
      portafolio: portafolioData,
      portafolio_auditoria: portafolio_auditoriaData,
      preciador: preciadorData,
      auditoria: auditoriaData,
    },
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
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
      // Aquí puedes manejar el error en caso de que ocurra
    });
};
