import router from "next/router";
import { Voluntary, Location } from "../../Interfaces/Interface";
import Icon from "../icon/Icon";
import Button from "../input/Button";

export default function Card(props: Voluntary) {
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

  return (
    <div className="bg-slate-200 border-slate-400 border-2 rounded-xl flex flex-col flex-grow">
      <span className="text-center text-4xl font-semibold uppercase mt-4">
        {props.name}
      </span>
      <div className="ml-6 flex flex-col gap-6 text-lg">
        <div className="flex m-1 gap-2">
          <span>{props.company}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-calendar-alt text-4xl" />
          <label className="font-semibold">Start Date: </label>
          <span className="ml-1">{props.startDate}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-calendar-alt text-4xl" />
          <label className="font-semibold">End Date: </label>
          <span className="ml-1">{props.endDate}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-clock text-4xl" />
          <span className="m-1 font-semibold">
            Duration:{" "}
            {(Date.parse(props.endDate) - Date.parse(props.startDate)) /
              (1000 * 3600 * 24)}{" "}
            days
          </span>
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
        <div className="flex flex-grow m-10">
          <Button
            size="base"
            className=" ml-auto"
            color="blue"
            onClick={() => router.replace("/" + props.id + "/voluntaryInfo")}
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
