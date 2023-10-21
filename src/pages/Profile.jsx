import React from 'react';
import Card from "@mui/material/Card";
import {AccountCircle, LocalPlay, Logout} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedTab} from "../slice/profileSlice.js";
import UserData from "../components/Profile/UserData.jsx";
import MyTickets from "../components/Profile/MyTickets.jsx";
import Avatar from "@mui/material/Avatar";
import {clearAuthToken} from "../slice/authSlice.js";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const selectedTab = useSelector(state => state.profile.selectedTab)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <Card className="mx-[13%] mt-[5%] mb-20 grid grid-cols-9 p-4 border border-2 border-[#0D3A8A]">
            <div className="col-span-3 flex flex-col items-center  border-r-2 border-r-[#0D3A8A]">
                <Avatar className="mx-auto my-4" sx={{ width: 80, height: 80 }}>
                    <AccountCircle sx={{ fontSize: 80 }} />
                </Avatar>
                <h2 className="text-2xl my-6">Admin admin</h2>
                <div onClick={()=>{dispatch(setSelectedTab("userData"))}}
                     className={`w-52 h-52 my-5 flex items-center justify-center border-2 cursor-pointer ${selectedTab === "userData" ? "bg-[#0D3A8A] border-white text-white" : "border-[#0D3A8A] text-[#0D3A8A] bg-white" }`}>
                    <div className="text-center text-2xl">
                        <AccountCircle /> User Data
                    </div>
                </div>
                <div onClick={()=>{dispatch(setSelectedTab("myTickets"))}}  className={`w-52 h-52 my-5 flex items-center justify-center border-2 border-[#0D3A8A] cursor-pointer ${selectedTab === "myTickets" ? "bg-[#0D3A8A] border-white text-white" : "border-[#0D3A8A] text-[#0D3A8A] bg-white" } `}>
                    <div className="text-center">
                        <LocalPlay /> My Tickets
                    </div>
                </div>
                <div onClick={()=>{
                        navigate('/')
                        dispatch(clearAuthToken())
                    }}
                     className="w-52 h-52 my-5 flex items-center justify-center border-2 border-[#0D3A8A] cursor-pointer "
                >
                    <div className="text-center border-[#0D3A8A] text-[#0D3A8A]">
                        <Logout /> Logout
                    </div>
                </div>
            </div>
            {selectedTab === "userData" && <UserData />}
            {selectedTab === "myTickets" && <MyTickets />}


        </Card>
    );
};

export default Profile;
