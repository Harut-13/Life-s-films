import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { filmsObjectType } from "./filmsSlice";

export type GenresType = {
    id: number,
    name: string
}

type GenresStateType = {
    genres: Array<GenresType>,
    genresData: Array<filmsObjectType>
}

export const fetchGenresData =createAsyncThunk(
    'fetchGenresData',
    async (id : number | string)=>{
       const response = await FilmsAPI.getGenresFilms(id)

       return response.data.results
    }
)

export const fetchGenres = createAsyncThunk<Array<GenresType>, string>(
    'fetchGenres',
    async (lg) => {
        const response = await FilmsAPI.getGenres(lg);

        return response.data.genres

    }
)
const initialState: GenresStateType = {
    genres: [],
    genresData : []
}
const genresSlice = createSlice({
    name: "genresSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Array<GenresType>>) => {
            state.genres = action.payload
        }),
        builder.addCase(fetchGenresData.fulfilled, (state, action)=>{
           state.genresData=action.payload
        })
    }
})

export default genresSlice.reducer