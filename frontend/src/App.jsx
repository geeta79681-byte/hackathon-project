import { useState } from "react";
const API_URL = "http://127.0.0.1:5000";
import "./App.css";

const questions = [
  "Tell me about yourself and your technical background.",
  "What is the difference between a stack and a queue?",
  "Explain Object-Oriented Programming in simple terms.",
  "What is a REST API?",
  "What are your strengths as a software engineering student?",
];

function App() {
   const [page, setPage] = useState("home");
   const [questionIndex, setQuestionIndex] = useState(0);
   const [answer, setAnswer] = useState("");
   const [score, setScore] = useState(0);
   const [answers, setAnswers] = useState([]);

   const [role, setRole] = useState("");
   const [interviewType, setInterviewType] = useState("Technical");
   const [difficulty, setDifficulty] = useState("easy");

   const [currentQuestion, setCurrentQuestion] = useState("");
   const [feedback, setFeedback] = useState("");
   const [loading, setLoading] = useState(false);

  const startInterview = async () => {
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        interview_type: interviewType,
        difficulty: difficulty,
      }),
    });

    const data = await response.json();

    setCurrentQuestion(data.question);
    setQuestionIndex(0);
    setAnswer("");
    setAnswers([]);
    setScore(0);
    setPage("interview");
  } catch (error) {
    console.error(error);
    alert("Could not connect to the AI backend. Make sure Flask and Ollama are running.");
  } finally {
    setLoading(false);
  }
};

  const submitAnswer = async () => {
  if (!answer.trim()) {
    alert("Please write an answer first.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        interview_type: interviewType,
        difficulty: difficulty,
        question: currentQuestion,
        user_answer: answer,
      }),
    });

    const data = await response.json();

    setFeedback(data.feedback);

    const match = data.feedback.match(/Score:\s*(\d+)\/10/i);
    const currentScore = match ? Number(match[1]) : 0;

    setScore(currentScore);

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        answer: answer,
        score: currentScore,
      },
    ]);

    setPage("feedback");
  } catch (error) {
    console.error(error);
    alert("Could not connect to the AI backend.");
  } finally {
    setLoading(false);
  }
}; 

  const nextQuestion = async () => {
  if (questionIndex === 4) {
    setPage("report");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        interview_type: interviewType,
        difficulty: difficulty,
      }),
    });

    const data = await response.json();

    setCurrentQuestion(data.question);
    setQuestionIndex(questionIndex + 1);
    setAnswer("");
    setPage("interview");
  } catch (error) {
    console.error(error);
    alert("Could not generate the next question.");
  } finally {
    setLoading(false);
  }
};
 

  const practiceAgain = () => {
    setQuestionIndex(0);
    setAnswer("");
    setAnswers([]);
    setScore(0);
    setPage("setup");
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <button
          className="logo-button"
          onClick={() => setPage("home")}
        >
          InterVue<span>-AI</span>
        </button>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("setup")}>
            Practice
          </button>

          <button onClick={() => setPage("report")}>
            Progress
          </button>
        </div>

        <button
          className="nav-start"
          onClick={() => setPage("setup")}
        >
          Start Interview
        </button>

      </nav>


      {/* HOME PAGE */}
      {page === "home" && (
        <main>

          <section className="hero">

            <div className="hero-content">

              <div className="badge">
                ✨ AI-POWERED INTERVIEW PREPARATION
              </div>

              <h1>
                Ace Your
                <br />
                <span>Next Interview.</span>
              </h1>

              <p>
                Practice realistic interviews, receive instant
                AI feedback and improve your interview skills.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={() => setPage("setup")}
                >
                  Get Started →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setPage("setup")}
                >
                  Practice Interview
                </button>

              </div>

              <div className="trust">
                ✓ Technical Questions
                <span>✓ HR Questions</span>
                <span>✓ Instant Feedback</span>
              </div>

            </div>


            <div className="mock-card">

              <div className="mock-top">
                <span>● AI Interviewer</span>
                <span>01 / 05</span>
              </div>

              <div className="ai-circle">
                AI
              </div>

              <h3>
                Tell me about yourself and your technical
                background.
              </h3>

              <div className="fake-answer">
                I'm a computer science student passionate
                about software development and AI...
              </div>

              <div className="mock-line">
                <div></div>
              </div>

              <small>
                AI is evaluating your response...
              </small>

            </div>

          </section>


          {/* FEATURES */}
          <section className="features">

            <h2>
              Everything You Need to Prepare
            </h2>

            <div className="feature-grid">

              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>AI Mock Interviews</h3>
                <p>
                  Practice realistic technical and HR
                  interview questions.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Feedback</h3>
                <p>
                  Receive feedback on your answers and
                  communication.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Track Progress</h3>
                <p>
                  Monitor your performance and improve
                  consistently.
                </p>
              </div>

            </div>

          </section>


          {/* HOW IT WORKS */}
          <section className="how">

            <h2>How InterVue-AI Works</h2>

            <div className="steps">

              <div>
                <strong>01</strong>
                <h3>Choose</h3>
                <p>Select your interview type.</p>
              </div>

              <div>
                <strong>02</strong>
                <h3>Practice</h3>
                <p>Answer AI-generated questions.</p>
              </div>

              <div>
                <strong>03</strong>
                <h3>Improve</h3>
                <p>Get instant feedback.</p>
              </div>

            </div>

          </section>

        </main>
      )}


      {/* SETUP PAGE */}
      {page === "setup" && (
        <main className="page">

          <div className="setup-card">

            <div className="badge">
              STEP 1
            </div>

            <h1>
              Set Up Your Interview
            </h1>

            <p>
              Customize your interview before starting.
            </p>

            <label>
              Interview Domain
            </label>

            <div className="choices">

              <button className="choice active">
                Software Engineering
              </button>

              <button className="choice">
                Core Engineering
              </button>

              <button className="choice">
                Management / HR
              </button>

            </div>


            <label>
              Difficulty
            </label>

            <div className="choices">

              <button className="choice active">
                Beginner
              </button>

              <button className="choice">
                Intermediate
              </button>

              <button className="choice">
                Advanced
              </button>

            </div>


            <label>
              Resume / Skills / Projects
            </label>

            <textarea
              placeholder="Paste your skills, projects, internship details or resume information here..."
            ></textarea>


            <button
              className="primary-btn big-btn"
              onClick={startInterview}
            >
              Start Interview →
            </button>

          </div>

        </main>
      )}


      {/* INTERVIEW PAGE */}
      {page === "interview" && (
        <main className="page">

          <div className="interview-card">

            <div className="interview-header">

              <div>
                <div className="badge">
                  AI INTERVIEWER
                </div>

                <h1>
                  Question {questionIndex + 1} / {questions.length}
                </h1>
              </div>

              <div className="progress-number">
                {Math.round(
                  ((questionIndex + 1) /
                    questions.length) *
                    100
                )}%
              </div>

            </div>


            <div className="question">

              <div className="ai-circle large">
                AI
              </div>

              <p className="question-label">
                INTERVIEW QUESTION
              </p>

              <h2>
                {currentQuestion}
              </h2>

            </div>


            <textarea
              className="answer"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>


            <div className="answer-bottom">

              <span>
                {answer.length} characters
              </span>

              <button
                className="primary-btn"
                onClick={submitAnswer}
              >
                Submit Answer →
              </button>

            </div>

          </div>

        </main>
      )}


      {/* FEEDBACK PAGE */}
      {page === "feedback" && (
        <main className="page">

          <div className="feedback-card">

            <div className="badge">
              AI FEEDBACK
            </div>

            <h1>
              Here's How You Did
            </h1>

            <div className="main-score">
              {score}
              <small>/10</small>
            </div>

            <h2>
              {score >= 8
                ? "Excellent Answer!"
                : "Good Attempt!"}
            </h2>

            <div className="scores">

              <div>
                <strong>{score}/10</strong>
                <span>Technical</span>
              </div>

              <div>
                <strong>{score}/10</strong>
                <span>Communication</span>
              </div>

              <div>
                <strong>{Math.max(score - 1, 1)}/10</strong>
                <span>Confidence</span>
              </div>

            </div>


            <div className="feedback-columns">

               <div>
              <h3>🤖 AI Feedback</h3>
              <p style={{ whiteSpace: "pre-line" }}>{feedback}</p>
              </div>

            </div>


            <div className="better-answer">

              <h3>
                💡 Suggested Improvement
              </h3>

              <p>
                Start with a clear definition, explain the
                main concept and then provide a practical
                example.
              </p>

            </div>


            <button
              className="primary-btn"
              onClick={nextQuestion}
            >
              {questionIndex === questions.length - 1
                ? "View Final Report →"
                : "Next Question →"}
            </button>

          </div>

        </main>
      )}


      {/* REPORT */}
      {page === "report" && (
        <main className="page">

          <div className="report-card">

            <div className="badge">
              INTERVIEW COMPLETE
            </div>

            <h1>
              Your Interview Report
            </h1>

            <p>
              Great job completing your practice interview!
            </p>

            <div className="main-score">
              {score}
              <small>/10</small>
            </div>

            <div className="report-stats">

              <div>
                <strong>{questions.length}</strong>
                <span>Questions</span>
              </div>

              <div>
                <strong>{score}/10</strong>
                <span>Average Score</span>
              </div>

              <div>
                <strong>{score * 10}%</strong>
                <span>Readiness</span>
              </div>

            </div>


            <div className="report-text">

              <h2>
                Personalized Recommendations
              </h2>

              <p>
                Keep practicing technical and HR questions.
                Focus on structuring your answers clearly
                and supporting them with practical examples.
              </p>

            </div>


            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={practiceAgain}
              >
                Practice Again →
              </button>

              <button
                className="secondary-btn"
                onClick={() => setPage("home")}
              >
                Back to Home
              </button>

            </div>

          </div>

        </main>
      )}

    </div>
  );
}

export default App;