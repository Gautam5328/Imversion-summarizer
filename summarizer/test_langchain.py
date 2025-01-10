from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = OpenAI(api_key=OPENAI_API_KEY, temperature=0.7)
summarization_prompt = PromptTemplate(
    input_variables=["text"],
    template="Please provide a concise summary of the following text:\n\n{text}\n\nSummary:"
)

summarization_chain = LLMChain(llm=llm, prompt=summarization_prompt)

text = """
LangChain is a framework for developing applications powered by language models. 
It enables developers to build systems that are context-aware and capable of performing 
complex tasks, including summarization, Q&A, and reasoning.
"""

summary = summarization_chain.run(text)
print("Summary:", summary)
