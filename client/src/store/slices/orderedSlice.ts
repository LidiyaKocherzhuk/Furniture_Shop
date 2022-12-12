import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { productsService , orderedService } from '../../services';
import { setUserStorage } from './productSlice';
import { IOrdered, IOrderedProdukt } from '../../interfaces/orderedtInterface';

interface IInitialState {
    error: null | string | undefined;
    orderedProducts: IOrderedProdukt[];
    orderedPriceCount: number;
}

const initialState:IInitialState = {
    error: null,
    orderedProducts: [],
    orderedPriceCount: 0,
};

export const saveOrderedProductsThank = createAsyncThunk(
    'saveOrderedProductsThank/orderedSlice',
    async (orderedData: IOrdered, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await orderedService.save(orderedData);
            console.log(data);

            dispatch(setUserStorage({ user: data.user }));
            dispatch(setOrderedProducts({ orderedProducts: data.products }));
            return { orderedPriceCount: data.orderedPriceCount };
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getOrderedProductsThank = createAsyncThunk(
    'getOrderedProductsThank/orderedSlice',
    async (id: number, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.getOrdered(id);

            dispatch(setUserStorage({ user: data.user }));
            dispatch(setOrderedProducts({ orderedProducts: data.products }));
            return { orderedPriceCount: data.orderedPriceCount };

        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const deleteOrderedByIdThank = createAsyncThunk(
    'updateOrderedByParamsThank/orderedSlice',
    async (data: {id: number, userId:number}, { rejectWithValue }) => {
        try {
            await orderedService.delete(data.id, data.userId);
        } catch (e: any){
            rejectWithValue(e);
        }
    }
);

const orderedSlice = createSlice({
    name: 'orderedSlice',
    initialState: initialState,
    reducers: {
        setOrderedProducts: (state, action) => {
            state.orderedProducts = action.payload.orderedProducts;
        },
        deleteOrderedProduct: (state, action) => {
            state.orderedProducts = state.orderedProducts.filter(item => item.id !== action.payload.id);
        },
        priceCount: (state, action) => {
            state.orderedPriceCount = state.orderedPriceCount + action.payload.price;
        } ,
    },
    extraReducers: builder => {
        builder.addCase(saveOrderedProductsThank.fulfilled, ((state, action) => {
            state.orderedPriceCount = action.payload?.orderedPriceCount;
        }));
        builder.addCase(saveOrderedProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
        builder.addCase(getOrderedProductsThank.fulfilled, ((state, action) => {
            state.orderedPriceCount = action.payload?.orderedPriceCount;
        }));
        builder.addCase(getOrderedProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
    }
});

export const {
    setOrderedProducts,
    deleteOrderedProduct,
    priceCount,
} = orderedSlice.actions;

const orderedReducer = orderedSlice.reducer;
export default orderedReducer;
