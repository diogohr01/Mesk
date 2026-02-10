/**
 * Tema e identidade visual (RNF-001).
 * Ajustar primary/secondary conforme identidade MOR quando definida.
 */
export const colors = {
  primary: "#243b5e",
  primaryLight: "rgba(255,255,255,0.14)", // mesmo tom que primary, mais claro (hue ~217°)
  primaryDark: "#1a2d47",
  secondary: "#52c41a",
  accent: "#722ed1",
  background: "#fafafa",
  backgroundGray: "#f0f0f0",
  borderColor: "#e0e0e0",
  white: "#FFFFFF",
  black: "#000",

  // Layout (Sider + Header) – paleta refinada (navy + header harmonizado)
  layout: {
    siderBg: "#243b5e",
    siderBorder: "#FFFFFF",
    siderText: "rgba(255,255,255,0.92)",
    siderTextMuted: "rgba(255,255,255,0.55)",
    headerBg: "#243b5e",
    headerBorder: "rgba(0,0,0,0.12)",
    headerText: "#ffffff",
    // Header search input (campo de pesquisa no header)
   
  },

  // Cores de texto
  text: {
    primary: "#262626",
    secondary: "#8c8c8c",
    disabled: "#bfbfbf"
  },
  
  // Paleta neutra para charts
  chart: {
    primary: "#595959",      // Cinza escuro
    secondary: "#8c8c8c",    // Cinza médio
    accent: "#262626",       // Cinza muito escuro
    warning: "#d9d9d9",      // Cinza claro
    danger: "#434343",       // Cinza escuro
    info: "#bfbfbf",         // Cinza claro
    success: "#8c8c8c",      // Cinza médio
    purple: "#595959",       // Cinza escuro
    orange: "#737373",       // Cinza médio
    pink: "#8c8c8c",         // Cinza médio
    indigo: "#434343",       // Cinza escuro
    teal: "#bfbfbf",         // Cinza claro
    lime: "#8c8c8c",         // Cinza médio
    gold: "#d9d9d9",         // Cinza claro
    red: "#434343",          // Cinza escuro
    blue: "#595959",         // Cinza escuro
    green: "#8c8c8c",        // Cinza médio
  }
};