import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async createScheduling(req, res) {
    const { id } = req.params
    const { data_da_consulta, hora_da_consulta, valor_da_consulta, tipo_de_pagamento, pacienteId, profissionalId, procedimentoId } = req.body

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

      const scheduling = await prisma.agendamento.create({
        data: {
          clinicaId: clinic.id,
          pacienteId: patient.id,
          profissionalId: professional.id,
          procedimentoId: procedimento.id,
          valor_da_consulta,
          tipo_de_pagamento,
          data_da_consulta,
          hora_da_consulta,
        },
        include: {
          clinica: true,
          paciente: true,
          profissional: true,
          procedimento: true,
        },
      })
      return res.json(scheduling)
    }
    catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },

  async findAllSchedulings(req, res) {
    try {
      const schedulings = await prisma.agendamento.findMany({
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
          tipo_de_pagamento: true,
          data_da_consulta: true,
          hora_da_consulta: true
        }
      })

      return res.json(schedulings)
    } catch (error) {
      return res.json({ error })
    }
  },

  async upcomingSchedulings(req, res) {
    try {
      const schedulings = await prisma.agendamento.findMany({
        where: {
          data_da_consulta: {
            gte: new Date()
          }, confirmado: {
            equals: false
          }
        },
        select: {
          id: true,
          data_de_criacao: true,
          confirmado: true,
          paciente: {
            select: {
              id: true,
              nome: true,
            }
          },
          procedimento: {
            select: {
              id: true,
              nome: true,
            }
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
          valor_da_consulta: true,
          tipo_de_pagamento: true,
          data_da_consulta: true,
          hora_da_consulta: true
        }
      })

      return res.json(schedulings)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findSchedulingsForDate(req, res) {
    try {
      const { data } = req.body

      const transformDate = (date) => {
        const transformedDate = `${date}T00:00:00.000Z`
        return transformedDate
      }

      const schedulings = await prisma.agendamento.findMany({
        where: {
          data_da_consulta: {
            contains: data
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
          tipo_de_pagamento: true,
          data_da_consulta: true,
          hora_da_consulta: true
        }
      })

      return res.json(schedulings)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findSchedulingsForPatient(req, res) {
    try {
      const { pacienteId } = req.body

      const schedulings = await prisma.agendamento.findMany({
        where: { pacienteId: Number(pacienteId) },
      })

      if (schedulings.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados agendamentos com esse paciente.' });
      }

      return res.json(schedulings)

    } catch (error) {
      return res.json({ error })
    }
  },

  async findSchedulingsForProfessional(req, res) {
    try {
      const { profissionalId } = req.body

      const schedulings = await prisma.agendamento.findMany({
        where: { profissionalId: Number(profissionalId) },
      })

      if (schedulings.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados agendamentos com esse profissional.' });
      }

      return res.json(schedulings)

    } catch (error) {
      return res.json({ error })
    }

  },

  async findSchedulingsForProcediment(req, res) {
    try {
      const { procedimentoId } = req.body

      const schedulings = await prisma.agendamento.findMany({
        where: { procedimentoId: Number(procedimentoId) },
      })

      if (schedulings.length === 0) {
        return res.status(400).json({ error: 'Não foram encontrados agendamentos com esse procedimento.' });
      }

      return res.json(schedulings)

    } catch (error) {
      return res.json({ error })
    }
  },

  async updateScheduling(req, res) {
    const { id } = req.params
    const { data_da_consulta, hora_da_consulta, valor_da_consulta, pacienteId, profissionalId, procedimentoId } = req.body

    try {
      const scheduling = await prisma.agendamento.findUnique({ where: { id: Number(id) } })

      if (!scheduling) {
        return res.status(400).json({ message: "Não foram encontrados registros de agendamentos com esse ID!" })
      }

      const updatedScheduling = await prisma.agendamento.update({
        where: { id: Number(id) },
        data: {
          valor_da_consulta,
          data_da_consulta,
          hora_da_consulta,
          pacienteId,
          profissionalId,
          procedimentoId
        }
      })

      return res.json(updatedScheduling)
    } catch (error) {
      return res.json({ error })
    }
  },

  async confirmScheduling(req, res) {
    const { id } = req.params

    try {
      const scheduling = await prisma.agendamento.findUnique({ where: { id: Number(id) } })

      if (!scheduling) {
        return res.status(400).json({ message: "Não foram encontrados registros de agendamentos com esse ID!" })
      }

      const updatedScheduling = await prisma.agendamento.update({
        where: { id: Number(id) },
        data: {
          confirmado: true,
        }
      })

      return res.json(updatedScheduling)
    } catch (error) {
      return res.json({ error })
    }
  },

  async deleteScheduling(req, res) {
    const { id } = req.params

    try {
      const scheduling = await prisma.agendamento.findUnique({ where: { id: Number(id) } })

      if (!scheduling) {
        return res.status(400).json({ message: "Não foram encontrados registros de agendamentos com esse ID!" })
      }

      await prisma.agendamento.delete({ where: { id: Number(id) } })

      return res.json({ message: "Registro de agendamento apagado!" })
    }
    catch (error) {
      return res.json({ error })
    }

  }

}