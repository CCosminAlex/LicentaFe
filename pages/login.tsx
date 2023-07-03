import router from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState<Boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword(password)) {
      setPasswordValidation(true);
      console.log("Email:", email);
      console.log("Password:", password);
      router.push("/home/user");
    } else {
      setPasswordValidation(false);
    }
    // Perform login logic here
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-600">
      <form
        className="w-80 bg-white p-8 shadow rounded"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-black">
            Email
          </label>
          <input
            autoComplete="false"
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          {passwordValidation ? (
            <label htmlFor="password" className="block mb-2 text-black">
              Password
            </label>
          ) : (
            <label htmlFor="password" className="text-sm text-red-600">
              Please use a password that is at least 6 characters long and
              contains at least one capital letter one number and one special
              character
            </label>
          )}

          <input
            autoComplete="false"
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
