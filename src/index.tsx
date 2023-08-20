import { createRoot } from "react-dom/client";
import App from "./components/app";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App initialData={(window as any).initialData} />);

// can do check server connection if you want to render with the serve api connected
