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
);

return Response.json({ success: true });
}

const toggleTask = async (id: number) => {
    await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ id }),
    });

    fetchTasks();
};