import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async createConsult(req, res) {
    const { id } = req.params
    const { valor_da_consulta, tipo_de_pagamento, pacienteId, profissionalId, procedimentoId } = req.body

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })
      const patient = await prisma.paciente.findUnique({ where: { id: Number(pacienteId) } })
      const professional = await prisma.profissional.findUnique({ where: { id: Number(profissionalId) } })
      const procedimento = await prisma.procedimento.findUnique({ where: { id: Number(procedimentoId) } })

      if (!clinic) {
        return res.status(400).json({ message: "Não foram encontrados clínicas com esse ID!" })
      }

      else if (!patient) {
        return res.status(400).json({ message: "Não foram encontrados pacientes com esse ID!" })
      }

      else if (!professional) {
        return res.status(400).json({ message: "Não foram encontrados profissionais com esse ID!" })
      }

      else if (!procedimento) {
        return res.status(400).json({ message: "Não foram encontrados procedimentos com esse ID!" })
      }

      const consult = await prisma.consulta.create({
        data: {
          clinicaId: clinic.id,
          pacienteId: patient.id,
          profissionalId: professional.id,
          procedimentoId: procedimento.id,
          valor_da_consulta,
          tipo_de_pagamento,
        },
        include: {
          clinica: true,
          paciente: true,
          profissional: true,
          procedimento: true,
        },
      })
      return res.json(consult)
    }
    catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },

  async findAllConsults(req, res) {
    try {
      const consults = await prisma.consulta.findMany({
        orderBy: { data_de_criacao: 'desc' },
        select: {
          id: true,
          data_de_criacao: true,
          paciente: {
            select: {
              nome: true,
            }
          },
          procedimento: {
            select: {
              nome: true,
            }
          },
          profissional: {
            select: {
              nome: true,
            },
          },
          clinica: {
            select: {
              nome: true,
            }
          },
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      return res.json(consults)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findConsultForPeriod(req, res) {
    try {
      const { data_inicial, data_final } = req.body

      const transformDateInitial = (date) => {
        const transformedDate = `${date}T00:00:00.000Z`
        return transformedDate
      }

      const transformDateFinal = (date) => {
        const transformedDate = `${date}T23:59:59.000Z`
        return transformedDate
      }

      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data_inicial)),
            lte: new Date(transformDateFinal(data_final))
          }
        },
        select: {
          id: true,
          data_de_criacao: true,
          paciente: {
            select: {
              nome: true,
            }
          },
          procedimento: {
            select: {
              nome: true,
            }
          },
          profissional: {
            select: {
              nome: true,
            },
          },
          clinica: {
            select: {
              nome: true,
            }
          },
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      return res.json(consults)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findConsultForPatient(req, res) {
    try {
      const { pacienteId } = req.params

      const consults = await prisma.consulta.findMany({
        where: { pacienteId: Number(pacienteId) },
        select: {
          id: true,
          data_de_criacao: true,
          valor_da_consulta: true,
          tipo_de_pagamento: true,
          paciente: {
            select: {
              nome: true,
            },
          },
          procedimento: {
            select: {
              id: true,
              nome: true,
            },
          },
          profissional: {
            select: {
              id: true,
              nome: true,
            },
          },
          clinica: {
            select: {
              id: true,
              nome: true,
            }
          },
        },

      })

      if (consults.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados consultas com esse paciente.' });
      }

      return res.json(consults)

    } catch (error) {
      return res.json({ error })
    }
  },

  async findConsultForProfessional(req, res) {
    try {
      const { profissionalId } = req.body

      const consults = await prisma.consulta.findMany({
        where: { profissionalId: Number(profissionalId) },
      })

      if (consults.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados consultas com esse profissional.' });
      }

      return res.json(consults)

    } catch (error) {
      return res.json({ error })
    }

  },

  async findConsultForProcediment(req, res) {
    try {
      const { procedimentoId } = req.body

      const consults = await prisma.consulta.findMany({
        where: { procedimentoId: Number(procedimentoId) },
      })

      if (consults.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados consultas com esse procedimento.' });
      }

      return res.json(consults)

    } catch (error) {
      return res.json({ error })
    }
  },

  async findConsult(req, res) {
    try {
      const { id } = req.params
      const consult = await prisma.consulta.findUnique({
        where: { id: Number(id) },
        select: {
          medico: {
            select: {
              nome: true,
            },
          },
          id: true,
          valor_da_consulta: true,
          paciente: true,
          data_de_criacao: true
        }
      })

      if (!consult) return res.status(400).json({ error: "Não foram encontrados registros de consultas com esse ID!" })

      return res.json(consult)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateConsult(req, res) {
    const { id } = req.params
    const { valor_da_consulta, tipo_de_pagamento, pacienteId, profissionalId, procedimentoId } = req.body

    try {
      const consult = await prisma.consulta.findUnique({ where: { id: Number(id) } })

      if (!consult) {
        return res.status(400).json({ message: "Não foram encontrados registros de consultas com esse ID!" })
      }

      const updatedConsult = await prisma.consulta.update({
        where: { id: Number(id) },
        data: {
          valor_da_consulta,
          tipo_de_pagamento,
          pacienteId,
          profissionalId,
          procedimentoId
        }
      })

      return res.json(updatedConsult)
    } catch (error) {
      return res.json({ error })
    }
  },

  async deleteConsult(req, res) {
    const { id } = req.params

    try {
      const consult = await prisma.consulta.findUnique({ where: { id: Number(id) } })

      if (!consult) {
        return res.status(400).json({ message: "Não foram encontrados registros de consultas com esse ID!" })
      }

      await prisma.consulta.delete({ where: { id: Number(id) } })

      return res.json({ message: "Registro de consulta apagado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}