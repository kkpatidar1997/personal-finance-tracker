import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// POST /api/transactions – Add transaction
// GET /api/transactions – Get all transactions for a user
router.route("/")
  .post(protect, addTransaction)
  .get(protect, getTransactions);

// DELETE /api/transactions/:id – Delete a specific transaction
router.route("/:id").delete(protect, deleteTransaction);

export default router;
