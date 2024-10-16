import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { api } from '../../services/api'; // API do seu projeto

const generatePDF = async (professionalId) => {
  try {
    // Faz a requisição para buscar os ganhos mensais do profissional
    const response = await api.post(`/professionalDetails/${professionalId}`, {
      mes: '10', // Mês dinâmico
      ano: '2024' // Ano dinâmico
    });
    const professionalData = response.data;

    // Inicializa o jsPDF
    const doc = new jsPDF();

    // Define o título do relatório
    doc.setFontSize(18);
    doc.text(`Relatório de Ganhos Mensais - ${professionalData.nome}`, 14, 22);

    // Cria as colunas e o conteúdo da tabela, adicionando "Forma de Pagamento"
    const tableColumns = ["Data", "Procedimento", "Valor da Consulta", "Forma de Pagamento"];
    const tableRows = [];

    // Percorre os dados das consultas e formata para a tabela
    professionalData.consultas.forEach(consulta => {
      const formattedDate = new Date(consulta.data_de_criacao).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const consultData = [
        formattedDate, // Data formatada
        consulta.procedimento.nome, // Nome do procedimento
        `R$ ${consulta.valor_da_consulta}`, // Valor da consulta
        consulta.tipo_de_pagamento // Forma de pagamento (verifique o campo correto na resposta da API)
      ];
      tableRows.push(consultData);
    });

    // Gera a tabela no PDF usando AutoTable
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30,
    });

    // Adiciona o total de ganhos no final do PDF
    doc.setFontSize(14);
    doc.text(`Total de Ganhos: R$ ${professionalData.totalGanhos}`, 14, doc.lastAutoTable.finalY + 10);

    // Salva o PDF
    doc.save('relatorio_ganhos_mensais.pdf');
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
  }
};

export default generatePDF;
