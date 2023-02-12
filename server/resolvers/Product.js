exports.Product = {
  //query a category related to a certain product
  category: ({ categoryId }, args, { db }) => {
    //parent destructuring to get categoryId field
    return db.categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id: productId }, arg, { db }) => {
    return db.reviews.filter((review) => review.productId === productId);
  },
};
