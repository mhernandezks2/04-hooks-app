import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction = 
| { type: 'ADD_TODO', payload: string }
| { type: 'TOGGLE_TODO', payload: number }
| { type: 'DELETE_TODO', payload: number }

const TodoSchema = z.object({
  id: z.number(),
  text: z.string().min(2).max(100),
  completed: z.boolean(),
});

const TaskSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
    const savedState = localStorage.getItem('tasks-state');
    if (savedState) {
        const result = TaskSchema.safeParse(JSON.parse(savedState));
        if (result.success) return result.data;

    }
    return {
        todos: [],
        length: 0,
        completed: 0,
        pending: 0,
    };
};

export const taskReducer = (state: TaskState, action: TaskAction):TaskState => {

    switch(action.type){
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            return {
                ...state,
                todos: [...state.todos, newTodo],
                length: state.todos.length + 1,
                pending: state.pending + 1,
            };
        }
        case 'DELETE_TODO': {

            const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: updatedTodos.filter((todo) => todo.completed).length,
                pending: updatedTodos.filter((todo) => !todo.completed).length,
            };
        }
        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: updatedTodos.filter((todo) => todo.completed).length,
                pending: updatedTodos.filter((todo) => !todo.completed).length,
            };
        }
        default:
            return state;
    }
}