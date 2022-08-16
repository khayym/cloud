import { createContext } from "react";

const ContextApi = createContext({});

export const ContextApiProvider = ({ children }) => {
    const test = 'test context api';
    // const [screenAdapter, setScreenAdapter] = useState({
    //     media: false,
    //     home: false,
    //     favorite: false,
    //     cloud: false,
    // })

    return (
        <ContextApi.Provider value={test}>
            {children}
        </ContextApi.Provider>
    );
};