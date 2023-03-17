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

const drawStartingPosition = () => {
    let pieces = [];
    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 8);

        let piece;

        if (row === 1) {
            piece = "pawn";
        } else if (i === 0 || i === 7) {
            piece = "rook";
        } else if (i === 1 || i === 6) {
            piece = "knight";
        } else if (i === 2 || i === 5) {
            piece = "bishop";
        } else if (i === 3) {
            piece = "queen";
        } else {
            piece = "king";
        }

        pieces.push(
            <Piece
                piece={piece}
                position={{ x: (i * 80) % 640, y: 560 - row * 80 }}
                color={0}
            />
        );
    }
    for (let j = 0; j < 16; j++) {
        let row = Math.floor(j / 8);
        let piece;
        if (row === 1) {
            piece = "pawn";
        } else if (j === 0 || j === 7) {
            piece = "rook";
        } else if (j === 1 || j === 6) {
            piece = "knight";
        } else if (j === 2 || j === 5) {
            piece = "bishop";
        } else if (j === 3) {
            piece = "queen";
        } else {
            piece = "king";
        }

        pieces.push(
            <Piece
                piece={piece}
                position={{ x: (j * 80) % 640, y: row * 80 }}
                color={1}
            />
        );
    }

    return pieces;
};

export { drawBoard, drawStartingPosition };
