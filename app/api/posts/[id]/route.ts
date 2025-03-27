import { verify } from "jsonwebtoken";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const authHeader = req.headers.get("Authorization")?.split(' ')[1];

        if (!authHeader || !verify(authHeader, process.env.SECRET as string)) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { id } = params;
        return new Response(id);
    } catch (error: any) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
