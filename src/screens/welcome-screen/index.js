import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setEncryptionType, setKeys, setPrivateKey } from '../../reducers/navigatorReducer'
import { hash256 } from '../../utils/encryption-utils'
import { base64ToBuffer, bufferToHex, decodeBase64Url } from '../../utils/proxy-cryptography-utils'

const WelcomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [readyState, setReadyState] = useState(false);
    const navigator = useSelector(state => state.navigator)


    const authCheck = async () => {
        // const p = performance.now();
        setReadyState(false);
        const [clientId, serverId, encryptionType] = await AsyncStorage.multiGet(["clientId", "serverId", "encryptionType"]);

        if (clientId[1] && serverId[1]) {
            dispatch(setKeys({ clientId: clientId[1], serverId: serverId[1] }))
            dispatch(setEncryptionType(encryptionType[1]));
        } else {
            crypto.subtle.generateKey({
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: { name: "SHA-256" },
            }, true, ["encrypt", "decrypt"])
                .then(function (key) {
                    setPrivateKey(key.privateKey);

                    crypto.subtle.exportKey("jwk", key.publicKey).then(function (publicKeyJwk) {
                        let publicKeyB64 = decodeBase64Url(publicKeyJwk.n);
                        let keyBin = base64ToBuffer(publicKeyB64);

                        hash256(keyBin).then((digestHex) => {
                            let clientId = bufferToHex(digestHex.slice(0, 8));
                            setKeys({ clientId, serverId: publicKeyB64 });
                            AsyncStorage.multiSet([
                                ["clientId", clientId],
                                ["serverId", publicKeyB64],
                            ]);
                        })
                    })
                })
        }
        setReadyState(true);
        // console.log(performance.now() - p)
        // // return
    };

    useEffect(() => {
        authCheck();
    }, [])

    return (
        <View style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>WelcomeScreen :{navigator.clientId}</Text>
        </View>
    )
}

export default WelcomeScreen