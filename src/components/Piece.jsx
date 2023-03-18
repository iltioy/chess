import React, { useRef, useEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import squaresmap from "../utils/squaresmap";
import piecemap from "../utils/piecemap";
import { validatePawn } from "../utils/validators";

const Piece = ({
    piece,
    color,
    position,
    playerColor,
    setPosition,
    myPosition,
    enemyPosition,
    setEnemyPosition,
}) => {
    const pieceRef = useRef();
    const [image] = useImage(piecemap[piece][color]);

    const [piecePosition, setPiecePosition] = useState(position);

    useEffect(() => {
        setPiecePosition(position);
    }, [position]);

    const handleDragEnd = (e) => {
        let elementX = e.target.attrs.x + 40;
        let elementY = e.target.attrs.y + 40;

        if (elementX > 640) {
            elementX = 580;
        }
        if (elementY > 640) {
            elementY = 580;
        }
        if (elementX < 0) {
            elementX = 40;
        }
        if (elementY < 0) {
            elementY = 40;
        }

        let xNewPos = elementX - (elementX % 80);
        let yNewPos = elementY - (elementY % 80);

        let valid = validateMove(xNewPos, yNewPos);
        if (!valid) {
            pieceRef.current.position({
                x: piecePosition.x,
                y: piecePosition.y,
            });
            return;
        }
        pieceRef.current.position({
            x: xNewPos,
            y: yNewPos,
        });
        pieceRef.current.zIndex(1);

        setPosition((prevState) => {
            const newState = prevState.map((el) => {
                if (el.x === piecePosition.x && el.y === piecePosition.y) {
                    return {
                        piece,
                        x: xNewPos,
                        y: yNewPos,
                    };
                }

                return el;
            });

            return [...newState];
        });

        setPiecePosition({
            x: xNewPos,
            y: yNewPos,
        });
    };

    const capture = (x, y) => {
        setEnemyPosition((prevState) => {
            let newState = prevState.filter((el) => el.x !== x || el.y !== y);

            return [...newState];
        });
    };

    const validateMove = (xNewPos, yNewPos) => {
        let { x: oldX, y: oldY } = piecePosition;
        if (piece === "pawn") {
            if (
                !validatePawn({
                    oldY,
                    oldX,
                    yNewPos,
                    xNewPos,
                    playerColor,
                    enemyPosition,
                    color,
                    capture,
                })
            ) {
                return false;
            }
        }

        if (
            myPosition.some((item) => item.x === xNewPos && item.y === yNewPos)
        ) {
            return false;
        }

        return true;
    };

    const move = (pos) => {
        let x = squaresmap[pos[0]];
        let y = squaresmap[pos[1]];

        pieceRef.current.position({
            x,
            y,
        });
    };

    return (
        <Image
            ref={pieceRef}
            onDragEnd={(e) => handleDragEnd(e)}
            y={position.y}
            x={position.x}
            image={image}
            height={80}
            width={80}
            draggable
            onDragStart={() => pieceRef.current.zIndex(32)}
        />
    );
};

export default Piece;
