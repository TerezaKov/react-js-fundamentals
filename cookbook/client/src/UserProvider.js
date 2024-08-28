import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(true);

    const toggleAuthorization = () => {
        setIsAuthorized((prev) => !prev);
        console.log(isAuthorized);
    };

    return (
        <UserContext.Provider value={{ isAuthorized, toggleAuthorization }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;