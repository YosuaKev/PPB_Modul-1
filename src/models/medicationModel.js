import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  // Ambil semua data + support filter & pagination
  async getAll({ name, limit, offset }) {
    let query = supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
        `,
        { count: "exact" } // supaya dapat total count
      )
      .order("id", { ascending: false }); // data terbaru duluan

    // filter berdasarkan name
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // pagination
    if (limit && offset >= 0) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, count };
  },

  // Ambil data berdasarkan ID
  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(`
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Tambah data
  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Update data
  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Hapus data
  async remove(id) {
    const { error } = await supabase
      .from("medications")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  },
};
