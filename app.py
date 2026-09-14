from flask import Flask, request
from agent import solve_problem

app = Flask(__name__)

@app.post("/api/solve")
def solve():
    problem = request.json["problem"]
    answer = solve_problem(problem)
    return {"answer": answer}

if __name__ == "__main__":
    app.run(debug=True)