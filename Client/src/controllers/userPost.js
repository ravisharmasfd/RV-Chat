import axios from "axios"

const userPostController = async(_id)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${_id}`);
    console.log(res.data);
    return res.data;
}
export default userPostController;