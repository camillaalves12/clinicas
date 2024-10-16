import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa para acessar o id da URL
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { api } from '../../services/api'; // Importando sua instância de axios (API service)

export function ReportsPage() {
  const { id } = useParams(); // Pegando o id da URL
  const [professionalData, setProfessionalData] = useState(null);

  useEffect(() => {
    // Quando o componente carrega, busca os dados automaticamente
    const fetchProfessionalData = async () => {
      try {
        const response = await api.post(`/professionalDetails/${id}`, {
          mes: '10', // Adapte para buscar dinamicamente o mês/ano
          ano: '2024',
        });
        setProfessionalData(response.data);
      } catch (error) {
        console.error('Erro ao buscar relatório:', error);
      }
    };
    fetchProfessionalData();
  }, [id]);

  // Função para gerar o PDF
  const generatePDF = () => {
    if (!professionalData) return;

    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(18);
    doc.text(`Relatório de Ganhos Mensais - ${professionalData.nome}`, 14, 22);

    // Tabela com dados das consultas
    doc.autoTable({
      head: [['Data', 'Procedimento', 'Valor da Consulta']],
      body: professionalData.consultas.map(consulta => [
        new Date(consulta.data_de_criacao).toLocaleDateString(),
        consulta.procedimento.nome,
        `R$ ${consulta.valor_da_consulta}`,
      ]),
      startY: 30,
    });

    // Total de ganhos
    doc.setFontSize(14);
    doc.text(`Total de Ganhos: R$ ${professionalData.totalGanhos}`, 14, doc.lastAutoTable.finalY + 10);

    // Salva o PDF
    doc.save('relatorio_ganhos_mensais.pdf');
  };

  return (
    <>
      <button onClick={generatePDF} disabled={!professionalData}>
        Gerar PDF
      </button>
      {/* Adicione mais informações do profissional se necessário */}
    </>
  );
}
