import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import router from "next/router";

export default function Home() {
  useEffect(() => {
    router.replace("/profile");
  }, []);
  return (
    <div>
      Prezentare
      <Link href="/login"> Mergem la Login </Link>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();
