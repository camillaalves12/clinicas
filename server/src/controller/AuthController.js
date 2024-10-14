import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { verify, sign } from 'jsonwebtoken'

const prisma = new PrismaClient()

export default {

  async authenticate(req, res) {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({ where: { email } })

    if (!user) {
      return res.json({ error: 'Usuário não encontrado' })
    }

    const isValuePassword = await compare(senha, user.senha)

    if (!isValuePassword) {
      return res.json({ error: 'Senha incorreta' })
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: "7d" })

    const { id, nome, admin, clinicaId } = user
    const clinica = await prisma.clinica.findUnique({ where: { id: clinicaId } })
    return res.json({
      user: {
        id, nome, admin, email, clinica: clinica.nome, clinicaId: clinica.id
      }, token
    })
  },

  async refreshToken(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const [, token] = authorization.split(" ");

    try {
      // Verifica o token existente
      const decoded = verify(token, "secret");

      // Gera um novo token com base no mesmo id do usuário
      const newToken = sign({ id: decoded.id }, "secret", { expiresIn: "1d" });

      return res.json({ token: newToken });
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  }

}