import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default {
  async dailyData(req, res) {
    const { id } = req.params
    const { data } = req.body

    const transformDateInitial = (date) => {
      const transformedDate = `${date}T00:00:00.000Z`
      return transformedDate
    }

    const transformDateFinal = (date) => {
      const transformedDate = `${date}T23:59:59.000Z`
      return transformedDate
    }

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data)),
            lte: new Date(transformDateFinal(data))
          }, clinicaId: Number(id)
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
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      const numberOfConsults = consults.length

      const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0)

      function groupConsultsByProfissional(consults) {
        const consultsByProfissional = {};

        consults.forEach(consult => {
          const profissionalName = consult.profissional.nome;
          if (!consultsByProfissional[profissionalName]) {
            consultsByProfissional[profissionalName] = [];
          }
          consultsByProfissional[profissionalName].push(consult);
        });

        return consultsByProfissional;
      }

      const consultsByProfissional = groupConsultsByProfissional(consults);

      const valueForProfissional = Object.keys(consultsByProfissional).map(profissional => {
        const consults = consultsByProfissional[profissional];
        const numberOfConsults = consults.length;
        const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
        return { profissional, numberOfConsults, totalValue };
      })

      const dailyData = {
        dia: data,
        clinica: clinic.nome,
        total_de_consultas: numberOfConsults,
        valor_total: totalValue,
        valor_por_profissional: valueForProfissional
      }

      return res.json(dailyData)
    } catch (error) {
      return res.json({ error })
    }
  },

  async monthlyData(req, res) {
    const { id } = req.params
    const { data } = req.body

    const transformDateInitial = (date) => {
      const transformedDate = `${date}-01T00:00:00.000Z`
      return transformedDate
    }

    const transformDateFinal = (date) => {
      const transformedDate = `${date}-31T23:59:59.000Z`
      return transformedDate
    }

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data)),
            lte: new Date(transformDateFinal(data))
          }, clinicaId: Number(id)
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
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      const numberOfConsults = consults.length

      const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0)

      function groupConsultsByProfissional(consults) {
        const consultsByProfissional = {};

        consults.forEach(consult => {
          const profissionalName = consult.profissional.nome;
          if (!consultsByProfissional[profissionalName]) {
            consultsByProfissional[profissionalName] = [];
          }
          consultsByProfissional[profissionalName].push(consult);
        });

        return consultsByProfissional;
      }

      const consultsByProfissional = groupConsultsByProfissional(consults);

      const valueForProfissional = Object.keys(consultsByProfissional).map(profissional => {
        const consults = consultsByProfissional[profissional];
        const numberOfConsults = consults.length;
        const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
        return {
          profissional, numberOfConsults, totalValue
        }
      })

      const monthlyData = {
        mes: data,
        clinica: clinic.nome,
        total_de_consultas: numberOfConsults,
        valor_total: totalValue,
        valor_por_profissional: valueForProfissional
      }

      return res.json(monthlyData)
    } catch (error) {
      return res.json({ error })
    }

  },

  async dataForPeriod(req, res) {
    const { id } = req.params
    const { data_inicial, data_final  } = req.body

    const transformDateInitial = (date) => {
      const transformedDate = `${date}T00:00:00.000Z`
      return transformedDate
    }

    const transformDateFinal = (date) => {
      const transformedDate = `${date}T23:59:59.000Z`
      return transformedDate
    }

    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data_inicial)),
            lte: new Date(transformDateFinal(data_final))
          }, clinicaId: Number(id)
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
          valor_da_consulta: true,
          tipo_de_pagamento: true
        }
      })

      const numberOfConsults = consults.length

      const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0)

      function groupConsultsByProfissional(consults) {
        const consultsByProfissional = {};

        consults.forEach(consult => {
          const profissionalName = consult.profissional.nome;
          if (!consultsByProfissional[profissionalName]) {
            consultsByProfissional[profissionalName] = [];
          }
          consultsByProfissional[profissionalName].push(consult);
        });

        return consultsByProfissional;
      }

      const consultsByProfissional = groupConsultsByProfissional(consults);

      const valueForProfissional = Object.keys(consultsByProfissional).map(profissional => {
        const consults = consultsByProfissional[profissional];
        const numberOfConsults = consults.length;
        const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
        return {
          profissional, numberOfConsults, totalValue
        }
      })

      const data = {
        periodo: `${data_inicial} a ${data_final}`,
        clinica: clinic.nome,
        total_de_consultas: numberOfConsults,
        valor_total: totalValue,
        valor_por_profissional: valueForProfissional
      }

      return res.json(data)

    } catch (error) {
      return res.json({ error })
    }
  },

  async dataForRelatory(req, res) {
    const { id } = req.params;
    const { data } = req.body;
  
    const transformDateInitial = (date) => {
      const transformedDate = `${date}-01T00:00:00.000Z`;
      return transformedDate;
    };
  
    const transformDateFinal = (date) => {
      const transformedDate = `${date}-31T23:59:59.000Z`;
      return transformedDate;
    };
  
    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } });
  
      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data)),
            lte: new Date(transformDateFinal(data)),
          },
          clinicaId: Number(id),
        },
        select: {
          id: true,
          data_de_criacao: true,
          paciente: {
            select: {
              nome: true,
            },
          },
          procedimento: {
            select: {
              nome: true,
            },
          },
          profissional: {
            select: {
              nome: true,
            },
          },
          valor_da_consulta: true,
          tipo_de_pagamento: true,
        },
      });
  
      const consultsByDayAndProfissional = {};
  
      consults.forEach((consult) => {
        const consultDate = consult.data_de_criacao.toISOString().substr(0, 10);
        const profissionalName = consult.profissional.nome;
  
        if (!consultsByDayAndProfissional[consultDate]) {
          consultsByDayAndProfissional[consultDate] = {};
        }
  
        if (!consultsByDayAndProfissional[consultDate][profissionalName]) {
          consultsByDayAndProfissional[consultDate][profissionalName] = [];
        }
  
        consultsByDayAndProfissional[consultDate][profissionalName].push(consult);
      });
  
      const monthlyData = {
        mes: data,
        clinica: clinic.nome,
        detalhes_por_dia: Object.keys(consultsByDayAndProfissional).map((day) => {
          const dataByProfissional = consultsByDayAndProfissional[day];
          const profissionalDetails = Object.keys(dataByProfissional).map((profissional) => {
            const consults = dataByProfissional[profissional];
            const numberOfConsults = consults.length;
            const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
            return {
              profissional,
              numberOfConsults,
              totalValue,
            };
          });
          return {
            dia: day,
            profissionais: profissionalDetails,
          };
        }),
      };
  
      return res.json(monthlyData);
    } catch (error) {
      return res.json({ error });
    }
  },

  async monthlyDataforDay(req, res) {
    const { id } = req.params;
    const { data } = req.body;
  
    const transformDateInitial = (date) => {
      const transformedDate = `${date}-01T00:00:00.000Z`;
      return transformedDate;
    };
  
    const transformDateFinal = (date) => {
      const transformedDate = `${date}-31T23:59:59.000Z`;
      return transformedDate;
    };
  
    try {
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } });
  
      const consults = await prisma.consulta.findMany({
        where: {
          data_de_criacao: {
            gte: new Date(transformDateInitial(data)),
            lte: new Date(transformDateFinal(data)),
          },
          clinicaId: Number(id),
        },
        select: {
          id: true,
          data_de_criacao: true,
          paciente: {
            select: {
              nome: true,
            },
          },
          procedimento: {
            select: {
              nome: true,
            },
          },
          profissional: {
            select: {
              nome: true,
            },
          },
          valor_da_consulta: true,
          tipo_de_pagamento: true,
        },
      });
  
      const consultsByDayAndProfissional = {};
  
      consults.forEach((consult) => {
        const consultDate = consult.data_de_criacao.toISOString().substr(0, 10);
        const profissionalName = consult.profissional.nome;
  
        if (!consultsByDayAndProfissional[consultDate]) {
          consultsByDayAndProfissional[consultDate] = {};
        }
  
        if (!consultsByDayAndProfissional[consultDate][profissionalName]) {
          consultsByDayAndProfissional[consultDate][profissionalName] = [];
        }
  
        consultsByDayAndProfissional[consultDate][profissionalName].push(consult);
      });
  
      const monthlyData = {
        mes: data,
        clinica: clinic.nome,
        detalhes_por_dia: Object.keys(consultsByDayAndProfissional).map((day) => {
          const dataByProfissional = consultsByDayAndProfissional[day];
          const profissionalDetails = Object.keys(dataByProfissional).map((profissional) => {
            const consults = dataByProfissional[profissional];
            const numberOfConsults = consults.length;
            const totalValue = consults.reduce((acc, curr) => acc + curr.valor_da_consulta, 0);
            return {
              profissional,
              numberOfConsults,
              totalValue,
            };
          });
          return {
            dia: day,
            profissionais: profissionalDetails,
          };
        }),
      };
  
      return res.json(monthlyData);
    } catch (error) {
      return res.json({ error });
    }
  },
  

}