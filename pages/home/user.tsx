import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Card from "../../components/dash/Card";
import Navbar from "../../components/Nav/Navbar";
import { Voluntary } from "../../Interfaces/Interface";
export default function UserHome() {
  const voluntaryArray: Voluntary[] = [
    {
      id: "1",
      company: "ABC Organization",
      name: "John Doe",
      location: "New York",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-03-31"),
      description: "Worked as a volunteer on various projects.",
      reward: 11,
    },
    {
      id: "2",
      company: "XYZ Foundation",
      name: "Jane Smith",
      location: "London",
      startDate: new Date("2022-04-01"),
      endDate: new Date("2022-06-30"),
      description: "Assisted in community outreach programs.",
      reward: 13,
    },
    {
      id: "3",
      company: "XYZ Foundation",
      name: "Jane Smith",
      location: "London",
      startDate: new Date("2022-04-01"),
      endDate: new Date("2022-06-30"),
      description: "Assisted in community outreach programs.",
      reward: 45,
    },
    {
      id: "4",
      company: "XYZ Foundation",
      name: "Jane Smith",
      location: "London",
      startDate: new Date("2022-04-01"),
      endDate: new Date("2022-06-30"),
      description: "Assisted in community outreach programs.",
      reward: 11,
    },
    {
      id: "5",
      company: "XYZ Foundation",
      name: "Jane Smith",
      location: "London",
      startDate: new Date("2022-04-01"),
      endDate: new Date("2022-06-30"),
      description: "Assisted in community outreach programs.",
      reward: 11,
    },
    // Add more entries as needed
  ];

  console.log(voluntaryArray);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 m-52 gap-20">
        {voluntaryArray.map((x, index) => (
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
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps = withPageAuthRequired();
