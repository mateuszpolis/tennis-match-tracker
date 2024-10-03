import React from "react";
import CookieConsent from "react-cookie-consent";

function Cookies() {
  return (
    <div>
      {" "}
      <CookieConsent
        location="bottom"
        buttonText="Akceptuję"
        cookieName="zgoda_na_cookies"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          background: "#4CAF50",
          color: "#ffffff",
          fontSize: "13px",
          padding: "10px 20px",
          borderRadius: "4px",
        }}
        expires={365}
      >
        Używamy plików cookie, aby zapewnić poprawne działanie strony, w tym w
        celu zarządzania sesją logowania oraz zapisania Twojej zgody na
        korzystanie z plików cookie. Kontynuując korzystanie z naszej strony,
        zgadzasz się na nasze wykorzystanie plików cookie. Więcej informacji
        znajdziesz w naszej{" "}
        <a href="/regulamin" className="underline">
          Polityce Prywatności
        </a>
        .
      </CookieConsent>
    </div>
  );
}

export default Cookies;
