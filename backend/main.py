import os
import openai
from fastapi import FastAPI
from pydantic import BaseModel
from metaphor_python import Metaphor
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.environ.get("OPEN_AI_API_KEY")


class Context(BaseModel):
    company_name: str
    user_context: str


app = FastAPI()
client = Metaphor(api_key=os.environ.get("METAPHOR_API_KEY"))


def get_company_information(company_name):
    response = client.search(
        f"Here is information all about the company {company_name}:",
        use_autoprompt=True,
        num_results=2,
    )
    contents_res = response.get_contents()

    # Create list of results
    res = ""
    for content in contents_res.contents:
        res += f"\nTitle: {content.title}\nURL: {content.url}\nContent:\n{content.extract}\n"
    return res


def clean_company_information(information, company_name):
    my_prompt = f"Below are HTML formatted articles potentially information about the company {company_name}. Generate for me a summary of information about the company {company_name} detailing what the company does: {information}"
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": my_prompt},
        ],
        n=1,
        max_tokens=3000,
    )
    print(completion.usage)
    print(completion.choices[0].message.content)
    return {"name": company_name, "info": completion.choices[0].message.content}


def generate_cover_letter(company_info):
    my_prompt = f"Below is information about the company {company_info['name']}. Please generate a cover letter for me that I can use to apply for a job at this company: {company_info['info']}"
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": my_prompt},
        ],
        n=1,
        max_tokens=3000,
    )
    print(completion.usage)
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/generate/")
async def root(context: Context):
    company_info = get_company_information(context.company_name)
    print(company_info)
    clean_info = clean_company_information(company_info, context.company_name)
    cover_letter = generate_cover_letter(clean_info)
    return cover_letter
