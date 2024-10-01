const { driver } = require('../../models')

module.exports = {
  userDriver: async ({ email }) => {
    return driver.findOne({
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
