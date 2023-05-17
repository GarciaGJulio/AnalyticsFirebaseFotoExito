export const validateNameBranch = (name, fn) => {

    if (name == "" || name == null) {
      console.log("INFO name INVALIDA")
      fn("El campo nombre  no puede estar vacio")
  
    } else {
      if (name.length < 8) {
        fn("El campo nombre no puede tener 8 o menos dígitos")
      } else {
        let regex = new RegExp(/^(?!.*([A-Za-z0-9])\1{2})[A-Za-z0-9]+$/);
        if (!regex.test(name)) {
          console.log("Nombre de sucursal no valido");
          fn("El campo nombre de sucursal no puede contener caracteres especiales");
          return false;
        } else {
          console.log(" - - - - Nombre de sucursal valido");
          fn("");
        }
      }
    }
  }