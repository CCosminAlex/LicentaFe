import router from "next/router";
import { Voluntary, Location } from "../../Interfaces/Interface";
import Icon from "../icon/Icon";
import Button from "../input/Button";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import AppliedSuccessfully from "../AppliedSuccesfully";

export default function VoluntaryInfoCard(props: Voluntary) {
  const { user, error, isLoading } = useUser();
  const [hide, setHide] = useState<boolean>(false);

  function mapsURL(address: Location) {
    return (
      "http://maps.google.com/?q=" +
      address.city +
      " " +
      address.street +
      " " +
      address.number
    );
  }
  function applyToVoluntary() {
    const requestBody = {
      voluntaryID: props.id,
      volunteerID: user?.sub,
    };
    axios
      .post(`https://localhost:7129/api/Voluntary/apply`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle the response if needed
        if (response.status === 200) {
          {
            setHide(true);
          }
        }
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  }
  debugger;

  return (
    <div>
      {!hide ? (
        <div className="bg-slate-200 border-slate-400 border-2 rounded-xl flex flex-col flex-grow">
          <span className="mt-4 text-center text-4xl font-bold">
            {props.name}
          </span>
          <div className="flex flex-col gap-4 ml-8">
            <div className="flex items-center">
              <Icon className="las la-building text-4xl" />
              <span>{props.company.name}</span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-calendar-alt text-4xl" />
              <label>Start Date: </label>
              <span className="ml-1">{props.startDate}</span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-calendar-alt text-4xl" />
              <label>End Date: </label>
              <span className="ml-1">{props.endDate}</span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-clock text-4xl" />
              <span className="m-1 gap-4">
                Duration:{" "}
                {(Date.parse(props.endDate) - Date.parse(props.startDate)) /
                  (1000 * 3600 * 24)}{" "}
                days
              </span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-info-circle text-4xl text-blue-700" />
              <span>{props.description}</span>
            </div>
            <div className="flex items-center">
              <Icon className="las la-map-pin text-4xl text-red-600" />
              <a
                href={mapsURL(props.location)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {props.location.street +
                    " " +
                    props.location.number +
                    ", " +
                    props.location.city}
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <Icon className="las la-award text-4xl text-yellow-600" />
              <span>{props.reward}</span>
            </div>
            <div className="flex flex-grow m-10">
              <Button
                size="base"
                className="mt-4 ml-auto"
                color="green"
                onClick={() => applyToVoluntary()}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <AppliedSuccessfully />
      )}
    </div>
  );
}
