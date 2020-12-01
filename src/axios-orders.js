import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-9fb49.firebaseio.com/'
});

export default instance;