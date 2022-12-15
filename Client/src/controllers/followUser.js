import Cookies from "js-cookie";
const followUser = async(_id)=>{
    const token = Cookies.get('token');
    console.log(token);
    try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/follow/${_id}`,{
            method: 'put', 
            headers: new Headers({
                'Authorization': `Bearer ${token}` })
            });
        console.log(res)
        const d = await res.json();
        console.log(d);
    }catch(err){
        console.log(err)
    }
    
}
export default followUser;