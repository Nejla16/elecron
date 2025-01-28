import axios from 'axios';

class UserService {
    static logdIn = (body) => axios.post('/auth/login', body);
}

export default UserService;