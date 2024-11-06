import React, { useState } from 'react';
import ElectionTypeSelector from './ElectionTypeSelector';
import { useMutation } from '@apollo/client';
import { CREATE_ELECTION } from '../../../apollo/mutations';

const CreateElectionForm = ({ electionType, addElection, refetchElections }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [createElection] = useMutation(CREATE_ELECTION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createElection({
        variables: {
          input: {
            name,
            description,
            startDate,
            endDate,
            type: electionType,
          },
        },
      });

      const newElection = data.createElection;
      addElection(newElection); // Call the addElection function passed from the parent
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setSuccess(true);

      refetchElections(); // Refetch the updated list of elections
    } catch (error) {
      console.error('Error creating election:', error);
      alert('Failed to create election. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Election</h2>
        <ElectionTypeSelector
          selectedElectionType={electionType}
          setSelectedElectionType={() => {}} // Prevent change, already managed in parent
        />
        <input
          type="text"
          placeholder="Election Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Create Election</button>
      </form>
      {success && <div className="alert-popup">Election created successfully!</div>}
    </div>
  );
};

export default CreateElectionForm;
