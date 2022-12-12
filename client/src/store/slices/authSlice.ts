import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '../../services';
import { IUserExtends, IUserLogin } from '../../interfaces';

interface IInitialState {
    user: IUserExtends | null;
    isAuth: number | null,
    loginError: string,
    registerError: string,
    registerPending: boolean,
    isLoading: boolean,
    confirmEmailCode: number | null;
    error: string;
    restorePending: boolean;
}

const initialState: IInitialState = {
    user: null,
    isAuth: null,
    loginError: '',
    registerError: '',
    registerPending: false,
    isLoading: false,
    confirmEmailCode: null,
    error: '',
    restorePending: false,
};

export const registrationUserThank = createAsyncThunk(
    'UsersSlice/registrationUserThank',
    async (user: FormData, {
        rejectWithValue
    }) => {
        try {
            const { data } = await authService.registration(user);
            return data;
        } catch (e: any) {
            console.log(e.response);
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const logInUserThank = createAsyncThunk(
    'UsersSlice/logInUserThank',
    async (user: IUserLogin, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const { data } = await authService.logIn(user);
            dispatch(setAuth({ data }));
            return data;
        } catch (e: any) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const logOutThank = createAsyncThunk(
    'UsersSlice/logOutThank',
    async (userId: number, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            dispatch(logOut());
            console.log(userId);
            await authService.logOut(userId);
        } catch (e: any) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const restorePasswordThank = createAsyncThunk(
    'UsersSlice/restorePasswordThank',
    async (email: string, {
        rejectWithValue
    }) => {
        try {
            const { data } = await authService.forgotPassword({ email });
            return data;
        } catch (e: any) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const checkAuthThank = createAsyncThunk(
    'UsersSlice/checkAuthThank',
    async (token: string, {
        dispatch,
        rejectWithValue
    }) => {
        dispatch(setLoading(true));
        try {
            const { data } = await authService.refresh({ refreshToken: token });
            dispatch(setAuth({ data }));
            return data;
        } catch (e: any) {
            localStorage.clear();
            return rejectWithValue(e.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

const authSlice = createSlice({
    name: 'UsersSlice',
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            const {
                accessToken,
                refreshToken,
                role,
                user
            } = action.payload.data;
            localStorage.setItem('isAuth', (JSON.stringify(user)));
            localStorage.setItem('role', (role));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        setError: state => {
            state.loginError = '';
        },
        logOut: state => {
            localStorage.clear();
            state.user = null;
        },
        setLoading: (state, actions) => {
            state.isLoading = actions.payload;
        },
        clearInitialState: state => {
            state.user = null;
            state.isAuth = null;
            state.loginError = '';
            state.registerError = '';
            state.confirmEmailCode = null;
            state.error = '';
        },

    },
    extraReducers: builder => {

        builder.addCase(registrationUserThank.pending, (state => {
            state.registerPending = true;
        }));

        builder.addCase(registrationUserThank.fulfilled, ((state, action) => {
            if (action.payload) {
                const {
                    role,
                    accessToken,
                    refreshToken,
                    user,
                    confirmCode
                } = action.payload;
                state.isAuth = user.id;
                state.registerError = '';
                state.user = user;
                state.confirmEmailCode = confirmCode;
                localStorage.setItem('isAuth', (JSON.stringify(user)));
                localStorage.setItem('role', (role));
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
            state.registerPending = false;

        }));

        builder.addCase(registrationUserThank.rejected, ((state, action) => {
            state.registerError = action.payload as string;
            state.registerPending = false;
        }));

        builder.addCase(logInUserThank.fulfilled, ((state, action) => {
            if (action.payload) {
                const { user } = action.payload;
                state.loginError = '';
                state.user = user;
            }
            return;
        }));
        builder.addCase(logInUserThank.rejected, ((state, action) => {
            console.log(action.payload);
            state.loginError = action.payload  as string;
        }));

        builder.addCase(checkAuthThank.fulfilled, ((state, action) => {
            if (action.payload) {
                const { user } = action.payload;
                state.loginError = '';
                state.user = user;
            }
            return;
        }));

        builder.addCase(checkAuthThank.rejected, ((state, action) => {
            state.loginError = action.payload as string;
        }));

        builder.addCase(restorePasswordThank.pending, (state=> {
            state.restorePending = true;
        }));
        builder.addCase(restorePasswordThank.fulfilled, ((state, action) => {
            const { user, confirmCode } = action.payload
            state.confirmEmailCode = confirmCode;
            state.user = user;
            state.error = '';
            state.restorePending = false;
        }));
        builder.addCase(restorePasswordThank.rejected, ((state, action) => {
            state.error = action.payload as string;
            state.restorePending = false;
        }));

    }
});

export const {
    setAuth,
    setError,
    setLoading,
    logOut
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
