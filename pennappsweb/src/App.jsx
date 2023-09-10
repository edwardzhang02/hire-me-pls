import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import Spinner from "./components/Spinner";
import Hero from "./components/Hero";
import InputForm from "./components/InputForm";
import Response from "./components/Response";
import Logos from "./components/Logos";

function App() {
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [clickedGenerate, setClickedGenerate] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const backendURL =
    import.meta.env.VITE_ENV === "dev"
      ? "http://localhost:8000"
      : "https://hmp-api-w4e4bniyjq-ue.a.run.app";

  const submitFunc = async (e) => {
    e.preventDefault();
    setClickedGenerate(true);
    setLoading(false);
    const coverLetterRes = await fetch(`${backendURL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: company,
        linkedin_profile_url: linkedin,
      }),
    });
    const coverLetterData = await coverLetterRes.json();
    setLoading(true);
    console.log(coverLetterData);
    setResponseMessage(coverLetterData);
  };

  useEffect(() => {
    let timer;

    if (clipboardStatus) {
      timer = setTimeout(() => {
        setClipboardStatus(false);
      }, 3500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [clipboardStatus]);
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white">
          <Hero />
          <InputForm
            linkedin={linkedin}
            setLinkedin={setLinkedin}
            company={company}
            setCompany={setCompany}
            submitFunc={submitFunc}
            loading={loading}
          />
          <Response
            clickedGenerate={clickedGenerate}
            responseMessage={responseMessage}
            loading={loading}
            clipboardStatus={clipboardStatus}
            setClipboardStatus={setClipboardStatus}
          />
          <Logos />
          <Faq />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
