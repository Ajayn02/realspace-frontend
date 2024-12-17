import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS,LineElement, PointElement,LinearScale,CategoryScale,Title,Tooltip,Legend,Filler} from 'chart.js'

ChartJS.register(LineElement,PointElement,LinearScale,Title,Tooltip,CategoryScale,Legend,Filler)

function Chart() {


    const salesData={
        labels:['Jul','Aug','Sep','Oct','Nov'],
        datasets:[
            {
                label:'New Users (2024 Jul-Nov)',
                data:[5,3,6,5,7],
                backgroundColor:'#b4abda',
                border:'#4bc0c02e',
                pointBackgroundColor:['#33284d'],
                fill:true

            }
        ]
    }


  return (
    <>
        {/* <h3 className='my-2'>New Users</h3> */}
        <Line data={salesData} type='line' ></Line>
    </>
  )
}

export default Chart