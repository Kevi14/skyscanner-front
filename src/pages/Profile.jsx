import React, { useState } from 'react';

const UserProfileComponent = ({ initialData }) => {
    const [userData, setUserData] = useState(initialData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Type:</label>
                    <select name="user_type" value={userData?.user_type} onChange={handleInputChange}>
                        <option value="1">Customer</option>
                        <option value="2">Provider</option>
                    </select>
                </div>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={userData?.first_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={userData?.last_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData?.email} onChange={handleInputChange} disabled />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={userData?.phone} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Frequent Flyer Number:</label>
                    <input type="text" name="frequent_flyer_number" value={userData?.frequent_flyer_number} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" name="date_of_birth" value={userData?.date_of_birth} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Street:</label>
                    <input type="text" name="street" value={userData?.address.street} onChange={handleInputChange} />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" value={userData?.address.city} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Postal Code:</label>
                    <input type="text" name="postal_code" value={userData?.address.postal_code} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Document Type:</label>
                    <select name="documentType" value={userData?.document.type} onChange={handleInputChange}>
                        <option value="PASSPORT">PASSPORT</option>
                        <option value="NATIONAL_ID">NATIONAL_ID</option>
                    </select>
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfileComponent;
