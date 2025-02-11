import { compare } from "bcrypt";
import { prisma } from "../init";
import { isEmpty } from "../isEmpty";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Bad Body", { status: 400 });

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) return new Response("Username Not Found", { status: 400 });
    const passMatches = await compare(password, user?.password as string);

    if (!passMatches)
      return new Response("Incorrect Password", { status: 400 });

    const token = await sign({ username, id: user?.id }, "secret");

    const user2 = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    return Response.json({
      token,
      user: {
        username: user2?.username,
        avatarLink: user2?.avatarLink,
      },
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
