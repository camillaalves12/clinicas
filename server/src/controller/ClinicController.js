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

}