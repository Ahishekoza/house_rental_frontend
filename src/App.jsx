import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./api/UserApi";
import { clearUser } from "./slice/authSlice";
import { clearQuery } from "./slice/querySlice";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const { success } = await verifyToken(user?.accessToken);

      if (!success) {
        dispatch(clearUser());
        dispatch(clearQuery());
      }
    };

    if (user?.accessToken) {
      checkTokenValidity();
    }
  }, [user?.accessToken, dispatch]);

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
    </Routes>
  );
};

export default App;
