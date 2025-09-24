import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
    async getAll(req, res) {
        try {
            const { name, page, limit } = req.query;
            if (name || page || limit) {
                const meds = await MedicationModel.getAllWithFilter({
                    name,
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 10,
                });
                return res.json(meds);
            } else {
                const meds = await MedicationModel.getAll();
                return res.json(meds);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const med = await MedicationModel.getById(req.params.id);
            res.json(med);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const { price, quantity } = req.body;
            const errors = [];

            if (price < 0) {
                errors.push("Price tidak boleh kurang dari 0");
            }
            if (quantity < 0) {
                errors.push("Quantity tidak boleh kurang dari 0");
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const med = await MedicationModel.create(req.body);
            res.status(201).json(med);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { price, quantity } = req.body;
            const errors = [];

            if (price < 0) {
                errors.push("Price tidak boleh kurang dari 0");
            }
            if (quantity < 0) {
                errors.push("Quantity tidak boleh kurang dari 0");
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const med = await MedicationModel.update(req.params.id, req.body);
            res.json(med);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async remove(req, res) {
        try {
            await MedicationModel.remove(req.params.id);
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
