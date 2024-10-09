interface FishSilhouetteProps {
    imageName: string; // path to image of fish silhouette
    leftPosition: number; // left position in pixels of the fish
    topPosition: number; // top position in pixels of the fish
    scale: number; // scale (0.3 - 1) of the fish
    onClick: () => void; // function to run when the fish is clicked
}

export default function FishSilhouette( props: FishSilhouetteProps ) {

    const onClick = () => {
        props.onClick();
    };


    return (
        <button>
            <img src={props.imageName}  
                onClick={onClick}
                className="absolute"
                // className="absolute circle-image"
                // className="fish absolute"
                style={{
                    left: `${props.leftPosition}px`,
                    top:  `${props.topPosition}px`,
                    transform: `scale(${props.scale})`
                }}
            />
        </button>
    );
}
