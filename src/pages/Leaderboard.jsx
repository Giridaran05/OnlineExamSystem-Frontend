import { useEffect,useState } from "react"
import API from "../api/axios"

export default function Leaderboard(){

 const [leaders,setLeaders] = useState([])

 useEffect(()=>{

  fetchLeaderboard()

 },[])

 const fetchLeaderboard = async()=>{

  const res = await API.get("/analytics/leaderboard")

  setLeaders(res.data.data)

 }

 return(

  <div className="p-8">

   <h1 className="text-2xl font-bold mb-6">
    Leaderboard
   </h1>

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-100">

     <tr>
      <th className="p-3">Rank</th>
      <th>Name</th>
      <th>Score</th>
      <th>Percentage</th>
     </tr>

    </thead>

    <tbody>

     {leaders.map((user,index)=>(

      <tr key={user._id} className="text-center border-b">

       <td>{index+1}</td>
       <td>{user.user?.username}</td>
       <td>{user.score}</td>
       <td>{user.percentage}%</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )

}