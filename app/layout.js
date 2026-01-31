import "../styles/index.scss";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
 
export const metadata = {
  title: "IMT Hyderabad", 
}; 
   

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
