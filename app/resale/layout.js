import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Resale Properties",
  description: "Find the best resale properties in your area",
};

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
