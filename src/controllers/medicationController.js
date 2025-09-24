import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  // GET /api/medications?name=paracetamol&page=1&limit=5
  async getAll(req, res) {
    try {
      const { name, page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const { data, count } = await MedicationModel.getAll({
        name,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      res.json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/medications/:id
  async getById(req, res) {
    try {
      const data = await MedicationModel.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /api/medications
  async create(req, res) {
    try {
      const data = await MedicationModel.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /api/medications/:id
  async update(req, res) {
    try {
      const data = await MedicationModel.update(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /api/medications/:id
  async remove(req, res) {
    try {
      const result = await MedicationModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
