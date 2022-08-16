import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    clientId: "",
    serverId: "",
    serverHashId: "",
    qrCode: "",
    deviceKey: undefined,
    pin: "",
    logOutInfo: "",
    encryptionType: undefined,
    privateKey: undefined,
}

export const navigatorSlice = createSlice({
    name: 'navigatorSlice',
    initialState,
    reducers: {
        setQRCode: (state, action) => {
            state.qrCode = action.payload
        },
        setKeys: (state, action) => {
            state.clientId = action.payload.clientId
            state.serverId = action.payload.serverId
        },
        setDevicePin: (state, action) => {
            state.pin = action.payload;
        },
        setEncryptionType: (state, action) => {
            state.encryptionType = action.payload;
        },
        setPrivateKey: (state, action) => {
            state.privateKey = action.payload;
        },
        setDeviceKeys: (state, action) => {
            state.deviceKey = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setLogOut: (state) => {
            state.loggedIn = false
            state.clientId = ""
            state.serverId = ""
            state.serverHashId = ""
            state.qrCode = ""
            state.deviceKey = undefined
            state.pin = ""
            state.logOutInfo = ""
            state.encryptionType = undefined
            state.privateKey = undefined
        },
    },
})

// Action creators are generated for each case reducer function
export const { setQRCode, setKeys, setDevicePin, setPrivateKey, setEncryptionType, generateKeyRSA, setLogOut, setDeviceKeys, setLoggedIn } = navigatorSlice.actions

export default navigatorSlice.reducer