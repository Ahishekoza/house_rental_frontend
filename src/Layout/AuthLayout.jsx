/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
// @TODO :-- Show the message when user tries to book the property without logging in
const AuthLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <>{children}</>
  ) : (
    <div className="h-screen w-full flex justify-center items-center">
      <span className="text-2xl">FIRST LOGIN TO CHECKOUT</span>
    </div>
  );
};

export default AuthLayout;
