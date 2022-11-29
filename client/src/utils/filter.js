export default function filter(filtros, products) {
  let filteredProducts = products.filter((product) => {
    product.attributes.filter((e) => {
      if (e.name === "Marca") {
        product.Marca = e.value;
      }
      if (e.name === "Género") {
        product.Género = e.value;
      }
      if (e.name === "Estilo") {
        product.Estilo = e.value;
      }
    });

    for (const i in filtros) {
      if (product[i] !== filtros[i] && filtros[i] !== "Todos") {
        return false;
      }
    }
    return true;
  });

  return filteredProducts;
}
