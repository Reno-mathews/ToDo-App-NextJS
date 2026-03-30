type Task = {
    id: number;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate: string;
};

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

export async function PATCH(req: Request) {
    const body = await req.json();

    tasks = tasks.map((task) => 
    task.id === body.id
    ? { ...task, completed: !task.completed }
    :task
)
}

export async function DELETE(req: Request) {
    const body = await req.json();

    tasks = tasks.filter((task) => task.id !== body.id);

return Response.json({ success: true });
}

