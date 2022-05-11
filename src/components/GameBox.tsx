import {Box, Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {GameCell} from "./GameCell";
import {useActions} from "../store/actions";

const styles: any = {
    gameBox: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        alignItems: "center",
        marginTop: "20px"
    },
    gameLine: {
        display: "flex",
        flexDirection: "row"
    },
    mainBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px"
    },
    text: {
        fontSize: "40px"
    }
}

export const GameBox = () => {
    const gameMap = useSelector((state: any) => state.map);
    const mapSize = useSelector((state: any) => state.size);
    const alive = useSelector((state: any) => state.alive)
    const {openCell, newGame, setSize}: any = useActions();
    return (
        <Box sx={styles.mainBox}>
            <Typography sx={styles.text}>
                {alive ? `MineSweeper` : `You lose!`}
            </Typography>
            <>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Size
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mapSize}
                        label="Map Size"
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem >
                        <MenuItem value={2}>2</MenuItem >
                        <MenuItem value={3}>3</MenuItem >
                    </Select>
                </FormControl>
                <Button onClick={() => newGame(mapSize)}>New Game</Button>
            </>
            <Box sx={styles.gameBox}>
                {gameMap.map((line: string[], index: number) => (
                    <Box sx={styles.gameLine} key={(index + 1)}>
                        {line.map((cell: string, secondIndex: number) => (
                            <GameCell key={secondIndex * (index + 1)} value={cell} onClick={() => {
                                if (alive && cell === "□") {
                                    console.log(`calling openCell`)
                                    openCell(secondIndex, index);
                                }
                            }}/>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>

    )
}