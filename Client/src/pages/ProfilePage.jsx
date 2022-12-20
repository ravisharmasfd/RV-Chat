
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import { useState,useContext, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import appStore from "../store/context";
import fetchPerson from "../controllers/fetchPerson";

export default function ProfilePage() {
  const {state} = useContext(appStore);
  const {userName} = useParams();
  const [isUserProfile,setIsUserProfile] = useState(false);
  const [profileUser,setProfileUser] = useState(state.user);
  
  useLayoutEffect(() => {
    prof()
  },[userName,state.user]);
  
  async function prof(){
    try {
        if(userName == state?.user?.userName){
          setIsUserProfile(true);
          setProfileUser(state.user);
        }else{
          const person = await fetchPerson((userName));
          setIsUserProfile(false);
          setProfileUser(person);
        }
    } catch (error) {
      alert("error in server")
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
        <Sidebar></Sidebar>
        <Profile profileUser={profileUser} isUserProfile={isUserProfile}></Profile>

    </div>
  )
}