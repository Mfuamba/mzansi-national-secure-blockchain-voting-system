import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Box, Typography } from '@mui/material';
import SearchBar from '../../TableHeader/SearchBar';
import Loader from '../../common/Loader';

const PartyOverview = ({ party, onEdit, onDelete, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      name: 'Party Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Party Registration Number',
      selector: row => row.regNum,
      sortable: true,
    },
    {
      name: 'Election',
      selector: row => row.election?.name || 'N/A',
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Button 
            variant="contained" 
            onClick={() => onEdit(row)} 
          >
            Edit
          </Button>
          <Button 
            color="error" 
            onClick={() => onDelete(row.id)} 
          >
            Delete
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredParties = party.filter(party =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <h3>Current Political Parties</h3>
      <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

      {loading ? (
        <Loader />
      ) : filteredParties.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredParties}
          pagination
          highlightOnHover
          striped
        />
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No political parties available
        </Typography>
      )}
    </Box>
  );
};

export default PartyOverview;
