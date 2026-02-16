const BASE_URL = "http://localhost:5045/api";

export async function fetchData(endpoint: string) {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function postData(endpoint: string, data: any) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Terjadi kesalahan");
  }

  return result;
}

export async function putData(endpoint: string, data: any) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Terjadi kesalahan");
  }

  return result;
}

export async function updateData(endpoint: string, data: any) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Terjadi kesalahan");
  }

  return result;
}

export async function deleteData(endpoint: string) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal menghapus data");
  }

  return true;
}
