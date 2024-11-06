import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Box } from '@mui/material';
import SearchBar from '../../TableHeader/SearchBar';
import Loader from '../../common/Loader';

const ElectionTable = ({ elections, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      name: 'Election Name',
      selector: row => row.name,
    },
    {
      name: 'Date',
      selector: row => row.date,
    },
    {
      name: 'Status',
      selector: row => row.status,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Button
            variant="contained"
            onClick={() => onEdit(row)} // Trigger the edit function passed from parent
          >
            Edit
          </Button>
          <Button
            color="error"
            onClick={() => onDelete(row.id)} // Trigger the delete function passed from parent
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const filteredData = elections.filter(election =>
    election.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {!elections ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          // customStyles={customStyles} // Apply custom styles if needed
        />
      )}
    </Box>
  );
};

export default ElectionTable;
