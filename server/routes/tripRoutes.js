const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");



const {
  createTrip,
  getTrips,
  getPublicTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  uploadTripPhoto,
} = require("../controllers/tripController");

router.post("/", authMiddleware, createTrip);

router.get("/", authMiddleware, getTrips);


router.get("/public/:userId", getPublicTrips);

router.get("/:id", authMiddleware, getTripById);

router.put("/:id", authMiddleware, updateTrip);

router.post(
  "/:id/upload",
  authMiddleware,
  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err) {
        console.error("UPLOAD MIDDLEWARE ERROR:", err);
        return res.status(500).json({
          message: err.message,
        });
      }
      next();
    });
  },
  uploadTripPhoto
);



router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;
