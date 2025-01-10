const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const axios = require('axios');
const documents = require('./data')

// GraphQL schema
const typeDefs = gql`
  scalar ID

  type Document {
    id: ID!
    title: String!
    content: String!
  }

  type Summary {
    summary: String!
  }

  type Query {
    listDocuments: [Document!]!
    getDocumentDetails(id: ID!): Document
    summarizeDocument(id: ID!): Summary
  }
`;


// GraphQL resolvers
const resolvers = {
  Query: {
    listDocuments: () => documents,
    getDocumentDetails: (_, { id }) => documents.find(doc => doc.id === id),
    summarizeDocument: async (_, { id }) => {
      const doc = documents.find(doc => doc.id === id);
      if (!doc) throw new Error('Document not found');

      try {
        const response = await axios.post('http://127.0.0.1:5000/summarize', {
          content: doc.content
        });
        
        return { summary: response.data.summary };
      } catch (error) {
        console.error('Error calling summarizer API:', error);
        throw new Error(error);
      }
    },

  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  );
});
