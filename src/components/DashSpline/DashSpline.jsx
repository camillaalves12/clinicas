import React from 'react';
import ReactApexChart from 'react-apexcharts';
import S from './styles.module.scss'

export function DashSpline() {

     const series= [{
      name: 'Dr. Paulo',
      data: [3110, 2140, 1228, 1551, 1042, 709, 2810]
    }, {
      name: 'Dr. Miriam',
      data: [2511, 1232, 1145, 1032, 2034, 1052, 2641]
    }, {
      name: 'Dr. Yasmim',
      data: [1050, 3245, 2022, 2332, 1543, 1272, 2141]
    }
  
  ]

    const options = {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19", "2018-09-18", "2018-09-17", "2018-09-16", "2018-09-15", "2018-09-14", "2018-09-13"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy'
        },
      }
   }
   return(
    <div className={S.container}>
      <div className={S.dashSpline}>
         <ReactApexChart options={options} series={series}  type='area'/>
      </div>
    </div>
   )
   }