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

// Get Public Trips by User ID
exports.getPublicTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.params.userId,
    }).populate("user", "name");

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


    res.json(trips);
  } catch (error) {
  console.error("UPLOAD ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}


};

// Get Single Trip
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json(trip);
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

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

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
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Upload Trip Photo
exports.uploadTripPhoto = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No photo uploaded",
      });
    }

    trip.coverImage = req.file.path;
    trip.photos.push(req.file.path);

    await trip.save();

    res.json({
      message: "Photo uploaded successfully",
      coverImage: trip.coverImage,
      photos: trip.photos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Public Trips
exports.getPublicTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.params.userId,
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
