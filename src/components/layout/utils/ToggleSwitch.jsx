// Filename: ToggleSwitch.js
import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, stockMayorCero, setStockMayorCero }) => {
	const handleToggleChange = () => {
		setStockMayorCero(!stockMayorCero);
	};
	return (
	<div className="toggle-container">
		<div className="toggle-switch">
			{label}
		</div>
		<div className="toggle-switch">
			<input 
				type="checkbox" 
				className="checkbox" 
				name={label} 
				id={label}
				checked={stockMayorCero}
				onChange={handleToggleChange}
			/>
			<label className="label" htmlFor={label}>
				<span className="inner" />
				<span className="switch" />
			</label>
		</div>
	</div>
);
};

export default ToggleSwitch;
