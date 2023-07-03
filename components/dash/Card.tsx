import { Voluntary } from "../../Interfaces/Interface";
import Icon from "../icon/Icon";
import Button from "../input/Button";

export default function Card(props: Voluntary) {
  return (
    <div className="bg-slate-200 border-slate-400 border-2 rounded-xl flex flex-col flex-grow">
      <span className="text-center text-lg">{props.name}</span>
      <div className="ml-3 ">
        <div className="flex m-1 gap-2">
          <span>{props.company}</span>
        </div>
        <div className="m-1 gap-4">
          <span className="text-center">{props.description}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-calendar-alt text-4xl" />
          <label>Start Date: </label>
          <span className="ml-1">{props.startDate.toDateString()}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-calendar-alt text-4xl" />
          <label>End Date: </label>
          <span className="ml-1">{props.endDate.toDateString()}</span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-clock text-4xl" />
          <span className="m-1 gap-4">
            Duration:{" "}
            {(props.endDate.getTime() - props.startDate.getTime()) /
              (1000 * 3600 * 24)}{" "}
            days
          </span>
        </div>
        <div className="flex items-center">
          <Icon className="las la-map-pin text-4xl" />
          <span>{props.location}</span>
        </div>
        <div className="flex flex-grow m-10">
          <Button size="base" className="mt-4 ml-auto" color="green">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
