import { gql } from '@apollo/client';

export const LIST_DOCUMENTS = gql`
  query ListDocuments {
    listDocuments {
      id
      title
    }
  }
`;

export const GET_DOCUMENT = gql`
  query GetDocument($id: String!) {
    getDocument(id: $id)
  }
`;


export const GET_DOCUMENT_DETAILS = gql`
  query GetDocumentDetails($id: ID!) {
    getDocumentDetails(id: $id) {
      id
      title
      content
    }
  }
`;

export const SUMMARIZE_DOCUMENT = gql`
  query SummarizeDocument($id: ID!) {
    summarizeDocument(id: $id) {
      summary
    }
  }
`;
