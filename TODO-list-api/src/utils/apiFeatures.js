class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["sort", "order"];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (value) => {
      return `$${value}`;
    });

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const order = this.queryString.order;
      let sortBy = this.queryString.sort;

      if (this.queryString.sort === "priority") sortBy = "priorityOrder";

      if (order === "desc") this.query = this.query.sort(`-${sortBy}`);
      else this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
}

module.exports = APIFeatures;
