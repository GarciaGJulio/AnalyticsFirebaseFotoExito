export const validateNameBranch2 = (name, fn) => {
  if (name == "" || name == null) {
    console.log("INFO name INVALIDA");
    fn("El campo nombre  no puede estar vacio");
  } else {
    if (name.length < 8) {
      fn("El campo nombre no puede tener 8 o menos dígitos");
    } else {
      let regex = new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/);
      if (!regex.test(name)) {
        console.log("Nombre de sucursal no valido");
        fn(
          "El campo nombre de sucursal no puede contener caracteres especiales o espacios al final"
        );
        return false;
      } else {
        console.log(" - - - - Nombre de sucursal valido");
        fn("");
      }
    }
  }
};

export const validateNameBranch = (name, fn) => {
  if (name.trim() === "") {
    fn("El campo nombre no puede estar vacío");
  } else if (/[!@#$%^&*(),.?":{}|<>]/.test(name)) {
    fn("El campo nombre no puede contener caracteres especiales");
  } else if (/([A-Za-z0-9])\1\1/.test(name)) {
    fn(
      "El campo nombre no puede contener tres caracteres consecutivos iguales"
    );
  } else if (/[a-z]/.test(name)) {
    fn("El campo nombre no puede contener caracteres en minúsculas");
  } else if (/\s$/.test(name)) {
    fn("El campo nombre no puede tener espacios al final");
  } else if (name.length < 8) {
    fn("El campo nombre no puede tener 8 o menos dígitos");
  } else {
    fn("");
  }
};
const handleInputChange = (text) => {
  setInputValue(text);
  const number = parseFloat(text);
  if (number < 999.99) {
    console.log("El número es menor a 999.99");
  } else {
    console.log("El número es igual o mayor a 999.99");
  }
};

export const validatePriceProduct = (price, fn) => {
  const number = parseFloat(price);

  const priceRegex = /^\d+(\.\d{1,2})?$/;

  if (price === "" || price === null) {
    console.log("INFO precio INVALIDO");
    fn("El campo precio del producto no puede estar vacío");
  } else if (number <= 0) {
    console.log("----------------El número es menor o igual a 0");
    fn("El número debe ser mayor a 0");
  } else if (number > 999.99) {
    console.log("----------------El número es menor a 999.99");
    fn("El número debe ser menor o igual a 999.99");
  } else if (isNaN(number)) {
    console.log("Precio invalido");
    fn("El precio del producto no es un número válido");
  } else if (!priceRegex.test(price)) {
    console.log("Formato de precio inválido");
    fn(
      "El formato de precio no es válido. Utilice un formato como 9.29 o 1.00"
    );
  } else {
    console.log("Precio válido");
    fn("");
  }
};
