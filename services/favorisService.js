import { API_BASE_URL } from '../config/api.config';

export const addFavori = async (idUser, idLieu) => {
  const res = await fetch(`${API_BASE_URL}/favoris`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idUser, idLieu }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};


export const removeFavori = async (idUser, idLieu) => {
  const res = await fetch(`${API_BASE_URL}/favoris/${idUser}/${idLieu}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(await res.text());
};


export const getFavoris = async (idUser) => {
  const res = await fetch(`${API_BASE_URL}/favoris/user/${idUser}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};