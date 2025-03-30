import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "./langs/translations";
import {
  SupportedLangs,
  TranslationContextProps,
  TranslationKey,
  TranslationMap,
} from "./types";

const loadLang = (lang: SupportedLangs): TranslationMap => {
  return translations[lang] || translations.en;
};

export const TranslationContext = createContext<TranslationContextProps>({
  t: (key) => key,
  lang: "en",
  setLang: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<SupportedLangs>(
    (localStorage.getItem("lang") as SupportedLangs) || "en"
  );

  const [translationMap, setTranslationMap] = useState<TranslationMap>(
    loadLang(currentLang)
  );

  // Persist Language Change
  useEffect(() => {
    localStorage.setItem("lang", currentLang);
    setTranslationMap(loadLang(currentLang));
  }, [currentLang]);

  const t = useCallback(
    (key: TranslationKey, args: any) => {
      let translate = translationMap?.[key] || key;
      if (args) {
        const variables = translate.matchAll(/{(\w+)}/gm);
        for (let word of variables) {
          translate = translate.replace(word[0], args[word[1]] || "");
        }
      }
      return translate;
    },
    [translationMap]
  );

  return (
    <TranslationContext.Provider
      value={{
        lang: currentLang,
        setLang: setCurrentLang,
        t,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
