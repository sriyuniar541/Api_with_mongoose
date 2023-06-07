module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      price: Number,
      count : Number,
      photo: String
      
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Products = mongoose.model("products", schema);
  return Products;
};
