import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Book Name</th>
          <th>ISBN Code</th>
          <th>Author Name</th>
          <th>Author Email</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item['Book Name']}</td>
            <td>{item['ISBN Code']}</td>
            <td>{item['Author Name']}</td>
            <td>{item['Author Email']}</td>
            <td>{item['Date of Birth']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
