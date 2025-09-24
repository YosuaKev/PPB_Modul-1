import express from "express";
import { MedicationModel } from "../models/medicationModel.js";

const router = express.Router();

router.get("/total", async (req, res) => {
    try {
        const total = await MedicationModel.getTotal();
        res.json(total);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
