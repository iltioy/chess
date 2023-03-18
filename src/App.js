import { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { drawBoard, drawStartingPosition } from "./utils/drawBoard";
import {
    whitePositionStarting,
    blackPositionStarting,
} from "./utils/startingPosition";

let board = [];

board = drawBoard();

function App() {
    const [whitePosition, setWhitePosition] = useState(whitePositionStarting);
    const [blackPosition, setBlackPosition] = useState(blackPositionStarting);
    const [pieces, setPieces] = useState([]);

    const layerRef = useRef();

    const playerColor = 0;

    useEffect(() => {
        setPieces(
            drawStartingPosition({
                whitePosition,
                blackPosition,
                playerColor,
                setWhitePosition,
                setBlackPosition,
            })
        );
    }, [whitePosition, blackPosition]);

    return (
        <Stage width={640} height={640}>
            <Layer>{board}</Layer>
            <Layer ref={layerRef}>{pieces}</Layer>
        </Stage>
    );
}

export default App;
