import axios from "axios";
import api from "../constants/";

export default {
    toggleLike (chapter) { 
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/chapters/${chapter.id}/toggle-like`,
            data: {
                liked: chapter.liked
            }
        })
        .then(response => response.data);
    },

    deleteChapter(chapterId) {
      const token = localStorage.getItem('token');

      return axios({
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          url: `${api}/chapters/${chapterId}`
      })
      .then(response => response.data)
  }
}