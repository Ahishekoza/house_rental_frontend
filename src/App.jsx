import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slice/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      dispatch(setUser(user));
    }
  });

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
    </Routes>
  );
};

export default App;
