import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-85 disabled:opacity-70 font-semibold">
          Signup
        </button>
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-500">Signin</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
