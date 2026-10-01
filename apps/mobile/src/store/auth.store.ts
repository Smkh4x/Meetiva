import { create } from "zustand";

interface RegistrationStore {
    email: string,
    userName: string,
    age: number,
    password: string,
    interests: number[],

    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAge: (age: number) => void;
    setPassword: (password: string) => void;
    setInterests: (interests: number[]) => void;

}
const useRegistrationStore = create<RegistrationStore>((set) => ({
    email: "",
    userName: "",
    age: 0,
    password: "",
    interests: [],

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

    setAge: (age: number) => {
        set({
            age: age
        })
    },

    setPassword: (password: string) => {
        set({
            password: password
        })
    },
    setInterests: (interests) => {
        set({
            interests: interests
        })
    }

}))

export default useRegistrationStore