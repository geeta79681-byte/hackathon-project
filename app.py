from flask import Flask, request
from flask_cors import CORS
from agent import generate_question, evaluate_answer

app = Flask(__name__)
CORS(app)

@app.post("/api/question")
def get_question():
    data = request.json

    role = data["role"]
    interview_type = data["interview_type"]
    difficulty = data["difficulty"]

    question = generate_question(
        role,
        interview_type,
        difficulty
    )

    return {"question": question}


@app.post("/api/evaluate")
def evaluate():
    data = request.json

    role = data["role"]
    interview_type = data["interview_type"]
    difficulty = data["difficulty"]
    question = data["question"]
    user_answer = data["user_answer"]

    feedback = evaluate_answer(
        role,
        interview_type,
        difficulty,
        question,
        user_answer
    )

    return {"feedback": feedback}


if __name__ == "__main__":
    app.run(debug=True)