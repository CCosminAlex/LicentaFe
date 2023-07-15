import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import Button from "../components/input/Button";
import { debug } from "console";

export default function profile() {
  const { user, error, isLoading } = useUser();

  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = () => {
    const requestBody = {
      role: role == "company",
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthdate: birthdate,
    };

    // Send the POST request using Axios
    axios
      .post("your_api_endpoint", requestBody)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
    debugger;
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 m-40">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Birthdate
            </label>
            <input
              type="date"
              placeholder="Birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Role
            </label>
            <select
              name="role"
              id="roles"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="company">Company</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <Button
            size="base"
            className="mt-4 ml-auto"
            color="green"
            type="submit"
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
}
//export const getServerSideProps = withPageAuthRequired();
