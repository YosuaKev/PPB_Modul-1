import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  // tambahkan default parameter supaya tidak error kalau dipanggil tanpa argumen
  async getAll({ name = null, limit = null, offset = null } = {}) {
    let query = supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `,
        { count: "exact" } // supaya count tidak null
      )
      .order("created_at", { ascending: false }); // data terbaru muncul di atas

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    if (limit !== null && offset !== null) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, count };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
