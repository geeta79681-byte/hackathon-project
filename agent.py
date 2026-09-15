import requests


OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"


def ask_ai(prompt):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()
    return response.json()["response"]


def generate_question(role, interview_type, difficulty):
    prompt = f"""
You are an AI Interview Coach.

Generate ONE interview question for a candidate applying for:
Role: {role}
Interview Type: {interview_type}
Difficulty: {difficulty}

Rules:
- Ask only one question.
- Make it realistic for a job interview.
- Do not give the answer.
- Keep the question clear and concise.

Return only the interview question.
"""

    return ask_ai(prompt)


def evaluate_answer(role, interview_type, difficulty, question, user_answer):
    prompt = f"""
You are an AI Interview Coach evaluating a candidate.

Role: {role}
Interview Type: {interview_type}
Difficulty: {difficulty}

Question:
{question}

Candidate's Answer:
{user_answer}

Evaluate the candidate's answer.

Give feedback in this format:

Score: X/10

What you did well:
- Point 1
- Point 2

What you can improve:
- Point 1
- Point 2

Better answer:
Give a short example of a strong answer.

Tip:
Give one useful interview tip.

Be encouraging and suitable for a college student.
"""

    return ask_ai(prompt)
if __name__ == "__main__":
    print("=" * 50)
    print("AI INTERVIEW PREPARATION COACH")
    print("=" * 50)

    role = input("Enter your target role: ")
    interview_type = input("Enter interview type (Technical/HR): ")
    difficulty = input("Enter difficulty (Easy/Medium/Hard): ")

    print("\nGenerating question...\n")

    question = generate_question(
        role,
        interview_type,
        difficulty
    )

    print("INTERVIEWER:")
    print(question)

    user_answer = input("\nYOUR ANSWER:\n")

    print("\nEvaluating your answer...\n")

    feedback = evaluate_answer(
        role,
        interview_type,
        difficulty,
        question,
        user_answer
    )

    print("\n" + "=" * 50)
    print("AI FEEDBACK")
    print("=" * 50)
    print(feedback)