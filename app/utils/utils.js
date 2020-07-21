export const filterProductByName = (product, filter) => {
  return (
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.code === filter
  );
};

export const filterProducts = (products, filter) => {
  return products.filter((p) => filterProductByName(p, filter));
};
