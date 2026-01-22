import { Mail, RectangleEllipsis } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import {
  useResetPasswordMutation,
  useResetPasswordOtpMutation,
} from "../userApi";
import { toast } from "react-toastify";

const RestPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [resetPasswordOtp] = useResetPasswordOtpMutation();
  const [resetPassword] = useResetPasswordMutation();

  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const onSubmitEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPasswordOtp({ email }).unwrap();
      setIsEmailSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtpHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    const finalOtp = otpArray.join("");
    setOtp(finalOtp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        email,
        password,
        otp,
      }).unwrap();

      toast.success("Password reset successfully");
      navigate("/login");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handlePaste = () => {};
  return (
    <div className="flex  max-sm:flex-col max-sm:gap-2 gap-4 h-screen  max-sm:mt-20 p-4 items-center justify-center w-full mx-auto bg-gradient-to-br from-lime-500 to-lime-900">
      {!isEmailSent && (
        <div className="p-4 border rounded-lg shadow-lg bg-base-100 w-96">
          <form className="card" onSubmit={onSubmitEmailHandler}>
            <div className="card-body">
              <h1 className="text-xl card-title">Rest Password</h1>

              <h1 className="text-sm">Enter registered email:</h1>
              <div
                className="flex items-center gap-4 mb-4"
                onPaste={handlePaste}
              >
                <span className="text-2xl">
                  <Mail />
                </span>
                <input
                  type="email"
                  className="w-full input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email id"
                />
              </div>
              {loading ? (
                <button className="mt-2 btn btn-neutral">
                  <span className="loading loading-spinner loading-lg"></span>
                </button>
              ) : (
                <button type="submit" className="mt-2 btn btn-neutral">
                  Verify Email
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <div>
          <OtpVerification
            inputRefs={inputRefs}
            onSubmitHandler={onSubmitOtpHandler}
            loading={loading}
          />
        </div>
      )}

      {/* enter password */}
      {isEmailSent && isOtpSubmitted && (
        <div className="p-4 border rounded-lg shadow-lg bg-base-100 w-96">
          <form className="card" onSubmit={onSubmitNewPasswordHandler}>
            <div className="card-body">
              <h1 className="text-xl card-title">New Password</h1>

              <h1 className="text-sm">Enter New Password</h1>
              <div
                className="flex items-center gap-4 mb-4"
                onPaste={handlePaste}
              >
                <span className="text-2xl">
                  <RectangleEllipsis />
                </span>
                <input
                  type="password"
                  className="w-full input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              {loading ? (
                <button className="mt-2 btn btn-neutral">
                  <span className="loading loading-spinner loading-lg"></span>
                </button>
              ) : (
                <button type="submit" className="mt-2 btn btn-neutral">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RestPassword;
