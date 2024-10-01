// const axios = require("axios");

// export const getPlaceName = async (lat, lon) => {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;
//     if (data && data.display_name) {
//       return data.display_name; // Human-readable address or location name
//     } else {
//       return "Location not found";
//     }
//   } catch (error) {
//     console.error(error);
//     return "Error fetching location";
//   }
// };
