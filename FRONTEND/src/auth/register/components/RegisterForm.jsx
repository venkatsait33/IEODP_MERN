import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../registerSchema";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../userApi";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data).unwrap();
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-xl bg-base-300 p-6 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <div>
            <label className="label">First Name</label>
            <input
              data-testid="firstName"
              className="input input-bordered w-full"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-error text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="label">Last Name</label>
            <input
              data-testid="lastName"
              className="input input-bordered w-full"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-error text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="label">Username</label>
            <input
              data-testid="userName"
              className="input input-bordered w-full"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-error text-sm">{errors.userName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              data-testid="email"
              type="email"
              className="input input-bordered w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              data-testid="password"
              type="password"
              className="input input-bordered w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="label">Mobile Number</label>
            <input
              data-testid="mobileNumber"
              type="text"
              className="input input-bordered w-full"
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="text-error text-sm">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="label">Gender</label>
            <select
              data-testid="gender"
              className="select select-bordered w-full"
              {...register("gender")}
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-error text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              data-testid="submit"
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <span
            className="link link-primary cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
