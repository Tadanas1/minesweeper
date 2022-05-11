import React from "react";
import {GameBox} from "./GameBox";
import {useSelector} from "react-redux";
import {ErrorMessage} from "./Error";

export const Main = () => {
    const connection = useSelector((state: any) => state.wsConnection);
    return (
        connection ?
            <GameBox/> :
            <ErrorMessage/>
    )
}