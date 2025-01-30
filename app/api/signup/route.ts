import { isEmpty } from "../isEmpty";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password]))
      return new Response("Bad Body", { status: 400 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
