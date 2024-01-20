import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Card from "../../components/dash/Card";
import Navbar from "../../components/Nav/Navbar";
import { useEffect, useState } from "react";
import { Voluntary } from "../../Interfaces/Interface";
import axios from "axios";
import { userAtom } from "../../atoms/userAtom";
import { useAtom } from "jotai";
import Button from "../../components/input/Button";
import NoVoluntary from "../../components/NoVoluntary";

export default function UserHome() {
  const [voluntarys, setVoluntarys] = useState<Voluntary[]>();
  const [userInfo] = useAtom(userAtom);
  const [dateFilter, setDateFilter] = useState(
    new Date(0).toISOString().split("T")[0]
  );
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [locations, setLocations] = useState<Location[]>();
  const { user, error, isLoading } = useUser();

  console.log("ddd");
  console.log(userInfo);
  useEffect(() => {
    if (user) {
      axios
        .get("https://localhost:7129/api/Voluntary", {})
        .then((response) => {
          console.log(response);
          setVoluntarys(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get("https://localhost:7129/api/Location", {})
        .then((response) => {
          setLocations(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user?.sub]);

  function getData() {
    debugger;
    axios
      .get(
        `https://localhost:7129/api/Voluntary/search?name=${nameFilter}&city=${cityFilter}&date=${
          dateFilter
            ? new Date(dateFilter).toISOString().split("T")[0]
            : new Date(0).toISOString().split("T")[0]
        }`
      )
      .then((response) => {
        console.log(response);
        setVoluntarys(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  var locationIds = locations?.map((x) => x);
  var uniqueLocations = locations?.filter(
    ({ id: locationId }, index) => !locationIds?.includes(locationId, index + 1)
  );
  return (
    <div>
      <Navbar />
      <div className="mt-4 text-center text-5xl font-bold">
        <span>Available Voluntarys</span>
      </div>

      <div className="grid grid-cols-1 m-52 gap-12">
        <div className="flex justify-evenly text-center">
          <div className="flex flex-col gap-4">
            <label>Start Date</label>
            <input
              type="date"
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label>Voluntary Name</label>
            <input
              type="text"
              placeholder="Voluntary Name"
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label>City</label>
            <select onChange={(e) => setCityFilter(e.target.value)}>
              <option value="">Select your option</option>
              {uniqueLocations?.map((x) => (
                <option value={x.id}>
                  {x.street + " " + x.number + ", " + x.city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <Button
              size="base"
              className=""
              color="blue"
              onClick={() => getData()}
            >
              Apply Filter
            </Button>
          </div>
        </div>
        {voluntarys?.length != 0 ? (
          voluntarys?.map((x, index) => (
            <Card
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
export const getServerSideProps = withPageAuthRequired();
