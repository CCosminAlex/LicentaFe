import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

export default function Home() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:7129/api/User/${user.sub}`, {})
        .then((response) => {
          response.data.isCompany === undefined
            ? router.replace("/create-profile")
            : response.data.isCompany
            ? router.replace("/home/company-dashboard")
            : router.replace("/home/voluntarys");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.sub]);
  return (
    <div>
      {user?.email}
      <Link href="/login"> Mergem la Login </Link>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();
