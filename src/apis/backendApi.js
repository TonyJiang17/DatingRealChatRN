import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});


instance.interceptors.request.use(
  async (config) => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      // console.log(token);
      if (token && email){
          config.headers = {
              "Content-Type": "multipart/form-data",
              "X-User-Email": `${email}`,
              "X-User-Token": `${token}`
          }
      }
      return config;
  },
  //error case 
  (err) => {
      return Promise.reject(err);
  }
);

export default instance;

