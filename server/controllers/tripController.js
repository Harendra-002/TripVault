const Trip = require("../models/Trip");

// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.id,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    res.json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
