import {ReactNode, createContext, useState} from 'react'
export type ThemeContextType= {
    currentTheme: string
    toggleTheme: (newTheme: string) => void
}
export const ThemeContext = createContext <ThemeContextType>({
    currentTheme:'light',
    toggleTheme:()=>{}

});

const ThemeProvider=({children}: {children: ReactNode})=>{
    const [Theme,setTheme]= useState <string>('light')

    const toggleTheme = (newTheme : string) => {
        setTheme(newTheme)
    }
    return(
        <ThemeContext.Provider value={{currentTheme: Theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;

