import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import { TodoData } from "../../components/Todo";

export interface Todo {
    id: string;
    text: string;
    completed?: boolean;
}


const initialState = [] as Todo[]



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        completedTodo(state, action: PayloadAction<{ completed: boolean; id: string }>) {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            state[index].completed = action.payload.completed
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodo.fulfilled, (_, action) => {
            return action.payload.map((todo) => ({ ...todo }));

        });
        builder.addCase(getTodo.pending, (state) => {
            return state.map((todo) => ({ ...todo }));

        });
        builder.addCase(getTodo.rejected, (state) => {
            return state.map((todo) => ({ ...todo }));

        });

        // builder.addCase(completeTodo.fulfilled, (state, action) => {
        //     const { id, completed } = action.payload 
        //     const todoIndex = state.findIndex((todo) => todo.id === id);
        //     if (todoIndex !== 1) {
        //         state[todoIndex].completed = completed;
        //     }
        // });
    }
})


export const todoActions = todoSlice.actions



export const postTodo = createAsyncThunk<void, TodoData>(
    "todo/addTodo",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstance.post(`todo.json`, data);
            dispatch(getTodo());

        } catch (error) {
            return rejectWithValue("failed add todo");
        }
    }
);


export const getTodo = createAsyncThunk(
    "todo/getTodo",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`todo.json`);
            const data = await response.data;
            const result = [];
            for (const key in data) {
                result.push({
                    id: key,
                    text: data[key].text,
                });
            }

            return result;
        } catch (error) {
            return rejectWithValue("failed add todo");
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstance.delete(`todo/${id}.json`);
            dispatch(getTodo());
        } catch (error) {
            return rejectWithValue("failed add todo");
        }
    }
);
// export const completeTodo = createAsyncThunk(
//     "todo/completeTodo",
//     async ({ id, completed }: Todo, { rejectWithValue }) => {
//         console.log(id, completed, 'compl');

//         try {
//             await axiosInstance.put(`todo/${id}.json`, { completed });
//         } catch (error) {
//             return rejectWithValue("failed complete todo");
//         }
//     }
// );

