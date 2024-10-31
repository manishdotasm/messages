"use client ";
import React, { useState } from "react";

interface Option {
	value: string;
	label: string;
}

interface DropdownMultiselectProps {
	options: Option[];
	placeholder?: string;
}

const DropdownMultiselect: React.FC<DropdownMultiselectProps> = ({ options, placeholder }) => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleOption = (value: string) => {
		setSelectedOptions((prev) => (prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]));
	};

	const handleToggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="relative w-64">
			<button className="w-full p-3 bg-gray-800 text-white rounded shadow-md border border-gray-600" onClick={handleToggleDropdown}>
				{selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder || "Select options"}
			</button>
			{isOpen && (
				<div className="absolute z-10 w-full bg-gray-900 rounded shadow-lg border border-gray-600 mt-1">
					{options.map((option) => (
						<div key={option.value} className={`p-2 cursor-pointer hover:bg-gray-700 ${selectedOptions.includes(option.value) ? "bg-gray-700" : ""}`} onClick={() => toggleOption(option.value)}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DropdownMultiselect;
