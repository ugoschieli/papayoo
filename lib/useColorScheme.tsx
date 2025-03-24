import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  const { colorScheme } = useNativewindColorScheme();
  return {
    colorScheme,
    isDarkColorScheme: colorScheme === "dark",
  };
}
