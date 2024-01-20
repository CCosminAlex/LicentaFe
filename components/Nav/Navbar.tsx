import React, { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { atom, useAtom } from "jotai";
import { userAtom } from "../../atoms/userAtom";
import axios from "axios";

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const [userInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:7129/api/User/${user.sub}`, {})
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.sub]);
  console.log(userInfo);
  return (
    <nav className="bg-slate-700 sticky">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {userInfo.isCompany ? (
            <Link href="/company/create-voluntary">Create</Link>
          ) : (
            <Link href="/home/voluntarys">All Voluntarys</Link>
          )}
          <Link href="/page2">1</Link>
          <Link href="/page2">2</Link>
          <Link href="/page2">3</Link>

          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
