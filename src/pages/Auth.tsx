// Types
import { FormFields } from "../types";
// Constants
import { ACCESS_TOKEN_COOKIE, USER_ID } from "../constants/key";
// React Hooks
import { useEffect } from "react";
// Libs
import Cookies from "js-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
// Router
import { Link, useParams, useNavigate } from "react-router-dom";
// Components
import { Button, Input } from "@material-tailwind/react";
// Icons
import { MdLogin } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

const AuthPage = () => {
  const { variant } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormFields>();

  useEffect(() => {
    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [variant]);

  const formPassword = watch("password");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (variant === "register") {
      fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            toast.success(data.msg);
            navigate("/auth/login");
          } else {
            toast.error(data.msg);
          }
        });
    } else if (variant === "login") {
      fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            Cookies.set(ACCESS_TOKEN_COOKIE, data?.metadata?.token);
            Cookies.set(USER_ID, data?.metadata?.uid);
            toast.success(data.msg);
            navigate("/");
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-2/3 w-1/3 p-6 flex flex-col items-center gap-3 bg-white rounded-2xl shadow"
      >
        <section className="flex flex-col items-center gap-2">
          {variant === "login" ? (
            <MdLogin size={100} />
          ) : (
            <FaRegAddressCard size={70} />
          )}
          <h1 className="text-2xl font-bold">
            {variant === "login" ? "Welcome Back!" : "Get Started!"}
          </h1>
          <h3 className="font-medium italic">
            {variant === "login"
              ? "Enter your credentials to sign in"
              : "Enter your information to sign you up"}
          </h3>
        </section>
        <section className="w-4/5 flex flex-col items-center gap-2">
          {variant === "register" && (
            <div className="w-full">
              <Input
                {...register("name", { required: "Username is required" })}
                variant="standard"
                size="md"
                color="gray"
                className="text-xl"
                label="Username"
                {...({} as any)}
              />
              {errors.name && (
                <p className="text-[#F00] text-sm">{errors.name?.message}</p>
              )}
            </div>
          )}
          <div className="w-full">
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              variant="standard"
              size="md"
              className="text-xl"
              color="gray"
              label="Email"
              {...({} as any)}
            />
            {errors.email && (
              <p className="text-[#F00] text-sm">{errors.email?.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              variant="standard"
              size="md"
              className="text-xl"
              color="gray"
              label="Password"
              {...({} as any)}
            />
            <p className="text-[#F00] text-sm">{errors.password?.message}</p>
          </div>
          {variant === "register" && (
            <div className="w-full">
              <Input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === formPassword || "The passwords do not match",
                })}
                type="password"
                variant="standard"
                size="md"
                className="text-xl"
                color="gray"
                label="Password"
                {...({} as any)}
              />
              {errors.confirmPassword && (
                <p className="text-[#F00] text-sm">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          )}

          <Button
            type="submit"
            color="blue"
            className="w-full my-2"
            {...({} as any)}
          >
            {variant}
          </Button>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-[2px] my-4 bg-black border-0 rounded" />
            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2">
              OR
            </div>
          </div>
          <p className="text-center text-neutral-500 select-none">
            {variant === "login"
              ? "First time using our app?"
              : "Already have an account?"}
            <Link to={`/auth/${variant === "login" ? "register" : "login"}`}>
              <span className="ml-1 text-blue-500 hover:underline select-none cursor-pointer">
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </Link>
          </p>
        </section>
      </form>
    </div>
  );
};

export default AuthPage;
