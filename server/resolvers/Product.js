exports.Product = {
  //query a category related to a certain product
  category: ({ categoryId }, args, { categories }) => {
    //parent destructuring to get categoryId field
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id: productId }, arg, { reviews }) => {
    return reviews.filter((review) => review.productId === productId);
  },
};
