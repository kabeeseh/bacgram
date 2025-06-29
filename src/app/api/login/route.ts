import { compare } from "bcrypt";
import { isEmpty } from "../isEmpty";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password])) {
      return new Response("Username and password are required", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const passValid = await compare(password, user.password);

    if (!passValid) {
      return new Response("Invalid password", { status: 401 });
    }

    const token = await sign(
      { id: user.id, username },
      process.env.SECRET as string
    );

    return Response.json({ token, user });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
