import React from 'react';

const Cell = ({ value, isFixed, onChange }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      value={value === 0 ? '' : value}
      min="1"
      max="9"
      readOnly={!isFixed}
      onChange={handleChange}
      style={{
        backgroundColor: isFixed ? 'white' : '#8fa9bf',
      }}
    />
  );
};

export default Cell;
