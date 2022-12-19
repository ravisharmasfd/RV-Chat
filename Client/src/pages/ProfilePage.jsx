
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import appStore from "../store/context";
import fetchPerson from "../controllers/fetchPerson";

export default function ProfilePage() {
  const [isUserProfile,setIsUserProfile] = useState(false);
  const [profileUser,setProfileUser] = useState(null);
  const {state} = useContext(appStore);
  const {userName} = useParams();
  useEffect(() => {
    prof()
  }, [])
  
  async function prof(){
    try {
      if(!profileUser){
        if(userName == state?.user?.userName){
          setIsUserProfile(true);
          setProfileUser(state.user);
        }else{
          const person = await fetchPerson((userName));
          setIsUserProfile(false);
          setProfileUser(person);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
        <Sidebar></Sidebar>
        <Profile profileUser={profileUser} isUserProfile={isUserProfile}></Profile>

    </div>
  )
}