
import { createGlobalState } from 'react-hooks-global-state';
import { Type } from 'typescript';

export type TypeUser = {
    USERID: string;
    email: string;
    gender: string;
    description: string;
    fullname: string;
    status: string;
    profilepicture: string;
    permission: string;


}

type typeCategories = {
    text: string,
    id: string
}
type TypeInitState = {
    token?: string;
    currentUser: TypeUser | null;
    categories: typeCategories[]
}

const initialState: TypeInitState = {
    token: "",
    categories: [],
    currentUser: null
};
const { useGlobalState } = createGlobalState(initialState);


export {
    useGlobalState
}