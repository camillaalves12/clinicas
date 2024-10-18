import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import S from "./styles.module.scss";
import { api } from "../../services/api";
import Refresh from "../../components/Refresh/Refresh";

export function DashSpline() {
  const [daysOnly, setDaysOnly] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchMonthlyDataForDay();
  }, []);

  const fetchMonthlyDataForDay = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;

    const dataToSend = { data: formattedDate };

    const getClinicId = () => {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      return userData?.user?.clinicaId;
    };

    try {
      const response = await api.put(
        `/monthlyData/${getClinicId()}`,
        dataToSend
      );
      console.log("Dados recebidos:", response.data);

      if (
        response.data.valor_por_profissional &&
        Array.isArray(response.data.valor_por_profissional) &&
        response.data.valor_por_profissional.length > 0
      ) {
        const extractedDays = response.data.valor_por_profissional.map(
          (item) => item.profissional
        );
        setDaysOnly(extractedDays);

        const updatedSeries = response.data.valor_por_profissional.map(
          (professional) => ({
            name: professional.profissional,
            data: [professional.totalValue, professional.totalValue],
          })
        );

        setSeries(updatedSeries);
      } else {
        console.log("valor_por_profissional está vazio ou indefinido");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  if (series.length === 0) {
    return <Refresh title="Carregando" />;
  }

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: daysOnly,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return (
    <div className={S.container}>
      <div className={S.dashSpline}>
        <ReactApexChart options={options} series={series} type="area" />
      </div>
    </div>
  );
}
