let tasks : Task[] = [];

export async function GET() {
    return Response.json(tasks);
}

export async function POST(req: Request) {
    const body = await req.json();

    const newTask = {
        id: Date.now(),
        title: body.title,
        completed: false,
    };

    tasks.push(newTask);

    return Response.json(newTask);
}