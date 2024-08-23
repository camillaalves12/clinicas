import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {

  async createProcediment(req, res) {
    const { id } = req.params
    const { nome, tipo_de_procedimento } = req.body

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      if (!clinic) {
        return res.json({ message: "Não foram encontradas clinincas com esse ID!" })
      }

      const procedimentType = await prisma.tipo_de_procedimento.findUnique({ where: { id: Number(tipo_de_procedimento) } })

      if (!procedimentType) {
        return res.json({ message: "Não foram encontrados tipos de procedimentos com esse ID!" })
      }

      const existingProcediment = await prisma.procedimento.findFirst({
        where: {
          nome,
          tipo_de_procedimentoId: procedimentType.id,
        }
      })

      if (existingProcediment) {
        return res.json({ error: 'Esse procedimento já existe nesta clínica' })
      }

      const procediment = await prisma.procedimento.create({
        data: {
          nome,
          tipo_de_procedimentoId: procedimentType.id
        },
        include: {
          tipo_de_procedimento: true,
        }
      })

      return res.json(procediment)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllProcediments(req, res) {
    try {
      const procediments = await prisma.procedimento.findMany({
        select: {
          id: true,
          nome: true,
          tipo_de_procedimento: {
            select: {
              nome: true,
            }
          }
        }
      })

      return res.json(procediments)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findProcediment(req, res) {
    try {
      const { id } = req.params
      const procediment = await prisma.procedimento.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          nome: true,
          tipo_de_procedimento: {
            select: {
              nome: true,
            }
          }
        }
      })

      if (!procediment) return res.json({ error: "Não foram encontrados procedimentos com esse ID!" })

      return res.json(procediment)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findProcedimentsForName(req, res) {
    try {
      const { nome } = req.body;

      const procediment = await prisma.procedimento.findMany({
        where: { nome: { contains: nome, mode: 'insensitive' } },
      });

      if (procediment.length === 0) {
        return res.json({ error: 'Não foram encontrados procedimentos com esse nome.' });
      }

      return res.json(procediment);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findProcedimentsForType(req, res) {
    try {
      const { id } = req.params;

      const procedimentType = await prisma.tipo_de_procedimento.findUnique({
        where: { id: Number(id) }
      })

      if (!procedimentType) {
        return res.json({ error: 'Não foram encontrados tipos de procedimentos com esse ID.' });
      }
      const procediments = await prisma.procedimento.findMany({
        where: { tipo_de_procedimentoId: procedimentType.id }
      })

      if (procediments.length === 0) {
        return res.json({ error: 'Não foram encontrados procedimentos com esse tipo.'});
      }

      return res.json(procediments);

    } catch (error) {
      return res.json({ error });
    }
  },

  async updateProcediment(req, res) {
    const { id } = req.params
    const { nome, tipo_de_procedimento } = req.body

    try {
      const procediment = await prisma.procedimento.findUnique({ where: { id: Number(id) } })

      if (!procediment) {
        return res.json({ message: "Não foram encontrados procedimentos com esse ID!" })
      }

      const procedimentType = await prisma.tipo_de_procedimento.findUnique({ where: { id: Number(tipo_de_procedimento) } })

      if (!procedimentType) {
        return res.json({ message: "Não foram encontrados tipos de procedimentos com esse ID!" })
      }

      await prisma.procedimento.update({
        where: { id: Number(id) },
        data: {
          nome,
          tipo_de_procedimentoId: procedimentType.id
        }
      })

      return res.json({ message: "Procedimento atualizado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  },

  async deleteProcediment(req, res) {
    const { id } = req.params

    try {
      const procediment = await prisma.procedimento.findUnique({ where: { id: Number(id) } })

      if (!procediment) {
        return res.json({ message: "Não foram encontrados procedimentos com esse ID!" })
      }

      await prisma.procedimento.delete({ where: { id: Number(id) } })

      return res.json({ message: "Procedimento apagado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}