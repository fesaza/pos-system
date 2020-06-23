export const filterProducts = (products, filter) => {
  return products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()) || p.code === filter)
};
