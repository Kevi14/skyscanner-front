import { useEffect, useState } from "react";
import LevelRewards from "../components/Rewards/LevelRewards.jsx";
import { Box, Typography } from "@mui/material";
import api from "../api/api.js";
import { useSelector } from "react-redux";
const Rewards = () => {
    const access = useSelector((state) => state.auth.token);
    const [currentData, setCurrentData]=useState({})
    useEffect(()=>{
        api.get('/discount_info/discount_info/' ,{
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }).then((res)=>setCurrentData(JSON.parse(res.data.data)))
    },[])
    const flightToReact = currentData?.all_tiers?.reduce((acc, {tier_name, flight_range})=>{
        return acc = {...acc, [tier_name]: flight_range}
    },{}) || {}

    
    return (
        <div className="grid grid-cols-1 gap-4 mx-[12%] my-10 ">
            <div>
                <LevelRewards flights={currentData.flights_this_year} />
            </div>
            <div>
                {!currentData.current_tier && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Welcome</Typography>
                   <Typography variant="h5">You need {flightToReact['Bronze']?.[0]|| 0 } booking to be a Bronze Customer</Typography>
                </Box>
                )}
                 {currentData.current_tier === 'Bronze'&&(
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Congratulations you now are <span style={{color:'#CD7F32'}}>Bronze Customer</span></Typography>
                   <Typography variant="h5">You need {(flightToReact['Silver']?.[0] - currentData.flights_this_year)} booking to be  a <span style={{color:'#C0C0C0'}}>Silver Customer</span></Typography>
                </Box>
                )}
                {currentData.current_tier === 'Silver'&&(
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Congratulations you now are <span style={{color:'#E5E4E2'}}>Silver Customer</span></Typography>
                   <Typography variant="h5">You need {(flightToReact['Gold']?.[0] - currentData.flights_this_year)} booking to be  a <span style={{color:'#FFD700'}}>Gold Customer</span></Typography>
                </Box>
                )}
                {currentData.current_tier === 'Gold'&&(
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Congratulations you now are <span style={{color:'#FFD700'}}>Gold Customer</span></Typography>
                   <Typography variant="h5">You need {(flightToReact['Platinum']?.[0] - currentData.flights_this_year)} booking to be  a <span style={{color:'#E5E4E2'}}>Platinum Customer</span></Typography>
                </Box>
                )}
                {currentData.current_tier === 'Platinum'&&(
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Congratulations you now are <span style={{color:'#E5E4E2'}}>Platinum Customer</span></Typography>
                   <Typography variant="h5">You need {(flightToReact['Diamond']?.[0] - currentData.flights_this_year)} booking to be  a <span style={{color:'#9ac5db'}}>Diamond Customer</span></Typography>
                </Box>
                )}
                 {currentData.current_tier === 'Diamond'&&(
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Congratulations you now are <span style={{color:'#9ac5db'}}>Diamond Customer</span></Typography>
                </Box>
                )}
            </div>
            {currentData.current_tier === 'Bronze' && (
            <div>
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #CD7F32', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Bronze Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Bronze')?.discounts || {}).map((e)=>{
                    return <Typography color='#CD7F32' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Bronze').discounts[e]}% discount</Typography>
                    })}
                </Box>
                </div>
            )}
            {currentData.current_tier === 'Silver' && (
            <div>
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #E5E4E2', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Silver Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Silver')?.discounts || {}).map((e)=>{
                    return <Typography color='#E5E4E2' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Silver').discounts[e]}% discount</Typography>
                    })}
                </Box>
                </div>
            )}
            {currentData.current_tier === 'Gold' && (
            <div>
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #FFD700', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Gold Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Gold')?.discounts || {}).map((e)=>{
                    return <Typography color='#FFD700' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Gold').discounts[e]}% discount</Typography>
                    })}
                </Box>
                </div>
            )}
            {currentData.current_tier === 'Platinum' && (
            <div>
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #E5E4E2', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Platinum Customer</Typography>
                    {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Platinum')?.discounts || {}).map((e)=>{
                    return <Typography color='#E5E4E2' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Platinum').discounts[e]}% discount</Typography>
                    })}
                </Box>
                </div>
            )}
            {currentData.current_tier === 'Diamond' && (
            <div>
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #9ac5db', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Diamond Customer</Typography>
                    {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Diamond')?.discounts || {}).map((e)=>{
                    return <Typography color='#9ac5db' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Diamond').discounts[e]}% discount</Typography>
                    })}
                </Box>
                </div>
            )}
            <div>
                {!currentData.current_tier && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #CD7F32', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Bronze Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Bronze')?.discounts || {}).map((e)=>{
                    return <Typography color='#CD7F32' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Bronze').discounts[e]}% discount</Typography>
                    })}
                </Box>
                )}
                 {currentData.current_tier === 'Bronze' && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #C0C0C0', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Silver Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Bronze')?.discounts || {}).map((e)=>{
                    return <Typography color='#C0C0C0' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Silver').discounts[e]}% discount</Typography>
                    })}
                </Box>
                )}
                 {currentData.current_tier === 'Silver' && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #FFD700', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Gold Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Silver')?.discounts || {}).map((e)=>{
                    return <Typography color='#FFD700' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Gold').discounts[e]}% discount</Typography>
                    })}
                </Box>
                )}
                 {currentData.current_tier === 'Gold' && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #E5E4E2', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Platinum Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Gold')?.discounts || {}).map((e)=>{
                    return <Typography color='#E5E4E2' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Platinum').discounts[e]}% discount</Typography>
                    })}
                </Box>
                )}
                 {currentData.current_tier === 'Platinum' && (
                <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', border:'1px solid #9ac5db', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                   <Typography variant="h5">Benefits of beeing Diamond Customer</Typography>
                   {Object.keys(currentData?.all_tiers?.find(({tier_name})=>tier_name==='Diamond')?.discounts || {}).map((e)=>{
                    return <Typography color='#9ac5db' variant="h5">{e}: {currentData.all_tiers.find(({tier_name})=>tier_name==='Diamond').discounts[e]}% discount</Typography>
                    })}
                </Box>
                )}
            </div>
        </div>
    );
};

export default Rewards;
