import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
const fetchUser = async()=>{ 
    try {
      const token = Cookies.get('token')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/userinfo`,{ headers: { Authorization: `Bearer ${token}` } })
      const {data} = res;
      if(data){
        return data.user
      }else{throw new Error('there is some problem')}
    } catch (error) {
      console.log(error)
      const navigate = useNavigate();
      navigate('/login')
    }
}
export default fetchUser;