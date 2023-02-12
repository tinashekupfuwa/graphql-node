exports.Mutation = {
  //adding a Category
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: crypto.randomUUID(),
      name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    //adding a Product
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };
    db.products.push(newProduct);
    return newProduct;
  },
  /**----------------End of addProduct constructor--------------------------------- */
  addReview: (parent, { input }, { db }) => {
    //add a Review
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: crypto.randomUUID(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  /**----------------End of addReview constructor--------------------------------- */
  //delete a Category with set null
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id)
        return {
          //change every product with the deleted category to null.
          ...product,
          category: null,
        };
      else return product;
    });
    return true; //this shows if there are other
  },
  //delete with cascading.
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  //deleting a review
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  //updating a category
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },
  //updating a product
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },
  //updating a review
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    if (index === -1) return null; // -1 means the arg, which is the {id doesn't exist}
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return db.reviews[index];
  },
};
