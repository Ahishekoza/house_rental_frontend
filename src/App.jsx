import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./api/UserApi";
import { clearUser } from "./slice/authSlice";
import { clearQuery } from "./slice/querySlice";
import SinglePropertyPage from "./pages/SinglePropertyPage";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const { success } = await verifyToken(user?.accessToken);
        console.log(success);
        if (!success) {
          dispatch(clearUser());
          dispatch(clearQuery());
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
      }
    };

    if (user?.accessToken) {
      checkTokenValidity();
    }
  }, [user?.accessToken, dispatch]);

  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/:propertyId" exact element={<SinglePropertyPage />} />
    </Routes>
  );
};

export default App;
