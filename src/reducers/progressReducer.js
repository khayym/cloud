import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uploadedFilesList: [],
    sum: 0,
    maxValue: 0,
    maxSize: 0
};

export const progressSlice = createSlice({
    name: 'progressSlice',
    initialState,
    reducers: {
        setUploadProgress: (state, action) => {
            state.uploadedFilesList = [...state.uploadedFilesList, { ...action.payload }];
        },
        uploading: (state, action) => {
            state.uploadedFilesList.map(x => {
                if (x.filename === x.payload.filename) {
                    x.size = action.payload.size;
                    x.status = Math.round((action.payload.size / x.maxValue) * 100);
                }
            })

            return {
                ...state,
                sum: state.uploadedFilesList.reduce((accumulator, object) => {
                    return accumulator + object.status;
                }, 0) / state.uploadedFilesList.length,

                maxValue: state.uploadedFilesList.reduce((accumulator, object) => {
                    return accumulator + object.maxValue;
                }, 0),

                allSize: state.uploadedFilesList.reduce((accumulator, object) => {
                    return accumulator + object.size;
                }, 0),
            }
        },
        cleanUpload: (state, action) => {
            const clearedFiles = state.uploadedFilesList.filter(x => x.filename !== action.payload);
            state.uploadedFilesList = clearedFiles;
        }
    }
});

export const { setUploadProgress, uploading, cleanUpload } = progressSlice.actions;
export default progressSlice.reducer;