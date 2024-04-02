import logo from "./logo.svg";
import "./App.css";

import TodoApp from "./Component/TodoApp/TodoApp";
import TodoList from "./Component/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <TodoApp />
      <TodoList />
    </div>
  );
}

export default App;
