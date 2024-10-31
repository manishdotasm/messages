/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import ReactSelect from "react-select";

interface SelectProps {
	id: string;
	value?: Record<string, any>;
	onChange: (value: Record<string, any>) => void;
	options: { value: any; label: string }[];
	disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, disabled, id }) => {
	const formatOptionLabel = ({ label, description }: { label: string; description?: string }) => (
		<div className="flex items-center">
			<div>
				<div className="font-semibold">{label}</div>
				{description && <div className="text-xs text-gray-500">{description}</div>}
			</div>
		</div>
	);

	return (
		<ReactSelect
			id={id}
			isMulti
			isDisabled={disabled}
			value={options.filter((option) => value?.includes(option.value)).map((option) => ({ value: option.value, label: option.label }))}
			onChange={(selectedOptions) => {
				const selectedValues = (selectedOptions as any[]).map((option) => option.value);
				onChange(selectedValues);
			}}
			options={options}
			formatOptionLabel={formatOptionLabel}
			classNamePrefix="react-select"
			placeholder="Select members.."
			styles={{
				control: (provided, state) => ({
					...provided,
					borderColor: state.isFocused ? "black" : "black", // Change border color when focused
					borderWidth: "2px", // Set the desired border width
					borderRadius: "0.375rem",
					minHeight: "46px",
					boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 0.1)" : "none",
					"&:hover": {
						borderColor: "black", // Change border color on hover
					},
				}),
				multiValue: (provided) => ({
					...provided,
					backgroundColor: "white",
					border: "1px solid gray",
					borderRadius: "9999px",
					padding: "0.25rem 0.5rem",
					margin: "0.25rem",
				}),
				multiValueLabel: (provided) => ({
					...provided,
					color: "black",
				}),
				multiValueRemove: (provided) => ({
					...provided,
					cursor: "pointer",
					borderRadius: "9999px", // Make the cross button rounded
					marginLeft: "2px",
					":hover": {
						backgroundColor: "black",
						color: "white",
					},
				}),
			}}
		/>
	);
};
export default Select;
