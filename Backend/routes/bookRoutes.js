import express from "express";
import multer from "multer";
import {
  uploadExcel,
  reviewData,
  confirmData,
  rejectData,
} from "../controllers/companyController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint to upload Excel file
router.post("/upload", upload.single("file"), uploadExcel);

// Endpoint to review uploaded data
router.get("/review/:sessionId", reviewData);

// Endpoint to confirm and store data
router.post("/confirm/:sessionId", confirmData);

// Endpoint to reject and delete data
router.post("/reject/:sessionId", rejectData);

export default router;
