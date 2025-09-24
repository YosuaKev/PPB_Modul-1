import { MedicationModel } from "../models/medicationModel.js";

export const ReportController = {
    async getTotal(req, res) {
        try {
            const totals = await MedicationModel.getTotal();
            res.json(totals);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
