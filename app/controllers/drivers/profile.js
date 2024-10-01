const jwt = require("jsonwebtoken");
const { driver, passengers, Request } = require("../../models");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);



// Helper function to calculate distance between two coordinates using the Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Converts degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const axios = require("axios");

const getPlaceName = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.display_name) {
      return data.display_name; // Human-readable address or location name
    } else {
      return "Location not found";
    }
  } catch (error) {
    console.error(error);
    return "Error fetching location";
  }
};

module.exports = {
  CreateDriverProfile: async (request, response) => {
    /*
      #swagger.requestBody = {
        required: true,
        in: 'body',
        description: 'Create driver profile',
        schema: {
          $ref: '#/definitions/accountDetails'
        }
      }
    */

    try {
      const { accounDetails } = request.body;
      const { file } = request.files;
      const email = "any";

      response
        .status(201)
        .json({ message: "driver profile created successfully!" });
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  },

  GetDriverProfile: async (request, response) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      const { email } = jwt.decode(token);
      const userDriver = await driver.findOne({ where: { email } });
      const userDriverProfile = await userDriver.getDriverProfile();

      return response.status(200).json({
        message: "driver profile",
        data: userDriverProfile,
        user_driver: userDriver,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ message: err.message });
    }
  },

  GetAllDrivers: async (request, response) => {
    /* 
    #swagger.tags = ['driver']

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
    */
    try {
      const allDrivers = await driver.findAll(); // Fetch all drivers
      return response.status(200).json({
        message: "All drivers fetched successfully",
        data: allDrivers,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ message: err.message });
    }
  },

  GetClosestDrivers: async (request, response) => {
    try {
      const { passengerId } = request.params; // Assuming passengerId is passed in the route params

      // 1. Get Passenger Coordinates
      const passenger = await passengers.findByPk(passengerId);
      if (!passenger) {
        return response.status(404).json({ message: "Passenger not found" });
      }

      const { lat_coordinate: passengerLat, lon_coordinate: passengerLon } =
        passenger;

      // 2. Fetch all drivers
      const drivers = await driver.findAll({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "lat_coordinate",
          "lon_coordinate",
          "phoneNumber",
        ],
      });

      // 3. Calculate distance for each driver and add it to the result
      const driversWithDistance = drivers
        .map((driver) => {
          const distance = getDistanceFromLatLonInKm(
            parseFloat(passengerLat),
            parseFloat(passengerLon),
            parseFloat(driver.lat_coordinate),
            parseFloat(driver.lon_coordinate)
          );

          const price_per_km = 1000; // Set base price per km
          const total_price = distance * price_per_km;
          return {
            ...driver.toJSON(),
            distance, // Append distance to the driver object
            total_price,
          };
        })
        .filter((driver) => driver !== null);

      // 4. Sort drivers by distance (ascending)
      driversWithDistance
        .sort((a, b) => a.distance - b.distance)
        .filter(
          (driver) =>
            driver.lon_coordinate !== null || driver.lon_coordinate !== "null"
        );

      // 5. Return the closest drivers
      return response
        .status(200)
        .json({ message: "Closest drivers", data: driversWithDistance });
    } catch (err) {
      console.error(err);
      return response
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },

  sendRequest: async (req, res) => {
    // const { passengerId, driverId } = req.body;

    const { passengerId, driverId } = req.params; // Assuming passengerId is passed in the route params


    try {
      // Fetch driver and passenger locations from the database
      const driverData = await driver.findOne({ where: { id: driverId } });
      const passenger = await passengers.findOne({
        where: { id: passengerId },
      });


    
      // If either driver or passenger is not found, return an error
      if (!driverData || !passenger) {
        return res
          .status(404)
          .json({ message: "Driver or Passenger not found" });
      }

      // Extract coordinates from the fetched driver and passenger
      const driver_location = {
        lat: driverData.lat_coordinate,
        lon: driverData.lon_coordinate,
      };

      const passenger_location = {
        lat: passenger.lat_coordinate,
        lon: passenger.lon_coordinate,
      };

      // Ensure that the coordinates are valid
      if (!driver_location.lat || !driver_location.lon) {
        return res.status(400).json({ message: "Invalid driver location" });
      }

      if (!passenger_location.lat || !passenger_location.lon) {
        return res.status(400).json({ message: "Invalid passenger location" });
      }

      const dirverLocationName = await getPlaceName(
        driver_location.lat,
        // 6.5583,
        driver_location.lon
        // 3.3620
      ); // Example coordinates
      const passgLocationName = await getPlaceName(
        passenger_location.lat,
        passenger_location.lon
      ); // Example coordinates

      // Create the new request with driver and passenger locations
      const newRequest = await Request.create({
        PassengerId: passengerId,
        DriverId:  driverId,
        driver_location: dirverLocationName,
        passenger_location: passgLocationName,
        requestStatus: "Pending",
        // driver_location: Sequelize.fn(
        //   "ST_GeomFromText",
        //   `POINT(${driver_location.lat} ${driver_location.lon})`
        // ),
        // passenger_location: Sequelize.fn(
        //   "ST_GeomFromText",
        //   `POINT(${passenger_location.lat} ${passenger_location.lon})`
        // ),
      });

      res
        .status(201)
        .json({ message: "Request sent successfully", data: newRequest });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "Failed to send request", error: error.message });
    }
  },







   GetDriverRequests: async (request, response) => {
    const { driverId } = request.params;
  
    try {
      const driverRequests = await Request.findAll({ where: { driverId } });
      return response.status(200).json({ message: 'Driver requests fetched', data: driverRequests });
    } catch (error) {
      return response.status(400).json({ message: 'Error fetching requests', error: error.message });
    }
  },








   AcceptRequest: async (request, response) => {
    const { RequestId } = request.params;
  
    try {
      const rideRequest = await Request.findByPk(RequestId);
      if (!rideRequest) return response.status(404).json({ message: 'Request not found' });
  
      rideRequest.requestStatus = 'Accepted';
      await rideRequest.save();
  
      // Emit real-time update to the passenger (Socket.IO)
      io.to(`passenger_${rideRequest.PassengerId}`).emit('requestAccepted', { requestId: rideRequest.id });
  
      return response.status(200).json({ message: 'Request accepted', data: rideRequest });
    } catch (error) {
      return response.status(400).json({ message: 'Error accepting request', error: error.message });
    }
  },




  CancelRequest: async (request, response) => {
    const { RequestId } = request.params;
  
    try {
      const rideRequest = await Request.findByPk(RequestId);
      if (!rideRequest) return response.status(404).json({ message: 'Request not found' });
  
      rideRequest.requestStatus = 'Cancelled';
      await rideRequest.save();
  
      // Emit real-time update to the passenger (Socket.IO)
      io.to(`passenger_${rideRequest.PassengerId}`).emit('requestAccepted', { requestId: rideRequest.id });
  
      return response.status(200).json({ message: 'Request accepted', data: rideRequest });
    } catch (error) {
      return response.status(400).json({ message: 'Error accepting request', error: error.message });
    }
  }







};
