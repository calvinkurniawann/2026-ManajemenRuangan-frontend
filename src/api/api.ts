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
  return res.json();
}

export async function putData(endpoint: string, data: any) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateData(endpoint: string, data: any) {
    const response = await fetch(`http://localhost:5045/api/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to update");
    }

    return response.json();
}   
