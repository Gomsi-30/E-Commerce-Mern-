class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // Case insensitive search
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let queryCopy = { ...this.queryStr };
    console.log(queryCopy);
    // Exclude fields like keyword, limit, page etc.
    const removeFields = ["keyword", "limit", "page"];
    removeFields.map(i=>delete queryCopy[i]);
    queryCopy = JSON.stringify(queryCopy);

    queryCopy=queryCopy.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

    this.query = this.query.find(JSON.parse(queryCopy));
    return this;
  }
}

export { ApiFeature };
