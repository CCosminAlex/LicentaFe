import { useRouter } from "next/router"

export default function Test(){
    const router = useRouter()
    console.log(router.query)

    return <div className="text-3xl text-lime-500 font-extrabold">Merge</div>
}