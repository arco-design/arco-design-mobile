import { createContext } from "react";
import { LanguageSupport } from "../../../utils/language";

interface GlobalContextParams {
    language: LanguageSupport;
}

const defaultContext = {
    language: LanguageSupport.EN
};

export const GlobalContext = createContext<GlobalContextParams>(defaultContext);

