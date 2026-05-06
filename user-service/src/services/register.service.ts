import bcrypt from "bcryptjs"
import type { User } from "@/generated/prisma/client.ts"

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}


export class RegisterService {
  constructor(private readonly userRepository: any) {}

  async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    // verificar se o usuário já existe com o email informado
    const doesUserExistsWithEmail = await this.userRepository.findByEmail(email)
    if (doesUserExistsWithEmail) {
      throw new Error("Usuário já existe com esse email")
    }
    const passwordHashed = await bcrypt.hash(password, 10)

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    return user
  }
}
