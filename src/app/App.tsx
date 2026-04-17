import { LangProvider } from "./components/language-context";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Set page title
    document.title = "Mandarin Tour Namangan";
    
    // Set favicon
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
    if (!link.parentNode) {
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/src/imports/image-13.png";
  }, []);

  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  );
}

export default App;