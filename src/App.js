import { Stage, Layer, Image } from "react-konva";
import { drawBoard, drawStartingPosition } from "./utils/drawBoard";
import { useRef } from "react";
import useImage from "use-image";

let board = [];
let pieces = [];

board = drawBoard();
pieces = drawStartingPosition();

function App() {
    const pieceRef = useRef();
    const [image] = useImage(
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png"
    );
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
    };
    return (
        <Stage width={640} height={640}>
            <Layer>{board}</Layer>
            <Layer width={640} height={640}>
                <Image
                    ref={pieceRef}
                    onDragEnd={(e) => handleDragEnd(e)}
                    y={0}
                    x={0}
                    image={image}
                    height={80}
                    width={80}
                    draggable
                />
                {pieces}
            </Layer>
        </Stage>
    );
}

export default App;
