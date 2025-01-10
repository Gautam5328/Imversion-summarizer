from flask import Flask, request, jsonify
from langchain.llms import OpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('content')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        llm = OpenAI(openai_api_key=OPENAI_API_KEY, temperature=0.7)
        
        documents = [Document(page_content=text)]
        
        chain = load_summarize_chain(llm, chain_type="map_reduce")
        summary = chain.run(documents)
        
        return jsonify({"summary": summary})
    except Exception as e:
        print(f"Error during summarization: {e}")
        return jsonify({"error": e}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
