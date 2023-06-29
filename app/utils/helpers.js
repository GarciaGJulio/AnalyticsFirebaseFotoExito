export const validateNameBranch2 = (name, fn) => {
  if (name == "" || name == null) {
    //console.log("INFO name INVALIDA");
    fn("El campo sucursal  no puede estar vacio");
  } else {
    if (name.length < 5) {
      fn("El campo sucursal no puede tener 4 o menos dígitos");
    } else {
      let regex = new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/);
      if (!regex.test(name)) {
        //console.log("Nombre de sucursal no valido");
        fn(
          "El campo sucursal de sucursal no puede contener caracteres especiales o espacios al final"
        );
        return false;
      } else {
        //console.log(" - - - - Nombre de sucursal valido");
        fn("");
      }
    }
  }
};

export const validateNameBranch = (name, fn) => {
  if (name.trim() === "") {
    fn("El campo sucursal no puede estar vacío");
  } else if (/([A-Za-z0-9])\1\1/.test(name)) {
    fn(
      "El campo sucursal no puede contener tres caracteres consecutivos iguales"
    );
  } else if (/[a-z]/.test(name)) {
    fn("El campo sucursal no puede contener caracteres en minúsculas");
  } else if (/\s$/.test(name)) {
    fn("El campo sucursal no puede tener espacios al final");
  } else {
    fn("");
  }
};

const handleInputChange = (text) => {
  setInputValue(text);
  const number = parseFloat(text);
  if (number < 999.99) {
    //console.log("El número es menor a 999.99");
  } else {
    //console.log("El número es igual o mayor a 999.99");
  }
};

export const validatePriceProduct = (pr, fn) => {
  const number = parseFloat(pr.replace("$", ""));
  const price = pr.replace("$", "");
  const priceRegex = /^\d+(\.\d{0,2})?$/;

  // Resto de las validaciones
  if (price === "" || price === null) {
    fn("El campo precio del producto no puede estar vacío");
  } else if (!priceRegex.test(number)) {
    fn("El precio del producto no es un formato válido");
  } else if (price.indexOf(".") !== price.lastIndexOf(".")) {
    fn("El precio del producto no es un formato válido");
  } else if (/[^\d.]/.test(price)) {
    fn("Caracteres no permitidos");
  } else {
    if (isNaN(number)) {
      fn("El precio no es un número válido");
    } else if (number <= 0) {
      fn("El número debe ser mayor o igual a 0");
    } else if (number > 999.99) {
      fn("El número debe ser menor o igual a 999.99");
    } else {
      fn(""); // Precio válido, no hay errores
    }
  }
};

export const validatePercha = (value, fn) => {
  if (value === "" || value === null) {
    const errorMessageStyle = { color: "red" };
    fn("El campo número de caras no puede estar vacío", errorMessageStyle);
  } else {
    const regex = /^(?!0[0-9])\d+$/;
    if (!regex.test(value)) {
      const errorMessageStyle = { color: "red" };
      fn(
        "El campo número de caras debe ser un número entero sin ceros a la izquierda",
        errorMessageStyle
      );
    } else {
      const number = parseInt(value, 10);
      if (number < 0 || number > 999) {
        const errorMessageStyle = { color: "red" };
        fn(
          "El campo número de caras debe estar entre 0 y 999",
          errorMessageStyle
        );
      } else {
        fn("", null); // No hay error, se pasa un estilo nulo
      }
    }
  }
};
