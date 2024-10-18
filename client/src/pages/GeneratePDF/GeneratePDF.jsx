import jsPDF from "jspdf";
import "jspdf-autotable";
import { api } from "../../services/api";

const generatePDF = async (id, isClinic = false, mes) => {
  try {
    let response;

    if (isClinic) {
      response = await api.post(`/clinicReport/${id}`, {
        mes: mes,
        ano: "2024",
      });
    } else {
      response = await api.post(`/professionalReport/${id}`, {
        mes: mes,
        ano: "2024",
      });
    }

    const data = response.data;
    const doc = new jsPDF();

    const getMonthName = (monthNumber) => {
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return months[monthNumber - 1];
    };

    const monthName = getMonthName(mes);

    doc.setFontSize(18);

    if (isClinic) {
      doc.text(
        `Relatório de Ganhos Mensais - ${monthName} 2024 - Clínica ${data.nomeClinica} `,
        14,
        22
      );
      const tableColumns = ["Profissional", "Especialidade", "Total de Ganhos"];
      const tableRows = [];

      data.ganhosPorProfissional.forEach((profissional) => {
        const row = [
          profissional.nome || "N/A",
          profissional.cargo || "N/A",
          `R$ ${profissional.totalGanhos || "0,00"}`,
        ];
        tableRows.push(row);
      });

      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 30,
      });

      doc.setFontSize(14);
      doc.text(
        `Total de Ganhos da Clínica: R$ ${data.totalGanhosClinica || "0,00"}`,
        14,
        doc.lastAutoTable.finalY + 10
      );
    } else {
      doc.text(
        `Relatório de Ganhos Mensais - ${monthName} 2024 - ${data.nome}`,
        14,
        22
      );
      const tableColumns = [
        "Data",
        "Procedimento",
        "Valor da Consulta",
        "Forma de Pagamento",
      ];
      const tableRows = [];

      data.consultas.forEach((consulta) => {
        const row = [
          new Date(consulta.data_de_criacao).toLocaleDateString(),
          consulta.procedimento.nome,
          `R$ ${consulta.valor_da_consulta.toFixed(2)}`,
          consulta.tipo_de_pagamento || "Forma de pagamento não especificada",
        ];
        tableRows.push(row);
      });

      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 30,
      });

      doc.setFontSize(14);
      doc.text(
        `Total de Ganhos: R$ ${data.totalGanhos || "0,00"}`,
        14,
        doc.lastAutoTable.finalY + 10
      );
    }

    doc.save(
      `${
        isClinic ? "Relatorio_Clinica" : "Relatorio_Profissional"
      }_${monthName}_2024.pdf`
    );
  } catch (error) {
    console.error("Erro ao gerar o relatório PDF:", error);
  }
};

export default generatePDF;
