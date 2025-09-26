const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", getAllJobs);
router.post("/", requireAuth, createJob);
router.get("/:id", getJobById);
router.put("/:id", requireAuth, updateJob);
router.delete("/:id", requireAuth, deleteJob);

module.exports = router;
