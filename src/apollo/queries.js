// src/apollo/queries.js
import { gql } from '@apollo/client';
//DONE
export const VERIFY_ID = gql`
  query VerifyID($id: String!) {
    verifyID(id: $id)
  }
`
//DONE
export const GET_ELECTIONS = gql`
  query GetElections {
    elections {
      id
      name
      description
      startDate
      endDate
      status
      type
    }
  }
`
export const GET_VOTING_HISTORY = gql`
  query GetVotingHistory {
    votingHistory {
      id
      election {
        name
      }
      choice
      date
    }
  }
`

export const GET_CANDIDATES = gql`
query GetCandidates {
  candidates {
      id
      name
      identityNo
      age
      email
      party {
          name
          partyAbbrev
      }
      election {
          name
          id
      }
  }
}`
export const GET_CURRENT_VOTERS = gql`
    query GetCurrentVoters {
        currentVoters {
            idNumber
            name
            hasVoted
            surname
            email
        }
    }
`
//DONE
export const GET_PARTIES = gql`
  query GetParties {
  parties {
    id
    name
    regNum
    partyAbbrev
    description
    officeTel
    election {
      id
      name 
      }
    }
  }
`

export const GET_USERS = gql`
query GetUser($userId: ID!) {
  user(id: $userId) {
    hasVoted
    name
    email
    role
  }
}`
;

