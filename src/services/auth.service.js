import axios from "axios";

export default {
    login (email, password) { 
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: 'https://fanfics-backend.herokuapp.com/api/auth/login',
            data: {
              email,
              password
            }
        })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);

            return response.data;
        });
    }, 
    signup (email, name, password) {
        return axios({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: 'https://fanfics-backend.herokuapp.com/api/auth/register',
            data: {
              email,
              name,
              password
            }
        })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          
          return response.data;
        });
    }    
}