// this is a manual/ starting page for a game

import Navbar from "./Navbar";

interface GamePageProps{
    title: string;
    imagePath: string;
    description: string;
    targetDomains: string;
    onStart: () => void; // function to run when start button is played
    onDemo?: () => void; // function to run when demo button is played
}

export default function GamePage(props: GamePageProps){

    const onBack = () => {
        // TODO - back button implement
    }

    return(
        <div className="bg-[url('/mc_desktop_bg.png')] bg-cover bg-no-repeat flex flex-col w-full min-h-screen overflow-hidden gap-6 lg:gap-12">
            <Navbar text={props.title} onBack={onBack}/>
            <div className="mx-8 justify-center text-center flex flex-col items-center">
                <img src={props.imagePath} className="rounded-lg shadow-lg"/>
                {props.onDemo &&
                    <button className="bg-blue-600 py-4 text-white rounded-xl text-2xl tracking-wider shadow-lg"
                    onClick={props.onStart}
                    >
                        Start!
                    </button>
                }
                
                <h1 className="font-bold text-2xl md:text-3xl mt-8 md:mt-16">Instructions</h1>
                <p className="mx-6 md:mx-16 text-lg md:text-2xl">{props.description}</p>

                <h1 className="font-bold text-2xl md:text-3xl mt-8 md:mt-16">Target Domains</h1>
                <p className="mx-6 md:mx-16 text-lg md:text-2xl">{props.targetDomains}</p>
                
                {props.onDemo && 
                    <button className="w-full mt-6 md:mt-16 md:text-3xl animate-pulse bg-slate-400 hover:bg-slate-200 p-4 text-white rounded-xl text-2xl tracking-wider shadow-lg md:w-1/2" onClick={props.onStart} >
                        Play Demo
                    </button>
                }
                
                <button className="w-full my-6 md:my-16 md:text-3xl animate-pulse bg-blue-600 hover:bg-blue-400 p-4 text-white rounded-xl text-2xl tracking-wider shadow-lg md:w-1/2" onClick={props.onStart} >
                    Start!
                </button>
            </div>
            
        </div>
        
        
    );
}