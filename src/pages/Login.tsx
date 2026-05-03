import { socket } from "../socket/socket";
import { loginUser } from "../services/auth";
import { LoginInput } from "../types/auth";
import { loginSchema } from "../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await loginUser(data);
      if (res) {
        localStorage.setItem("token", res.data.accessToken);
        socket.disconnect();
        socket.connect();
        toast.success("login success.");
        navigate("/room");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("login failed.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-purple-100/90 h-[450px] w-[600px] rounded-xl flex items-center justify-center flex-col gap-6"
    >
      <h1 className="font-bold text-2xl text-black">Log in</h1>

      <input
        type="email"
        {...register("email")}
        placeholder="email"
        className="border-none outline-none w-3/4 rounded-xl  p-3 bg-white "
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
      <button className="tracking-wider hover:opacity-70 cursor-pointer w-3/4 h-12  text-xl text-center rounded-xl text-white bg-indigo-900">
        Log in
      </button>
      <button
        onClick={() => navigate("/register")}
        className="text-gray-700 underline hover:text-gray-950"
      >
        Don't have an account?
      </button>
    </form>
  );
}

export default Login;
