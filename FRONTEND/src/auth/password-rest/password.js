// import { useForm } from "react-hook-form";
// import { useForgotPasswordMutation } from "../../api/authApi";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     const { register, handleSubmit } = useForm();
//     const [forgotPassword] = useForgotPasswordMutation();
//     const navigate = useNavigate();

//     const onSubmit = async (data) => {
//         await forgotPassword(data.email).unwrap();
//         navigate("/verify-otp", { state: { email: data.email } });
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-200">
//             <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//             <input
//                 className="input input-bordered w-full mb-3"
//                 placeholder="Enter your email"
//                 {...register("email", { required: true })}
//             />
//             <button className="btn btn-primary w-full">Send OTP</button>
//         </form>
//     );
// };

// export default ForgotPassword;

// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useVerifyOtpMutation } from "../../api/authApi";

// const VerifyOtp = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const [verifyOtp] = useVerifyOtpMutation();

//     const onSubmit = async (data) => {
//         await verifyOtp({ email: state.email, otp: data.otp }).unwrap();
//         navigate("/reset-password", { state: { email: state.email, otp: data.otp } });
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-200">
//             <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
//             <input
//                 className="input input-bordered w-full mb-3"
//                 placeholder="Enter OTP"
//                 {...register("otp", { required: true })}
//             />
//             <button className="btn btn-primary w-full">Verify</button>
//         </form>
//     );
// };

// export default VerifyOtp;

// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../../api/authApi";

// const ResetPassword = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const [resetPassword] = useResetPasswordMutation();

//     const onSubmit = async (data) => {
//         await resetPassword({
//             email: state.email,
//             otp: state.otp,
//             newPassword: data.password,
//         }).unwrap();

//         navigate("/login");
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-200">
//             <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//             <input
//                 type="password"
//                 className="input input-bordered w-full mb-3"
//                 placeholder="New Password"
//                 {...register("password", { required: true })}
//             />
//             <button className="btn btn-success w-full">Update Password</button>
//         </form>
//     );
// };

// export default ResetPassword;
