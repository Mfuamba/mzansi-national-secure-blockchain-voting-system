import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Box, Typography } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CANDIDATES } from '../../../apollo/queries';
import { DELETE_CANDIDATE } from '../../../apollo/mutations';
import SearchBar from '../../TableHeader/SearchBar';
import Loader from '../../common/Loader';
import '../styles/CandManagement.css';

const CandidateOverview = ({ candidates, onEdit, onDelete, loading}) => {
    const [deleteCandidate] = useMutation(DELETE_CANDIDATE);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (candidateId) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            deleteCandidate({ variables: { candidateId } });
        }
    };

    const columns = [
        {
            name: 'Candidate Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Party',
            selector: row => row.party?.name || 'N/A',
            sortable: true,
        },
        {
            name: 'Election',
            selector: row => row.election?.name || 'N/A',
            sortable: true,
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

    // Filter candidates based on the search query
    const filteredCandidates = candidates.filter(candidates =>
        candidates.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <Box>
            <h3>Candidate Overview</h3>
            <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

            {loading ? (
                <Loader />
            ) : filteredCandidates.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={filteredCandidates}
                    pagination
                    highlightOnHover
                    striped
                />
            ) : (
                <Typography variant="h6" align="center" color="textSecondary">
                    No candidates available
                </Typography>
            )}
        </Box>
    );
};

export default CandidateOverview;
