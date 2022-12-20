import React, { useRef } from "react";
import { useContext } from "react";
import appStore from "../store/context";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const { state,dispatch} = useContext(appStore);
  const user = state.user;
  const firstRef = useRef();
  const lastRef = useRef();
  const aboutRef = useRef();
  const cityRef = useRef();
  const homeRef = useRef();
  const genderRef = useRef();
  const relationRef = useRef();
  async function handleForm(e){
    e.preventDefault();
    const data = {
      firstName : firstRef.current.value,
      lastName : lastRef.current.value,
      description : aboutRef.current.value,
      city : cityRef.current.value,
      from : homeRef.current.value,
      gender : genderRef.current.value,
      relation : relationRef.current.value,
    }
    try {
      const token = Cookies.get('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user`,data,{
        headers:{
          Authorization :  `Bearer ${token}`
        }
      })
      alert('Your profile is updated')
      const payload = res.data.data;
      dispatch({
        type:"refresh",
        payload
      })
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  return (
      <div className="flex flex-col items-center justify-center w-full h-full p-10 ">
        <div className="mt-10 sm:mt-0 rounded-2xl">
          <div className="md:grid md:grid-cols-3 md:gap-6">

            <div className="mt-6 md:col-span-2 md:mt-0 ">
              <form onSubmit={handleForm}>
                <div className="overflow-hidden shadow sm:rounded-md ">
                  <div className="bg-slate-200 px-4 py-5 sm:p-6 appBoxShadow">
                  <h1 className="font-bold m-5 text-center ">Edit Your Profile Information</h1>
                    <div className="grid grid-cols-6 gap-6">
                      
                      <div className="col-span-6 sm:col-span-3 w-full">
                        <label className="block">
                          <span className="text-gray-700">About</span>
                          <textarea ref={aboutRef} maxLength='150' minLength='10' required
                            className="form-textarea mt-1 block w-full rounded-lg"
                            rows="3"
                            placeholder="Enter short description about you."
                          ></textarea>
                        </label>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          required
                          type="text"
                          ref={firstRef}
                          placeholder={user?.firstName}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                        required
                          type="text"
                          ref={lastRef}
                          placeholder={user?.lastName}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Gender"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <select
                          id="Gender"
                          name="Gender"
                          ref={genderRef}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>MALE</option>
                          <option>FEMALE</option>
                          <option>OTHER</option>
                          <option defaultValue>PRIVATE INFO</option>
                        </select>
                      </div>

                      


                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                        required
                          type="text"
                          ref={cityRef}
                          placeholder={user?.city}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="relation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Relationship Status
                        </label>
                        <select
                        ref={relationRef}
                          id="relation"
                          name="relation"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>SINGLE</option>
                          <option>MARRIED</option>
                          <option>COMMITTED</option>
                          <option defaultValue>PRIVATE INFO</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Home Town
                        </label>
                        <input
                          type="text"
                          required
                          ref={homeRef}
                          placeholder={user?.from}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-200 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={()=>navigate(-1)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EditProfile;
