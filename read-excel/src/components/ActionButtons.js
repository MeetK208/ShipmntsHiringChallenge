import React from "react";

const ActionButtons = ({ onSave, onCancel }) => {
  return (
    <div>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ActionButtons;
