const { passengers } = require("../../models");

module.exports = {
  userPassenger: async ({ email }) => {
    return passengers.findOne({
      where: { email },
      attributes: [
        "email",
        "phoneNumber",
        "city",
        "lastName",
        "firstName",
        "id",
        "lat_coordinate",
        "lon_coordinate",
      ],
    });
  },
  CreateProfile: async () => {
    return { message: "create profile" };
  },
};
