import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {

  async createProfessional(req, res) {
    try {
      const { id } = req.params
      const { nome, especialidade } = req.body

      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      if (!clinic) {
        return res.json({ error: 'Não existe clínica com esse id!' })
      }

      const existingProfessional = await prisma.profissional.findFirst({
        where: {
          nome,
          clinicaId: clinic.id
        }
      })

      if (existingProfessional) {
        return res.status(400).json({ error: 'Já existe um profissional com esse nome nesta clínica' })
      }

      const professional = await prisma.profissional.create({
        data: {
          nome,
          cargo: especialidade,
          clinicaId: clinic.id
        },
        include: {
          clinica: true
        }
      })

      return res.json(professional)
    } catch (error) {
      console.error('Ocorreu um erro:', error)
      return res.json({ error: 'Ocorreu um erro durante o processamento da solicitação' })
    }
  },

  async findAllProfessionals(req, res) {
    try {
      const professionals = await prisma.profissional.findMany()
      return res.json(professionals)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findProfessional(req, res) {
    try {
      const { id } = req.params
      const professional = await prisma.profissional.findUnique({
        where: { id: Number(id) }
      })

      if (!professional) return res.json({ error: "Não foram encontrados profissionais com esse ID!" })

      return res.json(professional)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findProfessionalForName(req, res) {
    try {
      const { nome } = req.body;
      const professionals = await prisma.profissional.findMany({
        where: { nome: { contains: nome, mode: 'insensitive'} }
      });

      if (professionals.length === 0) {
        return res.json({ error: 'Não foram encontrados profissionais com esse nome.' });
      }

      return res.json(professionals);
    } catch (error) {
      return res.json({ error });
    }
  },

  async updateProfessional(req, res) {
    try {
      const { id } = req.params
      const { nome, cargo, clinicaId } = req.body

      let professional = await prisma.profissional.findUnique({
        where: { id: Number(id) }
      })

      if (!professional) return res.json({ error: "Não foram encontrados profissionais com esse ID!" })

      professional = await prisma.profissional.update(
        {
          where: { id: Number(id) },
          data: { nome, cargo, clinicaId }
        })

      return res.json(professional);
    } catch (error) {
      res.json({ error })
    }
  },

  async deleteProfessional(req, res) {
    try {
      const { id } = req.params

      const professional = await prisma.profissional.findUnique({
        where: { id: Number(id) }
      })

      if (!professional) return res.json({ error: "Não foram encontrados profissionais com esse ID!" })

      await prisma.profissional.delete({ where: { id: Number(id) } })

      return res.json({ message: "Profissional deletado!" })

    } catch (error) {
      return res.json({ error })

    }
  },

}