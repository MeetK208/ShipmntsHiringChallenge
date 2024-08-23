// src/App.js
import React, { useState } from "react";
import UploadButton from "./components/UploadButton";
import DataTable from "./components/DataTable";
import ActionButtons from "./components/ActionButtons";

const App = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (uploadedData) => {
    setData(uploadedData);
  };

  const handleSave = () => {
    // Logic to save data
    console.log("Data saved:", data);
  };

  const handleCancel = () => {
    setData([]); // Clear data
  };

  return (
    <div>
      <UploadButton onFileUpload={handleFileUpload} />
      {data.length > 0 && <DataTable data={data} />}
      {data.length > 0 && (
        <ActionButtons onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default App;
