const API_URL = "https://curly-smoggy-storm.glitch.me/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(API_URL + "api/category");
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res;
  } 
  catch (error) { return { error } }
};

export const fetchCards = async id => {
  try {
    const response = await fetch(`${API_URL}api/category/${id}`);
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res;
  } 
  catch (error) { return { error } }
};

export const fetchCreateCategory = async data => {
  try {
    const response = await fetch(`${API_URL}api/category/`, { method: 'POST', body: JSON.stringify(data) })
    
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res; 
  } 
  catch (error) { return { error } }
};

export const fetchEditCategory = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}api/category/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
    
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res; 
  } 
  catch (error) { return { error } }
};

export const fetchDeleteCategory = async id => {
  try {
    const response = await fetch(`${API_URL}api/category/${id}`, { method: 'DELETE' })
    
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res; 
  } 
  catch (error) { return { error } }
};
