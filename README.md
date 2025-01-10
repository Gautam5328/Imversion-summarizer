Project setup

------------------------------------

frontend - nextjs code with typescript
run on http://localhost:3000
use node version >= 18.18.0 

commands - 
npm install - install the required frontend dependecies 
npm run dev - run frontend project

------------------------------------

backend - nodejs with graphql
used apollo-server-express and express for creating server
runs on http://localhost:4000/graphql

commands - 
npm install - install the required backend dependecies 
npm start - run backend project

------------------------------------

summarizer - python code for langchain service
used flask to create route /summarize which summarizes the text and returns to backend service
runs on http://127.0.0.1:5000

*** NOTE ****
Please add your OPENAI_API_KEY api key to .env file in summarizer folder as my api limits have been reached 

commands - 
source venv/bin/activate - Activate the Virtual Environment
pip install
python app.py - run python project 

