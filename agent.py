import requests

def solve_problem(problem):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2",
            "prompt": problem,
            "stream": False
        }
    )

    print(response.text)
    return response.json()["response"]

print("TEST:", solve_problem("Say hello in one sentence."))