import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("medications")
      .select(`
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `)
      .order("id", { ascending: false }); 

    if (error) throw error;
    return data;
  },

  // Ambil data obat berdasarkan ID
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

  // Tambah data baru
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
