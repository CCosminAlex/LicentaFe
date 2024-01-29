import Navbar from "../../components/Nav/Navbar";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { Voluntary } from "../../Interfaces/Interface";
import axios from "axios";
import VoluntaryInfoCard from "../../components/dash/VoluntaryInfoCard";
import VoluntaryInforCardCompany from "../../components/dash/VoluntaryInforCardCompany";
import NoVoluntary from "../../components/NoVoluntary";

export default function Dashboard() {
  const router = useRouter();
  const { voluntaryId } = router.query;
  const [voluntarys, setVoluntarys] = useState<Voluntary[]>();

  const { user, error, isLoading } = useUser();
  console.log(user?.sub);
  useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:7129/api/Voluntary/company/${user.sub}`, {})
        .then((response) => {
          setVoluntarys(response.data);
          console.log(response.data);
          console.log(voluntarys);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.sub]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 m-52 gap-20">
        {voluntarys?.length != 0 ? (
          voluntarys?.map((x, index) => (
            <VoluntaryInforCardCompany
              key={index}
              location={x.location}
              name={x.name}
              company={x.company}
              description={x.description}
              endDate={x.endDate}
              id={x.id}
              startDate={x.startDate}
              reward={x.reward}
            />
          ))
        ) : (
          <NoVoluntary />
        )}
      </div>
    </div>
  );
}
