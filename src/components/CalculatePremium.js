import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalculatePremium.css';

function CalculatePremium() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        age: '',
        vehicleType: 'Sports Car',
        customVehicleType: '',
        location: 'Rural',
        customLocation: '',
        accidents: '',
        duiConvictions: '',
        noClaimBonus: '1',
    });
    const [calculatedMultiplier, setCalculatedMultiplier] = useState('');
    const [finalPremiumAmount, setFinalPremiumAmount] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                "decisionDefinitionId": "Insurance_Premium_Generator",
                "variables": {

                    firstName: formData.firstName,
                    phoneNumber: formData.phoneNumber,
                    age: parseInt(formData.age, 10),
                    vehicleType: formData.vehicleType === 'Other' ? formData.customVehicleType : formData.vehicleType,
                    location: formData.location === 'Other' ? formData.customLocation : formData.location,
                    accidents: parseInt(formData.accidents, 10),
                    duiConvictions: parseInt(formData.duiConvictions, 10),
                    noClaimBonus: parseInt(formData.noClaimBonus, 10)
                }
            };

            const response = await fetch('http://localhost:8080/v2/decision-definitions/evaluation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                const multiplier = JSON.parse(result.output).multiplier
                const reason = JSON.parse(result.output).reason

                setCalculatedMultiplier(multiplier || 'No result available');
                setFinalPremiumAmount(multiplier * 10000);
                setReason(reason);
            } else {
                alert('Failed to calculate premium');
            }
        } catch (error) {
            alert('Error calculating premium: ' + error.message);
        }
    };

    return (
        <div className="calculate-premium-container">
            <div className="header-image"></div>
            <h2 className="calculate-premium-title">Calculate Premium</h2>
            <form className="calculate-premium-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Vehicle Type:</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
                        <option>Sports Car</option>
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Convertible</option>
                        <option>Other</option>
                    </select>
                    {formData.vehicleType === 'Other' && (
                        <input type="text" name="customVehicleType" placeholder="Enter Vehicle Type" value={formData.customVehicleType} onChange={handleChange} required />
                    )}
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <select name="location" value={formData.location} onChange={handleChange} required>
                        <option>Rural</option>
                        <option>Urban</option>
                        <option>Sub Urban</option>
                        <option>Tourist</option>
                        <option>High Crime</option>
                        <option>Other</option>
                    </select>
                    {formData.location === 'Other' && (
                        <input type="text" name="customLocation" placeholder="Enter Location" value={formData.customLocation} onChange={handleChange} required />
                    )}
                </div>
                <div className="form-group">
                    <label>Accidents:</label>
                    <input type="number" name="accidents" value={formData.accidents} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>DUI Convictions:</label>
                    <input type="number" name="duiConvictions" value={formData.duiConvictions} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>No Claim Bonus:</label>
                    <select name="noClaimBonus" value={formData.noClaimBonus} onChange={handleChange} required>
                        {Array.from({ length: 15 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <button className="submit-button" type="submit">Calculate Premium</button>
            </form>
            <div className="result-container">
                <div className="result-field">
                    <label>Calculated Multiplier:</label>
                    <textarea readOnly value={calculatedMultiplier}></textarea>
                </div>
                <div className="result-field">
                    <label>Final Premium Amount:</label>
                    <textarea readOnly value={finalPremiumAmount}></textarea>
                </div>
                <div className="result-field">
                    <label>Reason:</label>
                    <textarea readOnly value={reason}></textarea>
                </div>
            </div>
        </div>
    );
}

export default CalculatePremium;