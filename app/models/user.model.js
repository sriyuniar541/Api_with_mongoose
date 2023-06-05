module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      phone_number: String,
      photo: String,
      alamat: String,
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

  const Users = mongoose.model("users", schema);
  return Users;
};
