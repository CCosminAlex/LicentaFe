import router from "next/router";
import { Voluntary, Location } from "../../Interfaces/Interface";
import Icon from "../icon/Icon";
import Button from "../input/Button";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import AppliedSuccessfully from "../AppliedSuccesfully";

export default function EditCompanyVoluntaryCard(props: Voluntary) {
  const { user, error, isLoading } = useUser();
  const [hide, setHide] = useState<boolean>(false);
  const [newStartDate, setNewStartDate] = useState(props.startDate);
  const [newEndDate, setNewEndDate] = useState(props.endDate);
  const [locations, setLocations] = useState<Location[]>();
  const [newVoluntaryLocation, setNewVoluntaryLocation] = useState(
    props.location.id
  );
  const [newVoluntaryDescription, setNewVoluntaryDescription] = useState(
    props.description
  );
  const [newVoluntaryReward, setNewVoluntaryReward] = useState(
    props.reward.toString()
  );

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

  function editVoluntary() {
    const requestBody = {
      name: props.name,
      reward: parseInt(newVoluntaryReward),
      description: newVoluntaryDescription,
      location: newVoluntaryLocation
        ? locations?.find((x) => x.id === newVoluntaryLocation)
        : locations && locations.length > 0
        ? locations[0].id
        : null,
      startDate: newStartDate,
      endDate: newEndDate,
    };
    debugger;

    if (user) {
      axios
        .put(`https://localhost:7129/api/Voluntary/${props.id}`, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle the response if needed
          if (response.status === 200) {
            {
              router.replace("/home/company-dashboard");
            }
          }
          console.log(response.data);
        })
        .catch((error) => {
          // Handle errors if any
          console.error(error);
        });
    }
  }

  return (
    <div>
      {!hide ? (
        <div className="bg-slate-200 border-slate-400 border-2 rounded-xl flex flex-col flex-grow">
          <span className="mt-4 text-center text-4xl font-bold">
            {props.name}
          </span>
          <div className="flex flex-col gap-4 ml-8">
            <div className="flex items-center">
              <Icon className="las la-calendar-alt text-4xl" />
              <label>Start Date: </label>
              <input
                type="date"
                defaultValue={props.startDate}
                className="ml-2"
                onChange={(e) => setNewStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Icon className="las la-calendar-alt text-4xl" />
              <label>End Date: </label>
              <input
                type="date"
                defaultValue={props.endDate}
                className="ml-2"
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Icon className="las la-clock text-4xl" />
              <span className="m-1 gap-4">
                Duration:{" "}
                {(Date.parse(newEndDate) - Date.parse(newStartDate)) /
                  (1000 * 3600 * 24)}{" "}
                days
              </span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-info-circle text-4xl text-blue-700" />
              <input
                type="text"
                placeholder={props.description}
                className="ml-2"
                onChange={(e) => setNewVoluntaryDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Icon className="las la-map-pin text-4xl text-red-600" />
              <select onChange={(e) => setNewVoluntaryLocation(e.target.value)}>
                {locations ? (
                  locations.map((element) => (
                    <option
                      value={element.id}
                      selected={props.location.id === element.id}
                    >
                      {element.street +
                        " " +
                        element.number +
                        " " +
                        element.city}
                    </option>
                  ))
                ) : (
                  <option value="">No locations available</option>
                )}
              </select>
            </div>
            <div className="flex items-center">
              <Icon className="las la-award text-4xl text-yellow-600" />
              <input
                type="text"
                placeholder={props.reward}
                className="ml-2"
                onChange={(e) => setNewVoluntaryReward(e.target.value)}
              />
            </div>
            <div className="flex flex-grow m-10">
              <div className=" m-5">
                <Button
                  size="base"
                  className="mt-4 ml-auto"
                  color="green"
                  onClick={() => editVoluntary()}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AppliedSuccessfully />
      )}
    </div>
  );
}
