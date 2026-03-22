let tasks : { id: number; title: string }[] = [];

export async function GET() {
    return Response.json(tasks);
}

export async function POST(req: Request) {
    
}