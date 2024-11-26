const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


export async function getSubscribtions() {
  let headersList = {
    Accept: "application/json",
    apikey: key,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  const response = await fetch(url,
    {
      method: "GET",
      headers: headersList,
    }
);

  const data = await response.json();
  return data;
}