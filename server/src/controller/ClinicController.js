import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async createClinic(req, res) {

    try {
      const { nome } = req.body

      let clinic = await prisma.clinica.findUnique({ where: { nome } })

      if (clinic) {
        return res.json({ error: "Já existe usuário com esse email" })
      }

      clinic = await prisma.clinica.create({
        data: {
          nome
        }
      })

      return res.json(clinic)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllClinics(req, res) {
    try {
      const clinics = await prisma.clinica.findMany()
      return res.json(clinics)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findClinic(req, res) {
    try {
      const { id } = req.params
      const clinic = await prisma.clinica.findUnique({
        where: { id: Number(id) }
      })

      if (!clinic) return res.json({ error: "Não foram encontradas clínicas com esse ID!" })

      return res.json(clinic)

    } catch (error) {
      return res.json({ error })

    }
  },

  async ClinicForName(req, res) {
    try {
      const { nome } = req.body;
      const clinic = await prisma.clinica.findUnique({
        where: { nome }
      })

      if (!clinic) return res.json({ error: "Não foram encontradas clínicas com esse nome!" })

      return res.json(clinic)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateClinic(req, res) {
    try {
      const { id } = req.params
      const { nome } = req.body

      let clinic = await prisma.clinica.findUnique({
        where: { id: Number(id) }
      })

      if (!clinic) return res.json({ error: "Não foram encontradas clínicas com esse ID!" })

      clinic = await prisma.clinica.update(
        {
          where: { id: Number(id) },
          data: { nome }
        })

      return res.json(clinic);
    } catch (error) {
      res.json({ error })
    }
  },

  async deleteClinic(req, res) {
    try {
      const { id } = req.params

      const clinic = await prisma.clinica.findUnique({
        where: { id: Number(id) }
      })

      if (!clinic) return res.json({ error: "Não foram encontradas clínicas com esse ID!" })

      await prisma.clinica.delete({ where: { id: Number(id) } })

      return res.json({ message: "Clínica deletada!" })

    } catch (error) {
      return res.json({ error })

    }
  },

async reportClinic(req, res) {
    try {
        const { id } = req.params;
        const { mes, ano } = req.body; // Receber o mês e o ano no body da requisição

        const clinic = await prisma.clinica.findUnique({
            where: { id: Number(id) },
            include: {
                Profissional: {
                    include: {
                        Consulta: {
                            include: { procedimento: true }
                        }
                    }
                }
            }
        });

        if (!clinic) {
            return res.status(404).json({ error: 'Clínica não encontrada' });
        }

        // Definir o intervalo de datas para o mês específico
        const mesInicio = new Date(ano, mes - 1, 1); // Primeiro dia do mês
        const mesFim = new Date(ano, mes, 1); // Primeiro dia do mês seguinte

        // Inicializar variáveis para total geral e individual
        let totalGanhosClinica = 0;
        const ganhosPorProfissional = clinic.Profissional.map(professional => {
            // Filtrar consultas do profissional dentro do período do mês
            const consultasFiltradas = professional.Consulta.filter(consulta => {
                const dataConsulta = new Date(consulta.data_de_criacao);
                return dataConsulta >= mesInicio && dataConsulta < mesFim;
            });

            const totalGanhosProfissional = consultasFiltradas.reduce(
                (acc, consulta) => acc + consulta.valor_da_consulta, 0
            );
            totalGanhosClinica += totalGanhosProfissional;
            return {
                nome: professional.nome,
                cargo: professional.cargo,
                totalGanhos: totalGanhosProfissional
            };
        });

        // Retornar o relatório da clínica
        return res.json({
            nomeClinica: clinic.nome,
            totalGanhosClinica,
            ganhosPorProfissional
        });

    } catch (error) {
        console.error('Erro ao gerar o relatório da clínica:', error.message);
        return res.status(500).json({ error: 'Erro ao gerar o relatório' });
    }
}


}