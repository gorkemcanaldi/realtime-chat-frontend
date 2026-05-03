import { registerUser } from "../services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput } from "../types/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSchema } from "../validation/auth";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterInput) => {
    try {
      const res = await registerUser(data);
      if (res) {
        toast.success("register success.");
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Register failed.");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="bg-purple-100/90 h-[450px] w-[600px] rounded-xl flex items-center justify-center flex-col gap-3"
    >
      <h1 className="font-bold text-2xl text-black">Register</h1>

      <input
        type="text"
        {...register("username")}
        placeholder="username"
        className="border-none w-3/4 rounded-xl outline-none p-3 mt-2 bg-white"
      />
      {errors.username && (
        <span className="text-red-600 text-xs">{errors.username.message}</span>
      )}

      <input
        type="email"
        {...register("email")}
        placeholder="email"
        className="border-none w-3/4 rounded-xl outline-none p-3 bg-white"
      />
      {errors.email && (
        <span className="text-red-600 text-xs">{errors.email.message}</span>
      )}
      <input
        type="password"
        {...register("password")}
        placeholder="password"
        className="border-none w-3/4 rounded-xl outline-none p-3 bg-white"
      />
      {errors.password && (
        <span className="text-red-600 text-xs">{errors.password.message}</span>
      )}
      <button
        type="submit"
        className="tracking-wider hover:opacity-70 cursor-pointer w-3/4 h-12 mt-2  text-xl text-center rounded-xl text-white bg-indigo-900"
      >
        Register
      </button>
      <button
        onClick={() => navigate("/login")}
        className="text-gray-700 underline hover:text-gray-950"
      >
        Already have an account?
      </button>
    </form>
  );
}

export default Register;
