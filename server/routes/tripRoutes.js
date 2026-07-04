const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

router.post("/", authMiddleware, createTrip);

router.get("/", authMiddleware, getTrips);

router.put("/:id", authMiddleware, updateTrip);

router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;
