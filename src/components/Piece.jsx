import React, { useRef } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import squaresmap from "../utils/squaresmap";
import piecemap from "../utils/piecemap";

const Piece = ({ piece, color, position }) => {
    const pieceRef = useRef();
    const [image] = useImage(piecemap[piece][color]);

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
        pieceRef.current.position({
            x: elementX - (elementX % 80),
            y: elementY - (elementY % 80),
        });
        console.log(pieceRef.current.zIndex());
        pieceRef.current.zIndex(1);
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
            onDragStart={() => pieceRef.current.zIndex(16)}
        />
    );
};

export default Piece;
