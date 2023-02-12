exports.Category = {
  //query all products in a certain category
  products: ({ id: categoryId }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === categoryId
    );

    let filteredCategoryProducts = categoryProducts;
    if (filter) {
      if (filter.onSale == true) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            return product.onSale;
          }
        );
      }
    }
    return filteredCategoryProducts;
  },
};
