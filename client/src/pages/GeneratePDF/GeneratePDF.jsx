import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { api } from '../../services/api'; // API do seu projeto

const generatePDF = async (id, isClinic = false) => {
  try {
    let response;

    if (isClinic) {
      // Para clínicas
      response = await api.post(`/clinicReport/${id}`, {
        mes: '10', 
        ano: '2024' 
      });
    } else {
      // Para profissionais
      response = await api.post(`/professionalReport/${id}`, {
        mes: '10', 
        ano: '2024' 
      });
    }

    const data = response.data;

    // Inicializa o jsPDF
    const doc = new jsPDF();

    // Define o título do relatório
    doc.setFontSize(18);
    if (isClinic) {
      doc.text(`Relatório de Ganhos Mensais - Clínica ${data.nomeClinica}`, 14, 22);

      // Colunas e conteúdo para o relatório da clínica
      const tableColumns = ["Profissional", "Especialidade", "Total de Ganhos"];
      const tableRows = [];

      // Percorre os ganhos por profissional
      data.ganhosPorProfissional.forEach(profissional => {
        const row = [
          profissional.nome, 
          profissional.cargo, 
          `R$ ${profissional.totalGanhos}`
        ];
        tableRows.push(row);
      });

      // Gera a tabela no PDF
      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 30,
      });

      // Adiciona o total de ganhos da clínica
      doc.setFontSize(14);
      doc.text(`Total de Ganhos da Clínica: R$ ${data.totalGanhosClinica}`, 14, doc.lastAutoTable.finalY + 10);
    
    } else {
      // Para profissionais
      doc.text(`Relatório de Ganhos Mensais - Profissional ${data.nome}`, 14, 22);

      // Colunas e conteúdo para o relatório de profissionais
      const tableColumns = ["Data", "Procedimento", "Valor da Consulta", "Forma de Pagamento"];
      const tableRows = [];

      // Percorre os dados das consultas do profissional
      data.consultas.forEach(consulta => {
        const formattedDate = new Date(consulta.data_de_criacao).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const consultData = [
          formattedDate, // Data formatada
          consulta.procedimento.nome, // Nome do procedimento
          `R$ ${consulta.valor_da_consulta}`, // Valor da consulta
          consulta.tipo_de_pagamento // Forma de pagamento
        ];
        tableRows.push(consultData);
      });

      // Gera a tabela no PDF
      doc.autoTable({
        head: [tableColumns],
        body: tableRows,
        startY: 30,
      });

      // Adiciona o total de ganhos do profissional
      doc.setFontSize(14);
      doc.text(`Total de Ganhos: R$ ${data.totalGanhos}`, 14, doc.lastAutoTable.finalY + 10);
    }

    // Salva o PDF
    doc.save(isClinic ? `relatorio_ganhos_clinica_${data.nomeClinica}.pdf` : `relatorio_ganhos_profissional_${data.nome}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
  }
};

export default generatePDF;
