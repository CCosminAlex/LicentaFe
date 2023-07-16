import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Nav/Navbar";
import Button from "../components/input/Button";
import { debug } from "console";
import { redirect } from "next/dist/server/api-utils";
import router, { Router } from "next/router";

export default function profile() {
  const { user, error, isLoading } = useUser();

  const [role, setRole] = useState("company");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = () => {
    console.log(role);
    const requestBody = {
      isCompany: role == "company",
      sub_ID: user ? user.sub : "",
      name: firstName + " " + lastName,
      email: user ? user.email : "",
      birthDate: birthdate,
      address: "string",
      description: "string",
      score: 0,
    };

    // Send the POST request using Axios
    axios
      .post("https://localhost:7129/api/User", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response if needed
        if (response.status === 200) {
          if (requestBody.isCompany) {
            //router.redirect("/");
          } else {
            router.replace("/home/voluntarys");
          }
        }
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
              placeholder={user ? user.email || "Email" : "Email"}
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
              defaultValue="company"
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
