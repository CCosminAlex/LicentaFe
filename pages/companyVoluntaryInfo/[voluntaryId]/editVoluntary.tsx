import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "../../../components/Nav/Navbar";
import { useEffect, useState } from "react";
import { Voluntary } from "../../../Interfaces/Interface";
import axios from "axios";
import EditCompanyVoluntaryCard from "../../../components/dash/EditCompanyVoluntaryCard";

export default function editVoluntary() {
  const router = useRouter();
  const { voluntaryId } = router.query;
  const [voluntary, setVoluntary] = useState<Voluntary>();

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:7129/api/Voluntary/${voluntaryId}`, {})
        .then((response) => {
          console.log(response);
          setVoluntary(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.sub]);
  debugger;
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 m-52 gap-20">
        {voluntary ? (
          <EditCompanyVoluntaryCard
            key={voluntary.id}
            location={voluntary.location}
            name={voluntary.name}
            company={voluntary.company}
            description={voluntary.description}
            endDate={voluntary.endDate}
            id={voluntary.id}
            startDate={voluntary.startDate}
            reward={voluntary.reward}
          />
        ) : null}
      </div>
    </div>
  );
}
