import router from "next/router";
import { Voluntary, Location } from "../../Interfaces/Interface";
import Icon from "../icon/Icon";
import Button from "../input/Button";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import AppliedSuccessfully from "../AppliedSuccesfully";

export default function VoluntaryInforCardCompany(props: Voluntary) {
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
            <div className="flex items-end">
              <div className=" m-5">
                <Button
                  size="base"
                  className="mt-4 ml-auto"
                  color="green"
                  onClick={() =>
                    router.replace(
                      "/companyVoluntaryInfo/" + props.id + "/editVoluntary"
                    )
                  }
                >
                  Edit
                </Button>
              </div>
              <div className=" m-5">
                <Button size="base" className="mt-4 ml-auto" color="yellow">
                  See Requests
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
