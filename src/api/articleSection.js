import apiUrl from "../apiConfig";
import axios from "axios";

// Delete
export const removeArticleSection = (user, articleId, articleSectionId) => {
    return axios({
        url: `${apiUrl}/sections/${articleId}/${articleSectionId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// Update
export const updateArticleSection = (user, articleId, updatedArticleSection) => {
    return axios({
        url: `${apiUrl}/sections/${articleId}/${updatedArticleSection._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { articleSection: updatedArticleSection }
    })
}

// Create
export const createArticleSection = (user, articleId, newArticleSection) => {
    return axios({
        url: `${apiUrl}/sections/${articleId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { articleSection: newArticleSection }
    })
}
