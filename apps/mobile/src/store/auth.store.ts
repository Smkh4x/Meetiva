import { create } from "zustand";

interface RegistrationStore {
    email: string,
    userName: string,
    age: number,
    password: string,
    user_interests: number[],
    

    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAge: (age: number) => void;
    setPassword: (password: string) => void;
    setUser_interests: (user_interests: number[]) => void;

}
const useRegistrationStore = create<RegistrationStore>((set) => ({
    email: "",
    userName: "",
    age: 0,
    password: "",
    user_interests: [],

    setEmail: (email) => {
        set({
            email: email
        });
    },

    setUserName: (userName) => {
        set({
            userName: userName
        })
    },

    setAge: (age) => {
        set({
            age: age
        })
    },

    setPassword: (password) => {
        set({
            password: password
        })
    },
    setUser_interests: (user_interests) => {
        set({
            user_interests: user_interests
        })
    }

}))

export default useRegistrationStore