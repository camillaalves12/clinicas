import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export default {
  async createUser(req, res) {

    try {
      const { id } = req.params
      const { nome, email, senha, admin } = req.body
      const hashPassword = await hash(senha, 8)

      let user = await prisma.usuario.findUnique({ where: { email } })
      const clinic = await prisma.clinica.findUnique({ where: { id: Number(id) } })

      if (!clinic) {
        return res.json({ error: 'Não existe clinica com esse id!' })
      }

      if (user) {
        return res.json({ error: "Já existe usuário com esse email" })
      }

      const role = admin.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER';

      user = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hashPassword,
          admin: role,
          clinicaId: clinic.id
        }, include: {
          clinica: true
        }
      })

      return res.json(user)
    } catch (error) {
      return res.json({ error:error.message })
    }
  },

  async findAllUsers(req, res) {
    try {
      const users = await prisma.usuario.findMany()
      return res.json({ users })

    } catch (error) {
      return res.json({ error })

    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params
      const user = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      return res.json(user)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { nome, email } = req.body

      let user = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      user = await prisma.usuario.update(
        {
          where: { id: Number(id) },
          data: { nome, email }
        })

      return res.json(user);
    } catch (error) {
      res.json({ error: error.message  })
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params

      const user = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      })

      if (!user) return res.json({ error: "Não foram encontrados usuários com esse ID!" })

      await prisma.usuario.delete({ where: { id: Number(id) } })

      return res.json({ message: "Usuário deletado!" })

    } catch (error) {
      return res.json({ error })

    }
  },

}