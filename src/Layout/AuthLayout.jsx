/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
;

// @TODO :-- Show the message when user tries to book the property without logging in
const AuthLayout = ({children}) => {
  const user = useSelector((state) => state.auth.user);

  return user ? <>{children}</> : <><span>FIRST LOGIN TO CHECKOUT</span></> ;
};

export default AuthLayout;
