import React from "react";

import {Button} from "@mui/material";


const styles = {
    cell: {
        border: "0.5px solid black",
        borderRadius: "1px",
        margin: "0.5px",
        fontSize: "100%",
        maxWidth: "20px",
        minWidth: "20px",
        maxHeight: "20px",
        minHeight: "20px"
    },
    "□": {
        backgroundColor: "gray"
    },
    "0": {
        backgroundColor: "white"
    },
    "1": {
        color: "blue"
    },
    "2": {
        color: "green"
    },
    "3": {
        color: "red"
    }
};

export const GameCell = ({value, onClick}: {value: string, onClick: any}) => {
    return (
        <Button sx={{...styles.cell, ...styles[value as keyof typeof styles]}} onClick={onClick}>
            {value === "□" || value === "0" ? " " : value}
        </Button>
    )
}