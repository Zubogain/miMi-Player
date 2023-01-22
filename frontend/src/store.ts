import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import reducer from './reducers/index'

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>
export interface IRootState extends ReturnType<typeof store.getState> { }

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;