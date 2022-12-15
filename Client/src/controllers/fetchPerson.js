import axios from "axios"

const fetchPerson = async(userName)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/person/${userName}`);
    console.log("fetchPerson");
    return res.data.person;
}
export default fetchPerson;