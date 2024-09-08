import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./api/UserApi";
import { clearUser } from "./slice/authSlice";
import { clearQuery } from "./slice/querySlice";
import SinglePropertyPage from "./pages/SinglePropertyPage";
import SuccessPage from "./pages/SuccessPage";
import FailedTransactionPage from "./pages/FailedTransactionPage";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const { success } = await verifyToken(user?.accessToken);
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
      <Route path="/SuccessFullCheckOut/:propertyId" exact element={<SuccessPage/>}/>
      <Route path="/FailedCheckOut" exact element={<FailedTransactionPage/>}/>
    </Routes>
  );
};

export default App;
