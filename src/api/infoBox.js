import apiUrl from "../apiConfig";
import axios from "axios";

// Delete
export const removeInfoBox = (user, articleId, infoBoxId) => {
    return axios({
        url: `${apiUrl}/infoboxes/${articleId}/${infoBoxId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// Update
export const updateInfoBox = (user, articleId, updatedInfoBox) => {
    return axios({
        url: `${apiUrl}/infoboxes/${articleId}/${updatedInfoBox._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { infoBox: updatedInfoBox }
    })
}

// Create
export const createInfoBox = (user, articleId, newInfoBox) => {
    return axios({
        url: `${apiUrl}/infoboxes/${articleId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { infoBox: newInfoBox }
    })
}
