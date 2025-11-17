import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, query }) {
  const supaBase = await supabaseClient(token);

  let q = supaBase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

  if (location) q = q.eq("location", location);
  if (company_id) q = q.eq("company_id", company_id);
  if (query) q = q.ilike("title", `%${query}%`);

  const { data, error } = await q;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supaBase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supaBase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error deleting saved job:", deleteError);
      return null;
    }
    return data
  } else {
    const { data, error: insertError } = await supaBase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return null;
    }
    return data;
  }

  
  return data;
}

