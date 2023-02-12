exports.Query = {
  //querying a specific products
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    //filtering by onSale status
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale == true) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      //filtering by average rating
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },

  //querying all products
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  //query all categories
  categories: (parent, args, { db }) => db.categories,
  //query a category
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
  reviews: (parent, args, { db }) => db.reviews,
  review: (parent, args, { db }) => {
    const { reviewId } = args;
    console.log(reviewId);
    return db.reviews.filter((review) => review.id === reviewId);
  },
};
