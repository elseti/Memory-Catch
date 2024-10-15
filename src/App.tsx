import { createRoot } from "react-dom/client";
import GameComponent from "./Game";

const container = document.getElementById("root")!;
const root = createRoot(container);

// you can add more props for testing
root.render(
  <GameComponent
    onSuccess={() => alert("Game success")}
    onError={() => alert("Game error")}
    levelInfo={{
      level: 1,   // starting level (should be between 1 and 10 for now)
    }}
  />
);

