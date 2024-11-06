import { gql } from '@apollo/client';

//DONE
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`
//DONE
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!, $walletAddress: String!) {
    loginUser(email: $email, password: $password, walletAddress: $walletAddress) {
      token
      user {
        id
        email
        role
      }
    }
  }`
//DONE
  export const CREATE_PARTY = gql`
  mutation CreateParty($name: String!, $logo: String, $regNum: String!, $partyAbbrev: String!, $election: ID!, $description: String, $officeTel: String!) {
    createParty(name: $name, logo: $logo, regNum: $regNum, partyAbbrev: $partyAbbrev, election: $election, description: $description, officeTel: $officeTel) {
      id
      name
      partyAbbrev
      regNum
      election {
        id
        name
      }
      description
      logo
      officeTel
      createdAt
    }
  }
`

  export const UPDATE_PARTY = gql`
  mutation UpdateParty($partyId: ID!, $partyname: String!, $regnum: String!) {
    updateParty(partyId: $partyId, partyname: $partyname, regnum: $regnum) {
      token
      user {
        id
        email
        role
      }
    }
  }`

  export const DELETE_PARTY = gql`
  mutation DeleteParty($partyId: ID!) {
      deleteParty(partyId: $partyId) {
          id
      }
  }`

  export const UPDATE_CANDIDATE = gql `
  mutation UpdateCandidate($candidateId: ID!, $name: String!) {
    updateCandidate(candidateId: $candidateId, name: $name) {
        id
        name
    }
}`

  export const CREATE_CANDIDATE = gql`
  mutation CreateCandidate($election: ID!, $party: ID!, $name: String!, $email: String!, $age: String!, $identityNo: String!) {
  createCandidate(election: $election, party: $party, name: $name, email: $email, age: $age, identityNo: $identityNo) {
    id
    name
    email
    age
    identityNo
    party {
      name
    }
    election {
      name
    }
  }
}
`
export const CAST_VOTE = gql`
mutation CastVote($electionId: String!, $candidateId: String!, $walletAddress: String!) {
  castVote(electionId: $electionId, candidateId: $candidateId, walletAddress: $walletAddress) {
    success
    message
  }
}`


export const DELETE_CANDIDATE = gql`
mutation DeleteCandidate($candidateId: ID!) {
    deleteCandidate(candidateId: $candidateId) {
        id
    }
}`

export const DELETE_ELECTION = gql`
  mutation DeleteElection($id: ID!) {
    deleteElection(id: $id) {
      success
      message
    }
  }
`

export const CREATE_VOTER = gql`
    mutation CreateVoter($name: String!, $surname: String!, $idNumber: String!, $email: String!) {
        createVoter(name: $name, surname: $surname, idNumber: $idNumber, email: $email) {
            idNumber
            name
            surname
            email
        }
    }`
  
    // DONE
export const CREATE_ELECTION = gql`
    mutation CreateElection($input: CreateElectionInput!) {
      createElection(input: $input) {
        id
        name
        startDate
        endDate
        status
        type
      }
    }
  `
;
