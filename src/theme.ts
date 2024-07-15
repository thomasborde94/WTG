import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark'
}

const theme = extendTheme({
    config,
    colors: {
        gray: {
            50: '#e9edff',
            100: '#c3c8f1',
            200: '#9ca3e3',
            300: '#757fd6',
            400: '#4f5aca',
            500: '#3541b0',
            600: '#29328a',
            700: '#1c2463',
            800: '#10163d',
            900: '#05061a'
        }
    }
})

export default theme