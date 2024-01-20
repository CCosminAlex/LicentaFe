import axios from "axios";
import Navbar from "../../components/Nav/Navbar";
import Button from "../../components/input/Button";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Voluntary, Location } from "../../Interfaces/Interface";

export default function CreateVoluntary() {
  const { user, error, isLoading } = useUser();

  const [voluntaryName, setVoluntaryName] = useState("");
  const [voluntaryDescription, setVoluntaryDescription] = useState("");
  const [voluntaryReward, setVoluntaryReward] = useState("0");
  const [locations, setLocations] = useState<Location[]>();
  const [voluntaryLocation, setVoluntaryLocation] = useState();
  const [voluntaryStartDate, setVoluntaryStartDate] = useState("");
  const [voluntaryEndDate, setVoluntaryEndDate] = useState("");

  useEffect(() => {
    if (user) {
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

  console.log(locations);
  const handleSubmit = () => {
    console.log(locations);
    const requestBody = {
      name: voluntaryName,
      reward: parseInt(voluntaryReward),
      description: voluntaryDescription,
      location: voluntaryLocation
        ? locations?.find((x) => x.id === voluntaryLocation)
        : locations && locations.length > 0
        ? locations[0].id
        : null,
      startDate: voluntaryStartDate,
      endDate: voluntaryEndDate,
    };
    if (user) {
      axios
        .post(`https://localhost:7129/api/Voluntary/${user.sub}`, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle the response if needed
          if (response.status === 200) {
            {
              //router.redirect("/");
            }
          }
          console.log(response.data);
        })
        .catch((error) => {
          // Handle errors if any
          console.error(error);
        });
      debugger;
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col grow gap-8 m-40">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Voluntary Name
            </label>
            <input
              type="text"
              placeholder="Voluntary Name"
              onChange={(e) => setVoluntaryName(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Reward
            </label>
            <input
              type="text"
              placeholder="Reward"
              onChange={(e) => setVoluntaryReward(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Location
            </label>
            <select onChange={(e) => setVoluntaryLocation(e.target.value)}>
              {locations ? (
                locations.map((element) => (
                  <option value={element.id}>
                    {element.street + element.number + element.city}
                  </option>
                ))
              ) : (
                <option value="">No locations available</option>
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Description
            </label>
            <input
              className="w-max h-20"
              type="textarea"
              placeholder="Description"
              onChange={(e) => setVoluntaryDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              Start Date
            </label>
            <input
              type="date"
              placeholder="Start Date"
              onChange={(e) => setVoluntaryStartDate(e.target.value)}
            ></input>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-black font-semibold"
            >
              End Date
            </label>
            <input
              type="date"
              placeholder="End Date"
              onChange={(e) => setVoluntaryEndDate(e.target.value)}
            ></input>
          </div>
          <Button
            size="base"
            className="mt-4 ml-auto"
            color="green"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
