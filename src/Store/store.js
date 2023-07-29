import {create} from 'zustand'
import {devtools, persist , createJSONStorage} from 'zustand/middleware'

let store = (set) =>({
    cUser:{},
    addCredentials:(person) =>
    set((state) => ({cUser:person})),
    logout:(s)=>
    set((state)=>({cUser:{}}))
})

store = devtools(store)
store = persist(store, {name: 'user', storage: createJSONStorage(() => localStorage)})

const useStore = create(store)

export default useStore;
