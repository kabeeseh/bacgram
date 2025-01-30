import { isEmpty } from "../isEmpty";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Bad Body", { status: 400 });

    return new Response("jih");
  } catch (error) {
    return new Response(error as any, { status: 500 });
  }
}
