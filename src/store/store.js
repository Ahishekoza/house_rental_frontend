import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice.js'
import queryReducer from '../slice/querySlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        filter_queries:queryReducer
    }
})

export {store}