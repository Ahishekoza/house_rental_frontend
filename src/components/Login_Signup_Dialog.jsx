import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  deleteUser,
  loginUser,
  setPassworrd,
  verifyEmail,
  verifyOTP,
} from "@/api/UserApi";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useDispatch } from "react-redux";
import { setUser } from "@/slice/authSlice";
import { Spinner } from "./ui/Spinner";
import { maskEmail } from "@/extrautilities";
import { useToast } from "../hooks/use-toast";

const Login_Signup_Dialog = () => {
  const dispatch = useDispatch();
 const {toast}  = useToast()

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    otp_send: false,
    otp: "",
    verified: false,
    password: "",
    user_present: false,
    user_present_password_verification: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dialogTitle =
    userInfo.verified ||
    (userInfo.user_present && userInfo.user_present_password_verification)
      ? "Entire your password"
      : userInfo.otp_send
      ? "Confirm your email"
      : userInfo.user_present
      ? "Email address is already registered"
      : "Log in or Sign up";

  // ---Dialog Close
  const handleDialogOpen = async (isOpen) => {
    setIsOpen(isOpen); // Set open state first

    if (!isOpen && userInfo?.email !== "" && !userInfo?.user_present) {
      const { success } = await deleteUser(userInfo.email);
      if (success) {
        setUserInfo({
          email: "",
          otp_send: false,
          otp: "",
          verified: false,
          password: "",
          user_present: false,
          user_present_password_verification: false,
        });
      }
    } else {
      setUserInfo({
        email: "",
        otp_send: false,
        otp: "",
        verified: false,
        password: "",
        user_present: false,
        user_present_password_verification: false,
      });
    }
  };

  // --- Initial step for the Registration
  const handleOTP = async () => {
    setIsLoading(true);
    try {
      const response = await verifyEmail(userInfo.email);
      if (response.success) {
        setUserInfo({ ...userInfo, otp_send: true });
      }
      if (response.existingUser?.verified) {
        setUserInfo({
          ...userInfo,
          user_present: true,
          email: response.existingUser.email,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- Next Step for the Email verification via OTP
  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      const { verified } = await verifyOTP(userInfo.email, userInfo.otp);
      if (verified) {
        setUserInfo({ ...userInfo, verified: true, otp_send: false });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- verifying the user and setting the password
  const handleRegisterUser = async () => {
    setIsLoading(true);
    try {
      const { success } = await setPassworrd(userInfo.email, userInfo.password);
      if (success) {
        const { loggedInUser } = await loginUser(
          userInfo.email,
          userInfo.password
        );
        dispatch(setUser(loggedInUser));
        setUserInfo({});
        setIsOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- login function for existing user
  const handleUserLogin = async () => {
    setIsLoading(true);
    try {
      setUserInfo({ ...userInfo, user_present_password_verification: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserPasswordVerification = async () => {
    setIsLoading(true)
    try {
      const { loggedInUser } = await loginUser(
        userInfo.email,
        userInfo.password
      );
      dispatch(setUser(loggedInUser));
      setUserInfo({});
      setIsOpen(false);
      toast({
        color: "bg-green-700",
        description: "User Logged In Successfully !",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderButtonContent = () => {
    const content =
      userInfo.otp_send && !userInfo.verified
        ? "Verify"
        : userInfo.verified ||
          (userInfo.user_present && userInfo.user_present_password_verification)
        ? "Confirm"
        : "Continue";

    const handleClick =
      userInfo.otp_send && !userInfo.verified
        ? handleVerifyOTP
        : userInfo.verified
        ? handleRegisterUser
        : userInfo.user_present && !userInfo.user_present_password_verification
        ? handleUserLogin
        : userInfo.user_present && userInfo.user_present_password_verification
        ? handleUserPasswordVerification
        : handleOTP;

    return (
      <span onClick={handleClick}>
        {isLoading && <Spinner className={"text-white"} size={"small"} />}
        {content}
      </span>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex flex-col gap-2">
            <span
              className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300 "
              onClick={() => setIsOpen(true)}
            >
              Log in
            </span>
            <span
              className="hover:border-l-4 hover:transition-all cursor-pointer hover:border-red-300 "
              onClick={() => setIsOpen(true)}
            >
              Sign up
            </span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="px-5 py-1 flex flex-col items-start">
            {/* // This condition shows that user with similar email id is already registered so do you want to move with the same account or do you want to login with new account */}
            {userInfo.user_present &&
            !userInfo.user_present_password_verification ? (
              <>
                <div className="flex flex-col">
                  <span className="mb-3">
                    Do you want to continue with the same account ?{" "}
                  </span>
                  <span className="flex items-center">
                    Email {maskEmail(userInfo?.email)} <MdOutlineMail />
                  </span>
                  <span className="mb-3 text-xs text-neutral-400">
                    Not now,
                    <span className="hover:text-neutral-700 cursor-pointer underline">
                      Use another account?
                    </span>{" "}
                  </span>
                </div>
              </>
            ) : userInfo.otp_send ? (
              <>
                <div className="flex flex-col gap-4 mb-5">
                  <span>{`Enter the code we have sen't to your email ${userInfo.email}`}</span>
                  <InputOTP
                    value={userInfo.otp}
                    onChange={(value) =>
                      setUserInfo({ ...userInfo, otp: value })
                    }
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </>
            ) : userInfo.verified ||
              (userInfo.user_present &&
                userInfo.user_present_password_verification) ? (
              <>
                <div className="w-full mb-4 relative">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    className=" outline outline-1 p-1 outline-slate-400 mb-1 w-full  focus-visible:outline focus:outline-slate-900"
                    placeholder="Enter your password"
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                  />
                  {passwordVisible ? (
                    <IoIosEye
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute cursor-pointer text-xl top-3 right-2"
                    />
                  ) : (
                    <IoIosEyeOff
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute cursor-pointer text-xl top-3 right-2"
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <span className="text-2xl mb-5 font-medium text-neutral-800">
                  Welcome to Airbnb
                </span>
                <Input
                  placeholder="Email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className=" outline outline-1 p-1 outline-slate-400 mb-1  focus-visible:outline focus:outline-slate-900"
                />
                <span className="mb-5 text-xs text-neutral-400">
                  We’ll call or text you to confirm your number. Standard
                  message and data rates apply.{" "}
                  <span className=" cursor-pointer underline text-neutral-500">
                    Privacy Policy
                  </span>
                </span>
              </>
            )}
            <Button
              asChild
              className="w-full bg-red-500 cursor-pointer  text-white hover:bg-[#DD1062]  "
            >
              {renderButtonContent()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login_Signup_Dialog;
