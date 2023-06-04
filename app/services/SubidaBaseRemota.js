import { realizarConsulta } from "../common/sqlite_config";

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
  const sucursalData = await realizarConsulta(
    "SELECT s.* from sucursal as s inner join auditoria as a on a.id_sucursal=s.id_sucursal"
  ); // where a.id_auditoria = id_auditoria");

  const promocionData = await realizarConsulta(
    "SELECT p.* from promocion as p inner join auditoria as a on a.id_promocion=p.id_promocion"
  ); // where a.id_auditoria ="+ id_auditoria");

  console.log("-----------completoPromo", promocionData);
  for (let i = 0; i < promocionData.length; i++) {
    console.log("objeto  promocion", promocionData[i]);
  }
  const perchaData = await realizarConsulta(
    "SELECT p.* from percha as p inner join auditoria as a on a.id_percha=p.id_percha"
  ); // where a.id_auditoria ="+ id_auditoria");
  const portafolioData = await realizarConsulta(
    "SELECT p.* from portafolio as p inner join portafolio_auditoria as pa on pa.id_portafolio=p.id_portafolio inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria"
  ); // where a.id_auditoria ="+ id_auditoria");
  const portafolio_auditoriaData = await realizarConsulta(
    "SELECT pa.* from portafolio_auditoria as pa inner join auditoria as a on a.id_portafolio_auditoria=pa.id_portafolio_auditoria"
  ); // where a.id_auditoria ="+ id_auditoria");
  const preciadorData = await realizarConsulta(
    "SELECT p.* from preciador as p inner join auditoria as a on a.id_preciador=p.id_preciador"
  ); // where a.id_auditoria ="+ id_auditoria");
  const auditoriaData = await realizarConsulta("SELECT * from auditoria"); // where id_auditoria ="+ id_auditoria);

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

  // fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  // })
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log('Respuesta:', data);
  //         // Aquí puedes procesar la respuesta recibida
  //     })
  //     .catch(error => {
  //         console.error('Error:', error);
  //         // Aquí puedes manejar el error en caso de que ocurra
  //     });
};
