// src/apollo/queries.js
import { gql } from '@apollo/client';
//DONE
export const VERIFY_ID = gql`
  query VerifyID($id: String!) {
    verifyID(id: $id)
  }
`
export const GET_ELECTIONS = gql`
  query GetElections {
    elections {
      id
      title
      description
    }
  }
`;

export const GET_VOTING_HISTORY = gql`
  query GetVotingHistory {
    votingHistory {
      id
      election {
        title
      }
      choice
      date
    }
  }
`;
