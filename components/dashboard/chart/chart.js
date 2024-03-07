import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Chart(props) {

  const { users } = props

  const data = [users?.twoWeeksBack[0] , users?.previousWeek[0], users?.currentWeek[0]]
  return (
    <div>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="customers" stroke="#8884d8" />
        <CartesianGrid stroke="black" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
      </LineChart>

    </div>
  )
}