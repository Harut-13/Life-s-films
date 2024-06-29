import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilmsAPI } from "../../api/api";
import { AxiosResponse } from "axios";

export type filmsObjectType = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: string,
    vote_average: number,
    vote_count: number
}

type filmsStateType = {
    films: Array<filmsObjectType>
    pageCount: number,
    film: filmsObjectType | null,
    searchFilm: string,
    searchFilms: Array<filmsObjectType>
}
export const fetchSearch = createAsyncThunk<Array<filmsObjectType>, string>(
    'fetchSearch',
    async (text : string) => {
        const response : AxiosResponse =await FilmsAPI.getSearch(text);

        return response.data.results
    }
)


export const fetcFilms = createAsyncThunk<Array<filmsObjectType>, number>(
    'fetcFilms',
    async (pageCount) => {
        const response: AxiosResponse = await FilmsAPI.getMoviesPages(pageCount)
        initialState.pageCount
        return response.data.results
    }
)

export const fetcFilm = createAsyncThunk<filmsObjectType, string | undefined>(
    'fetcFilm',
    async (id) => {
        const response: AxiosResponse<filmsObjectType> = await FilmsAPI.getOneMovie(id)

        return response.data
    }
)

export const fetchTrailer = createAsyncThunk<void, any>(
    'fetchTrailer',
    async ({ myId , iframe }: any) => {
        const res: AxiosResponse<any> = await FilmsAPI.getTrailer(myId)
        console.log(res);
        
        res.data.results.forEach((elm: any) => {
            if (elm.name === "Official Trailer") {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            } else {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            }
        })

    }
)

const initialState: filmsStateType = {
    films: [],
    pageCount: 1,
    film: null,
    searchFilm: '',
    searchFilms: []
}

const filmsSlice = createSlice({
    name: 'filmsSlice',
    initialState,
    reducers: {
        changePage(state) {
            state.pageCount = state.pageCount + 1
        },
        changeText(state, action) {
            state.searchFilm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetcFilms.fulfilled, (state, action: PayloadAction<Array<filmsObjectType>>): filmsStateType => {
            state.films = action.payload
            return state
        }),
            builder.addCase(fetcFilm.fulfilled, (state, action) => {
                state.film = action.payload
            }),
            builder.addCase(fetchSearch.fulfilled, (state, action)=>{
                state.searchFilms =action.payload
            })
    }
})

export const { changePage, changeText } = filmsSlice.actions
export default filmsSlice.reducer