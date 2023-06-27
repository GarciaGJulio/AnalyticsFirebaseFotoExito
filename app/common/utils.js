import uuid from "react-native-uuid";
import { es_EC as errors } from "./texts";
import { ValidacionCedulaRucService } from "./ValidationsIdentification";
const DATE_SEPARATOR = "/";
const STARTING_UII_KEY = "A000";
const DATE_HOUR_SEPARATOR = "-";
const HOUR_SEPARATOR = ":";
const PROVINCE_COUNT = 24;

export function to2Decimals(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
}
export function generateUIDD(start_key) {
  return (
    STARTING_UII_KEY + Math.random().toString(30).substring(6).toUpperCase()
  );
}
export function getActualDate() {
  const date = new Date();
  return (
    String(date.getDate()).padStart(2, "0") +
    DATE_SEPARATOR +
    String(date.getMonth() + 1).padStart(2, "0") +
    DATE_SEPARATOR +
    date.getFullYear() +
    DATE_HOUR_SEPARATOR +
    String(date.getHours()).padStart(2, "0") +
    HOUR_SEPARATOR +
    String(date.getMinutes()).padStart(2, "0") +
    HOUR_SEPARATOR +
    String(date.getSeconds()).padStart(2, "0")
  );
}
export function getActualDateStock() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    "T00:00:00.000Z"
  );
}

export function transfromrActualDateFormat(date, type) {
  try {
    if (type == "F") {
      let tempAllDate = date.split(" ");
      let tmpDate = tempAllDate[0];
      let tmpHour = tempAllDate[1];
      let tempSplitDate = tmpDate.split("/");
      let dateReady =
        tempSplitDate[2] +
        "-" +
        tempSplitDate[1] +
        "-" +
        tempSplitDate[0] +
        "T";
      let newDateReady = dateReady + tmpHour + ".000Z";
      // //console.log(
      //   "************---------------------************* FECHA FORMATEADA:    ",
      //   newDateReady
      // );
      return newDateReady;
    } else if (type == "R") {
      let tempAllDate = date.split("T");

      let tmpDate = tempAllDate[0];
      let tmpHour = tempAllDate[1];
      let tempSplitDate = tmpDate.split("-");
      let dateReady =
        tempSplitDate[2] +
        "/" +
        tempSplitDate[1] +
        "/" +
        tempSplitDate[0] +
        "-";
      let newDateReady = dateReady + tmpHour.replace(".000Z", "");
      return newDateReady;
    }
  } catch (e) {
    //console.log("error al parsear fecha", e);
    return new Date().toISOString();
  }
}

export const validateCedulaNumber = (cedula) => {
  //  var cedula = '0931811087';
  let result = {
    result: false,
    message: "",
  };
  //Preguntamos si la cedula consta de 10 digitos
  if (cedula.length == 10) {
    result.result = ValidacionCedulaRucService.esCedulaValida(cedula);
    if (ValidacionCedulaRucService.esCedulaValida(cedula)) {
      result.message = "";
    } else {
      result.message = "Cédula no válida";
    }
    return result;
  } else {
    result.message = errors.CI_LESS_THAN_TEN;
    result.result = false;
  }
  return result;
};

export const genrateItemIdWorld = (cedula) => {
  const tempId = uuid.v4();
  let tempIdSplit = tempId.split("-");
  let x = 0;
  tempIdSplit[tempIdSplit.length - 1] =
    cedula && cedula.length > 0 ? cedula : tempIdSplit[tempIdSplit.length - 1];
  let idGenerated = "";
  tempIdSplit.forEach((element) => {
    if (x == 0) {
      idGenerated +=
        element + getRandomNumber() + getRandomNumber() + getRandomNumber();
    } else {
      idGenerated += "-" + element;
    }
    x += 1;
  });
  return idGenerated;
};
function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}
export const fechaDeAyer = () => {
  let hoy = new Date();
  let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
  //let DIA_EN_MILISEGUNDOS=172800000;
  let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
  return ayer;
};
export const fechaDeAyerStock = () => {
  let hoy = new Date();
  let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
  //let DIA_EN_MILISEGUNDOS=172800000;
  let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
  return ayer;
};

