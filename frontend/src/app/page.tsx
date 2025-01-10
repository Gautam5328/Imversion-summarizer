"use client";

import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  LIST_DOCUMENTS,
  GET_DOCUMENT_DETAILS,
  SUMMARIZE_DOCUMENT,
} from "../graphql/queries";


const HomeStyles = {
  buttonStyles: {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 5,
    marginTop: 20,
  },
};

export default function Home() {
  // Query calls
  const {
    data: documentsData,
    loading: documentsLoading,
    error: documentsError,
  } = useQuery(LIST_DOCUMENTS);
  const [
    getDocumentDetails,
    { data: documentDetails, loading: detailsLoading, error: detailsError },
  ] = useLazyQuery(GET_DOCUMENT_DETAILS);
  const [
    summarizeDocument,
    { data: summaryData, loading: summaryLoading, error: summaryError },
  ] = useLazyQuery(SUMMARIZE_DOCUMENT);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );

  const handleDocumentSelect = (id: string) => {
    setSelectedDocumentId(id);
    getDocumentDetails({ variables: { id } });
  };

  const handleRequestSummary = () => {
    if (selectedDocumentId) {
      summarizeDocument({ variables: { id: selectedDocumentId } });
    }
  };

  if (documentsLoading) return <p>Loading documents...</p>;
  if (documentsError)
    return <p>Error loading documents: {documentsError.message}</p>;

  return (
    <div style={{ margin: 10 }}>
      <h1>Documents</h1>
      <ul style={{ marginTop: 10 }}>
        {documentsData.listDocuments.map(
          (doc: { id: string; title: string }) => (
            <li
              key={doc.id}
              onClick={() => handleDocumentSelect(doc.id)}
              style={{
                cursor: "pointer",
                margin: 5,
                textDecoration: "underline",
              }}
            >
              {doc.id} <span style={{ marginLeft: 20 }}>{doc.title}</span>
            </li>
          )
        )}
      </ul>

      {detailsLoading && <p>Loading document details...</p>}
      {detailsError && <p>Error loading details: {detailsError.message}</p>}
      {documentDetails && (
        <div style={{ marginTop: 30 }}>
          <h2>Document Details</h2>
          <div style={{ marginTop: 10 }}>
            <p>
              <strong>Title:</strong> {documentDetails.getDocumentDetails.title}
            </p>
            <p>
              <strong>Content:</strong>{" "}
              {documentDetails.getDocumentDetails.content}
            </p>
            <button
              onClick={handleRequestSummary}
              style={HomeStyles.buttonStyles}
              disabled={summaryLoading}
            >
              {summaryLoading ? "Summarizing..." : "Fetch Summary"}
            </button>
          </div>
        </div>
      )}

      {summaryError && (
        <p>Error summarizing document: {summaryError.message}</p>
      )}
      {summaryData && (
        <div>
          <h3>Summary</h3>
          <p>{summaryData.summarizeDocument.summary}</p>
        </div>
      )}
    </div>
  );
}
