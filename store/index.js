import { configureStore } from '@reduxjs/toolkit'
import navigatorSlice from '../src/reducers/navigatorReducer'
import progressSlice from '../src/reducers/progressReducer'

export const store = configureStore({
    reducer: {
        navigator: navigatorSlice,
        progress: progressSlice,
    },
})