export const generateOrderNumberId = (number, userId) => {
  let firstNumber = number + "";
  if (firstNumber.length == 1) {
    firstNumber = "0000" + firstNumber;
  } else if (firstNumber.length == 2) {
    firstNumber = "000" + firstNumber;
  } else if (firstNumber.length == 3) {
    firstNumber = "00" + firstNumber;
  } else if (firstNumber.length == 4) {
    firstNumber = "0" + firstNumber;
  } else if (firstNumber.length == 5) {
    firstNumber = firstNumber;
  } else {
    firstNumber = "0000" + firstNumber;
  }

  return userId + firstNumber;
};

export const validateNames = (nombre) => {
  try {
    let result = {
      result: false,
      message: "",
    };

    if (!nombre || nombre === "" || nombre.trim() == "") {
      result.message = errors.EMPTY_NAME;
      result.result = false;
      return result;
    } else {
      if (nombre.length > 40) {
        result.message = errors.MAX_LENGTH_40;
        result.result = false;
        return result;
      } else {
        result.message = "";
        result.result = true;
        return result;
      }
    }
  } catch (e) {
    //console.log("error al validar", e);
  }
};

export const validateIdentificationNumber = (identificacion) => {
  try {
    let result = {
      result: false,
      message: "",
    };
    if (identificacion.length > 10) {
      if (identificacion.length !== 13) {
        result.message = errors.RUC_INVALID_LENGTH;
        result.result = false;
        return result;
      }
      var digito_region = parseInt(identificacion.substring(0, 2));
      ////console.log(digito_region);
      if (digito_region < 1 || digito_region > PROVINCE_COUNT) {
        result.message = errors.RUC_FIRST_2_DIGITS_GR_24;
        result.result = false;
        return result;
      }
      if (!identificacion.endsWith("001")) {
        result.message = errors.RUC_DOES_NOT_END_WITH_001;
        result.result = false;
        return result;
      }
      var d1, d2, d3, d4, d5, d6, d7, d8, d9, d10;
      d1 = parseInt(identificacion.substr(0, 1));
      d2 = parseInt(identificacion.substr(1, 1));
      d3 = parseInt(identificacion.substr(2, 1));
      d4 = parseInt(identificacion.substr(3, 1));
      d5 = parseInt(identificacion.substr(4, 1));
      d6 = parseInt(identificacion.substr(5, 1));
      d7 = parseInt(identificacion.substr(6, 1));
      d8 = parseInt(identificacion.substr(7, 1));
      d9 = parseInt(identificacion.substr(8, 1));
      d10 = parseInt(identificacion.substr(9, 1));

      if (d3 == 7 || d3 == 8) {
        result.message = errors.RUC_INVALID_TYPE;
        result.result = false;
        return result;
      }
      let modulo = 11;
      var pri = false;
      var pub = false;
      var nat = false;
      var p1, p2, p3, p4, p5, p6, p7, p8, p9;
      /* para personas naturales modulo 10 */
      if (d3 < 6) {
        nat = true;
        p1 = d1 * 2;
        if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1;
        if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2;
        if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1;
        if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2;
        if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1;
        if (p6 >= 10) p6 -= 9;
        p7 = d7 * 2;
        if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1;
        if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2;
        if (p9 >= 10) p9 -= 9;
        modulo = 10;
      } else if (d3 == 6) {
        /* para sociedades publicas modulo 11 */
        /* digito verficador posicion 9, en las otras 2 en la pos. 10 */
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
      } /*  para entidades privadas modulo 11 */ else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
      }
      var total = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
      var residuo = total % modulo;
      var digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

      if (pub == true) {
        if (digitoVerificador != d9) {
          result.message = errors.RUC_INVALID_PUBLIC;
          result.result = false;
          return result;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (identificacion.substr(9, 4) != "0001") {
          result.message = errors.RUC_INVALID_PUBLIC_0001;
          result.result = false;
          return result;
        }
        ////console.log("RUC público válido ", identificacion);
      } else if (pri == true) {
        if (digitoVerificador != d10) {
          result.message = errors.RUC_INVALID;
          result.result = false;
          return result;
        }
        ////console.log("RUC privado válido ", identificacion);
      } else if (nat == true) {
        if (digitoVerificador != d10) {
          result.message = errors.RUC_INVALID;
          result.result = false;
          return result;
        }
        ////console.log("RUC persona natural válido ", identificacion);
      }
      result.message = "";
      result.result = true;
      return result;
    } else {
      result.message = validateCedulaNumber(identificacion).message;
      result.result = validateCedulaNumber(identificacion).result;
      return result;
    }
  } catch (e) {
    //console.log("error al validar la identificacion", e);
  }
};

