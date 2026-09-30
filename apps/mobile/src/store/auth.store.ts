import { create } from "zustand";

interface RegistrationStore {
    email: string,
    userName: string,
    age: number,
    interests: number[],

    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setAge: (age: number) => void;
    setInterests: (interests: number[]) => void;

}
const useRegistrationStore = create<RegistrationStore>((set) => ({
    email: "",
    userName: "",
    age: 0,
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

    setAge: (age) => {
        set({
            age: age
        })
    },

    setInterests: (interests) => {
        set({
            interests: interests
        })
    }

}))

export default useRegistrationStore