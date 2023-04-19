const API_URL = "https://curly-smoggy-storm.glitch.me/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(API_URL + "/api/category");
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res;
  } 
  catch (error) { return { error } }
};

export const fetchCards = async id => {
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`);
    const res = await response.json();
    if (response.status != 200 && response.status != 201) throw res;
    return res;
  } 
  catch (error) { return { error } }
};
