
interface NavbarProps{
    text?: string;
    onBack?: () => void;
}

export default function Navbar(props: NavbarProps){
    return(
        <div className="flex flex-row w-full bg-blue-600 justify-between text-center text-white text-2xl md:text-5xl font-semibold tracking-wider p-3 md:p-6">
            <img src="back.png" className="w-5 h-7 md:w-10 md:h-12"/>
            <p>{props.text}</p>
            <div/>
        </div>
    );
}