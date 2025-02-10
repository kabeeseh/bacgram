import { hash } from "bcrypt";
import { prisma } from "../init";
import { isEmpty } from "../isEmpty";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Bad Body", { status: 400 });

    const userCheck = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userCheck) return new Response("Username Taken", { status: 400 });

    const user = await prisma.user.create({
      data: {
        username,
        password: await hash(password, 10),
      },
    });

    const token = await sign({ username, id: user.id }, "secret");

    return Response.json(token);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
