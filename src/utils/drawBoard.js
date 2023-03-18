import { Rect } from "react-konva";
import Piece from "../components/Piece";

const drawBoard = () => {
    let board = [];
    for (let i = 0; i < 64; i++) {
        let row = Math.floor(i / 8);
        let starter, ender;
        if (row % 2 === 0) {
            starter = "#F0D9B5";
            ender = "#B58863";
        } else {
            starter = "#B58863";
            ender = "#F0D9B5";
        }
        board.push(
            <Rect
                height={80}
                width={80}
                fill={i % 2 === 0 ? starter : ender}
                x={80 * (i % 8)}
                y={80 * row}
                key={i}
            />
        );
    }

    return board;
};

const drawStartingPosition = ({
    playerColor,
    setWhitePosition,
    setBlackPosition,
    whitePosition,
    blackPosition,
}) => {
    let pieces = [];
    for (let i = 0; i < whitePosition.length; i++) {
        pieces.push(
            <Piece
                piece={whitePosition[i].piece}
                position={{ x: whitePosition[i].x, y: whitePosition[i].y }}
                color={0}
                playerColor={playerColor}
                setPosition={setWhitePosition}
                setEnemyPosition={setBlackPosition}
                myPosition={whitePosition}
                enemyPosition={blackPosition}
            />
        );
    }
    for (let j = 0; j < blackPosition.length; j++) {
        pieces.push(
            <Piece
                piece={blackPosition[j].piece}
                position={{ x: blackPosition[j].x, y: blackPosition[j].y }}
                color={1}
                playerColor={playerColor}
                setPosition={setBlackPosition}
                setEnemyPosition={setWhitePosition}
                myPosition={blackPosition}
                enemyPosition={whitePosition}
            />
        );
    }

    return pieces;
};

export { drawBoard, drawStartingPosition };
