const validatePawn = ({
    oldY,
    oldX,
    yNewPos,
    xNewPos,
    playerColor,
    enemyPosition,
    color,
    capture,
}) => {
    if (
        oldY - yNewPos !== 80 &&
        color === playerColor &&
        !(oldY - yNewPos === 160 && oldY === 480)
    ) {
        return false;
    } else {
        if (
            enemyPosition.some(
                (item) => item.x === xNewPos && item.y === yNewPos
            ) &&
            oldX === xNewPos
        ) {
            return false;
        }
    }

    if (
        oldY - yNewPos !== -80 &&
        color !== playerColor &&
        !(oldY - yNewPos === -160 && oldY === 80)
    ) {
        return false;
    } else {
        if (
            enemyPosition.some(
                (item) => item.x === xNewPos && item.y === yNewPos
            ) &&
            oldX === xNewPos
        ) {
            return false;
        }
    }

    if (oldX !== xNewPos) {
        if (oldX + 80 !== xNewPos && oldX - 80 !== xNewPos) {
            return false;
        } else {
            if (
                !enemyPosition.some(
                    (item) => item.x === xNewPos && item.y === yNewPos
                )
            ) {
                return false;
            } else {
                capture(xNewPos, yNewPos);
            }
        }
    }

    return true;
};

export { validatePawn };
