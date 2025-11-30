import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        setToken(data.token);
      } catch (e) {
        console.error("Failed to fetch OpenTDB token", e);
      }
    };
    init();
  }, []);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const amount = Number(localStorage.getItem("questionAmount")) || 10;

    const base = `https://opentdb.com/api.php?amount=${amount}${
      category ? `&category=${category}` : ""
    }${difficulty ? `&difficulty=${difficulty}` : ""}&type=multiple&encode=url3986${
      token ? `&token=${token}` : ""
    }`;

    const { data } = await axios.get(base);

    if (data.response_code === 4 && token) {
      await axios.get(
        `https://opentdb.com/api_token.php?command=reset&token=${token}`
      );
      const retry = await axios.get(base);
      setQuestions(retry.data.results);
      return;
    }

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
          </Route>
          <Route path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/result">
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
