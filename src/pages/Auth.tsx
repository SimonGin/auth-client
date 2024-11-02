// React Hooks

// Router
import { Link, useParams } from "react-router-dom";
//
import { Button, Input } from "@material-tailwind/react";
// Icons
import { MdLogin } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

const AuthPage = () => {
  const { variant } = useParams();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form className="h-2/3 w-1/3 p-10 flex flex-col items-center gap-3 bg-white rounded-2xl shadow">
        <section className="flex flex-col items-center gap-2">
          {variant === "login" ? (
            <MdLogin size={100} />
          ) : (
            <FaRegAddressCard size={70} />
          )}
          <h1 className="text-2xl font-bold">
            {variant === "login" ? "Welcome Back!" : "Get Started!"}
          </h1>
        </section>
        <section className="w-4/5 flex flex-col items-center gap-2">
          {variant === "register" && (
            <div className="w-full">
              <Input
                variant="standard"
                size="md"
                className="text-xl"
                color="gray"
                label="Username"
                {...({} as any)}
              />
              <p className="text-[#F00] text-sm">Chưa nhập</p>
            </div>
          )}
          <div className="w-full">
            <Input
              variant="standard"
              size="md"
              className="text-xl"
              color="gray"
              label="Email"
              {...({} as any)}
            />
            <p className="text-[#F00] text-sm">Chưa nhập</p>
          </div>
          <div className="w-full">
            <Input
              type="password"
              variant="standard"
              size="md"
              className="text-xl"
              color="gray"
              label="Password"
              {...({} as any)}
            />
            <p className="text-[#F00] text-sm">Chưa nhập</p>
          </div>
          {variant === "register" && (
            <div className="w-full">
              <Input
                type="password"
                variant="standard"
                size="md"
                className="text-xl"
                color="gray"
                label="Password"
                {...({} as any)}
              />
              <p className="text-[#F00] text-sm">Chưa nhập</p>
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
