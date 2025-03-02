import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export default function ResaleLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