export const validateStrangeRuc = (ruc) => {
  let result = {
    result: false,
    message: "",
  };
  try {
    if (ruc.length != 13) {
      result.message = errors.RUC_INVALID;
      result.result = false;
      return result;
    }
    if (!ruc.endsWith("001")) {
      result.message = errors.RUC_INVALID;
      result.result = false;
      return result;
    }
    let numProvice = parseInt(ruc.substring(0, 2));
    //console.log("codigo de proicivnia--", numProvice);
    if (numProvice <= 0 || numProvice > 24) {
      result.message = errors.RUC_INVALID;
      result.result = false;
      return result;
    }
    if (ruc.charAt(2) != 6 && ruc.charAt(2) != 9) {
      result.message = errors.RUC_INVALID;
      result.result = false;
      return result;
    }
    result.message = "";
    result.result = true;
    return result;
  } catch (e) {
    //console.log("error al validar la identificacion", e);
    result.message = errors.RUC_INVALID;
    result.result = false;
    return result;
  }
};

export const validateDirection = (direccion) => {
  try {
    let result = {
      result: false,
      message: "",
    };

    if (!direccion || direccion === "" || direccion.trim() == "") {
      result.message = errors.EMPTY_ADDRESS;
      result.result = false;
      return result;
    } else {
      if (direccion.length > 80) {
        result.message = errors.MAX_LENGTH_80;
        result.result = false;
        return result;
      } else {
        result.message = "";
        result.result = true;
        return result;
      }
    }
  } catch (e) {
    //console.log("error al validar la identificacion", e);
  }
};

export const validatePhoneNumber = (telefono) => {
  try {
    let result = {
      result: false,
      message: "",
    };
    ////console.log(telefono.length);
    if (!telefono) {
      result.message = errors.EMPTY_PHONE;
      result.result = false;
      return result;
    }
    if (telefono.length < 9) {
      result.message = errors.MIN_LENGTH_9;
      result.result = false;
      return result;
    }
    if (telefono.length > 10) {
      result.message = errors.MAX_LENGTH_10;
      result.result = false;
      return result;
    }
    if (
      telefono.length == 9 &&
      !telefono.startsWith("02") &&
      !telefono.startsWith("03") &&
      !telefono.startsWith("04") &&
      !telefono.startsWith("05") &&
      !telefono.startsWith("06") &&
      !telefono.startsWith("07")
    ) {
      result.message = errors.STARTS_WITH_PROVINCE_CODE;
      result.result = false;
      return result;
    }

    if (telefono.length == 10 && !telefono.startsWith("09")) {
      result.message = errors.STARTS_WITH_09;
      result.result = false;
      return result;
    }
    result.message = "";
    result.result = true;
    return result;
  } catch (e) {
    //console.log("error al validar la identificacion", e);
  }
};
