import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../loginSchema";
import { setCredentials } from "../../authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../userApi";
import { ROLES } from "../../../utils/roles";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Correct submit handler
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      //   Store access token in redux
      dispatch(
        setCredentials({
          user: res.user,
          role: res.user.role.toUpperCase(),
          accessToken: res.token,
        }),
      );

      const role = res?.user?.role.toUpperCase();
      // Store refresh token securely (demo approach)
      toast.success("Login successful");
      if (role === ROLES.OPERATOR) navigate("/operator/dashboard");
      if (role === ROLES.MANAGEMENT) navigate("/management/dashboard");
      if (role === ROLES.LEADERSHIP) navigate("/leadership/dashboard");
      if (role === ROLES.AUDITOR) navigate("/auditors/dashboard");
      if (role === ROLES.ADMIN) navigate("/admin/dashboard");

      // navigate(`/${res.user.role}/dashboard`);
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card w-96 bg-base-300 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">IEODP Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* EMAIL */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            data-testid="login-email"
            type="email"
            placeholder="user@corp.com"
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            data-testid="login-password"
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          <div className="text-right">
            <Link to="/rest-password" className="link text-sm">
              Forgot password?
            </Link>
          </div>
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          data-testid="login-submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        Create a new account?{" "}
        <Link to="/register" className="link">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
