import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";

interface ColorScheme {
  name: string;
  backgroundColor: string;
  textColor: string;
}

interface ThemeContextType {
  currentScheme: ColorScheme;
  changeThemeColor: (name: string) => void;
  colorSchemes: ColorScheme[];
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorSchemes: ColorScheme[] = [
  { name: "Light", backgroundColor: "#FFFFFF", textColor: "#000000" },
  { name: "Sepia", backgroundColor: "#F5EFE2", textColor: "#3E2723" },
  { name: "Mint", backgroundColor: "#D0E9E1", textColor: "#004D40" },
  { name: "Dark", backgroundColor: "#1A1A1A", textColor: "#FFFFFF" },
  { name: "Gray", backgroundColor: "#6B726A", textColor: "#F0F0F0" },
];

const ChapterThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(
    colorSchemes[2]
  );

  const changeThemeColor = useCallback((color: string) => {
    const scheme = colorSchemes.find(
      (scheme) => scheme.backgroundColor === color
    );
    if (scheme) {
      setCurrentScheme(scheme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ currentScheme, changeThemeColor, colorSchemes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useChapterTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ChapterThemeProvider, useChapterTheme };
