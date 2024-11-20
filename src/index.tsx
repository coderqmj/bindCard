import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tea-component/dist/tea.css";
import "@mantine/core/styles.css";

// const root = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// const root = document.getElementById("root")!;
// ReactDOM.render(<App />, root, () => {
//   console.log("渲染完成");
// });

// ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
