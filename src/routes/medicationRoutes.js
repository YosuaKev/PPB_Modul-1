import express from "express";
import { MedicationController } from "../controllers/medicationController.js";
import { MedicationModel } from "../models/medicationModel.js";

const router = express.Router();

router.get("/", MedicationController.getAll);
router.get("/:id", MedicationController.getById);
router.post("/", MedicationController.create);
router.put("/:id", MedicationController.update);
router.delete("/:id", MedicationController.remove);

// endpoint tambahan: total jumlah obat
router.get("/reports/total", async (req, res) => {
    try {
        const total = await MedicationModel.getTotal();
        res.json(total);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
