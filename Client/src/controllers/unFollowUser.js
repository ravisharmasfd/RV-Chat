import Cookies from "js-cookie";

const unFollowUser = async(_id)=>{
    const token = Cookies.get('token');
    
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/unfollow/${_id}`,{
            method: 'PUT', 
            headers: new Headers({
                'Authorization': `Bearer ${token}` })
            });
        console.log(res)
        const d = await res.json();
        console.log(d);
    } catch (error) {
        console.log(error)
    }
    
}
export default unFollowUser;