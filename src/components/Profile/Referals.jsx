import React, {useEffect, useState} from 'react';
import api from "../../api/api.js";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const Referrals = () => {
    const [points, setPoints] = useState(155); // State to manage the points
    const [referCode, setReferCode] = useState("");
    const access = useSelector(state => state.auth.token)
    const [coupon, setCoupon] = useState("");
    const [referralList, setReferralList] = useState([]);
    const maxSegmentValue = 500;
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            const response = await api.get('/reward-info/get_reward/', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data.data)
        } catch (error) {
            toast.error("Something happened, please try again");
        }
    }
    const fetchReferralCode = async () => {
        try {
            const response = await api.get('/referral-code/', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json'
                }
            });
            setReferCode(response.data.data[0].code)

        } catch (error) {
            toast.error("Something happened, please try again");
        }
    }

    const fetchReferralList = async () => {
        try {
            const response = await api.get('/promo-code/', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json'
                }
            });
            setReferralList(response.data.data)

        } catch (error) {
            toast.error("Something happened, please try again");
        }
    }

    useEffect(() => {
        fetchReferralList()
        fetchReferralCode()
        fetchData();
    }, []);

    const generatePromo = async () => {
        try {
            const response = await api.get('/reward-info/generate_promo/', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            setCoupon(response.data.data)
        } catch (error) {
            toast.error("Something happened, please try again");
        }
    }

    const computeFillPercentage = (value, segmentValue) => {
        return (value / segmentValue) * 100;
    };



    const ProgressLine = ({ value }) => {
        const fillPercentage = computeFillPercentage(value, maxSegmentValue);
        const lineStyle = {
            width: `${fillPercentage}%`,
            background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,85,85,1) 100%)',
            borderRadius: '8px 0px 0px 8px'
        };

        return (
            <div className="flex items-center w-full rounded-lg overflow-hidden">
                <div style={lineStyle} className="h-2"></div>
                <div className="flex-1 h-2 bg-gray-300"></div>
            </div>
        );
    };
    console.log(referralList)
    return (
        <div className="mx-3 p-4 rounded shadow-lg bg-white col-span-6">
            <h2 className="text-xl mb-2">Your referral code <span className="text-[#0D3A8A] mb-3">{referCode}</span></h2>
            <h2 className="text-xl mb-2">Your referral points</h2>
            <ProgressLine value={data.total_points} />
            <div className="mt-2 text-gray-600">
                <span className="font-semibold">{data.total_points}</span> out of <span className="font-semibold">{500}</span> points
            </div>

            <div className="mt-4">
                <p className="mb-2 text-gray-700">You are eligible for a {data.discount_percentage}% discount!</p>
                <button
                    onClick={generatePromo}
                    className={`${data.total_points > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400" }  text-white px-4 py-2 rounded `}
                    disabled={data.total_points <= 0}
                >
                    Convert Points
                </button>
                {coupon && <div className="mt-4 bg-green-100 p-2 rounded border border-green-200 text-green-700">Your Coupon Code: {coupon.promo_code} Available until {coupon.validity_date}</div>}
            </div>
            <h2>Coupons list</h2>
            {referralList.map(item=>(
                <div key={item.code} className="my-1 bg-green-100 p-2 rounded border border-green-200 text-green-700">{item.code}<span> {item.points_consumed / 10}% Discount Available until {item.validity}</span></div>
            ))}
        </div>
    )
}

export default Referrals;
