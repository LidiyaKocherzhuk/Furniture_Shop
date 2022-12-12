import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser, IUserExtends } from '../../interfaces';
import { userService } from '../../services';

interface IInitialState {
    users: IUserExtends[],
    user: IUser,
    error: null | string;
    userLoading: boolean;
}

const initialState:IInitialState = {
    users: [],
    user: { username: '', email: '', password: '' },
    error: null,
    userLoading: false,
}

export const getAllUsersThank = createAsyncThunk(
    'userSlice/getAllUsersThank',
    async (limit: number, { dispatch, rejectWithValue } )=>{
        try {
            const { data } = await userService.getAll(limit);
            dispatch(setUsers({ users: data })) ;
        }catch (e: any) {
            return rejectWithValue(e);
        }
    }
)

export const getUserByIdThank = createAsyncThunk(
    'userSlice/getUserByIdThank',
    async (id: number , { rejectWithValue } )=>{
        try {
            const { data } = await userService.getUser(id);
            console.log(data);
            return data;
        }catch (e: any) {
            return rejectWithValue(e);
        }
    }
)

export const updatePasswordThank = createAsyncThunk(
    'UsersSlice/updatePasswordThank',
    async (updateData: { id: number, password: string }, {
        rejectWithValue
    }) => {
        try {
            const { id, password } = updateData;

            await userService.update(id, { password });
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteUserByIdThank = createAsyncThunk(
    'userSlice/deleteUserByIdThank',
    async (id: number , { dispatch, rejectWithValue } )=>{
        try {
            const { data } = await userService.delete(id);
            dispatch(setUsers({ users: data })) ;
        }catch (e: any) {
            return rejectWithValue(e);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
        }
    },
    extraReducers:  builder => {
        builder.addCase(getAllUsersThank.pending, ((state, action) => {
            state.userLoading = true;
        }));
        builder.addCase(getAllUsersThank.rejected, ((state, action) => {
            state.error = action.payload as string;
        }));
        builder.addCase(getUserByIdThank.pending, ((state, action) => {
            state.userLoading = true;
        }));
        builder.addCase(getUserByIdThank.fulfilled, ((state, action) => {
            state.user = action.payload;
        }));
        builder.addCase(getUserByIdThank.rejected, ((state, action) => {
            state.error = action.payload as string;
        }));
    }

})

export const { setUsers } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
