import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    madeOfService,
    productsService,
} from '../../services';
import {
    IMadeOfMaterial,
    IProduct,
    IProductLimit,
    ISortProduct,
} from '../../interfaces';
import { IIsLikeProducts } from '../../interfaces/isLikeInterface';

interface IInitialState {
    product: IProduct;
    products: IProduct[],
    materials: IMadeOfMaterial[];
    error: null | string | undefined;
    likesProducts: IIsLikeProducts[];

}

const initialState: IInitialState = {
    product: {} as IProduct,
    products: [],
    materials: [],
    error: null,
    likesProducts: [],

}

export const getProductsThank = createAsyncThunk(
    'getProductsThank/productsSlice',
    async (limit: number, {
        rejectWithValue
    }) => {
        try {
            const { data } = await productsService.getAll(limit);
            return { products: data };
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getProductByIdThank = createAsyncThunk(
    'getProductByIdThank/productsSlice',
    async (id: number, {
        rejectWithValue
    }) => {
        try {
            console.log(id);
            const { data } = await productsService.getById(id);
            console.log(data);
            return { product: data };
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getProductsByParamsThank = createAsyncThunk(
    'getProductsByParamsThank/productsSlice',
    async (params: Partial<IProductLimit>, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.getByParams(params);
            dispatch(setProducts({ products: data }));
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const filterByParamsThank = createAsyncThunk(
    'filterByParamsThank/productsSlice',
    async (params: Partial<IProductLimit>, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.filterByParams(params);
            dispatch(setProducts({ products: data }));
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const sortProductsByParamsThank = createAsyncThunk(
    'sortProductsByParamsThank/productsSlice',
    async (params: ISortProduct, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.sortByParams(params);
            console.log(data);
            dispatch(setProducts({ products: data }));
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getLikeProductsThank = createAsyncThunk(
    'getLikeProductsThank/productsSlice',
    async (id: number, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.getLikes(id);
            console.log(data)
            dispatch(setUserStorage({ user: data.user }))
            return { likesProducts: data.products };
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getAllMaterialThank = createAsyncThunk(
    'getAllMaterialThank/productSlice',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await madeOfService.getAll()
            return { materials: data };
        } catch (e: any) {
            rejectWithValue(e);
        }
    }
);

const productSlice = createSlice({
    name: 'productSlice',

    initialState: initialState,

    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload?.products;
        },
        setUserStorage: (state, action) => {
            localStorage.setItem('isAuth', JSON.stringify(action.payload.user));
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getProductsThank.fulfilled, ((state, action) => {
            state.products = action.payload?.products;
        }));
        builder.addCase(getProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));

        builder.addCase(getProductByIdThank.fulfilled, ((state, action) => {
            state.product = action.payload?.product;
        }));
        builder.addCase(getProductByIdThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));

        builder.addCase(getProductsByParamsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
        builder.addCase(getAllMaterialThank.fulfilled, ((state, action) => {
            state.materials = action.payload?.materials;
        }));

        builder.addCase(getAllMaterialThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));

        builder.addCase(getLikeProductsThank.fulfilled, ((state, action) => {
            state.likesProducts = action.payload?.likesProducts;
        }));
        builder.addCase(getLikeProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
    },

});

export const {
    setProducts,
    setUserStorage,
} = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
