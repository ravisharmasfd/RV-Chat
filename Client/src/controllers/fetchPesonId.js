import axios from "axios"
const fetchPersonId = async(_id)=>{
    console.log(API_URL)
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/person/id/${_id}`);
    const {data} =res
    const {person} = data
    return person;
}
export default fetchPersonId;