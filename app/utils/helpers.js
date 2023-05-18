export const validateNameBranch2 = (name, fn) => {

    if (name == "" || name == null) {
      console.log("INFO name INVALIDA")
      fn("El campo nombre  no puede estar vacio")
  
    } else {
      if (name.length < 8) {
        fn("El campo nombre no puede tener 8 o menos dígitos")
      } else {
        let regex = new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/);
        if (!regex.test(name)) {
          console.log("Nombre de sucursal no valido");
          fn("El campo nombre de sucursal no puede contener caracteres especiales o espacios al final");
          return false;
        } else {
          console.log(" - - - - Nombre de sucursal valido");
          fn("");
        }
      }
    }
  }

  export const validateNameBranch = (name, fn) => {

    if (name == "" || name == null) {
      console.log("INFO name INVALIDA")
      fn("El campo nombre  no puede estar vacio")
  
    } else {
        let regex = new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/);
        if (!regex.test(name)) {
          console.log("Nombre de sucursal no valido");
          fn("El campo nombre de sucursal no puede contener caracteres especiales o espacios al final");
          return false;
        } else {
          if (name.length < 8) {
            fn("El campo nombre no puede tener 8 o menos dígitos")
          } else {
          console.log(" - - - - Nombre de sucursal valido");
          fn("");
          }
      }
    }
  }

  export const validatePriceProduct = (price, fn) => {

    if (price == "" || price == null) {
      console.log("INFO name INVALIDA")
      fn("El campo  precio del producto no puede estar vacio")
  
    } else {
      if (price.length <2 ) {
        fn("El campo precio del producto necesita tener 2 decimales")
      } else {
        let regex = new RegExp(/^(?!00)\d+(\.\d{2})?$/);
        if (!regex.test(price)) {
          console.log("Precio invalido");
          fn("El precio del producto no puede contener dicho valor");
          return false;
        } else {
          console.log(" - - - - Precio valido");
          fn("");
        }
      }
    }
  }