import appAPI from "../api/appAPI";

export const addFavori = async (idUser, idLieu) => {
  try {
    const response = await appAPI.post('/favoris', { idUser, idLieu });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const removeFavori = async (idUser, idLieu) => {
  try {
    await appAPI.delete(`/favoris/${idUser}/${idLieu}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getFavoris = async (idUser) => {
  try {
    const response = await appAPI.get(`/favoris/user/${idUser}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
