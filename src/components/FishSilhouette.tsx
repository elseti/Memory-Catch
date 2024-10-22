import { getRandomAnimationStyles } from "./game-logic";

interface FishSilhouetteProps {
    imageName: string;          // path to image of fish silhouette
    leftPosition: number;       // left position in pixels of the fish
    topPosition: number;        // top position in pixels of the fish
    onClick: () => void;        // function to run when the fish is clicked
}

export default function FishSilhouette( props: FishSilhouetteProps ) {

    const onClick = () => {
        props.onClick();
    };

    const animationStyles = getRandomAnimationStyles(props.leftPosition, props.topPosition);
    return (
        <button>
            <img src={props.imageName}  
                onClick={onClick}
                className="absolute"
                style={{
                    ...animationStyles,
                    left: `${props.leftPosition}px`,
                    top:  `${props.topPosition}px`
                }}
            />
        </button>
    );
}
