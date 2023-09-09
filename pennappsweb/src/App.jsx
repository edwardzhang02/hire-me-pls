import { useState } from "react";
import "./App.css";

function App() {
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const linkedinUrl = "/api/linkedin-email-finder";
  const backendURL =
    import.meta.env.VITE_ENV === "dev" ? "http://localhost:8000" : "TODO";
  const apiKey = import.meta.env.VITE_PROSPEO_API;

  const requiredHeaders = {
    "Content-Type": "application/json",
    "X-KEY": apiKey,
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    const userRes = await fetch(linkedinUrl, {
      method: "POST",
      headers: requiredHeaders,
      body: JSON.stringify({ url: linkedin, profile_only: true }),
    });
    const userData = await userRes.json();
    const coverLetterRes = await fetch(`${backendURL}/generate`, {
      method: "POST",
      headers: requiredHeaders,
      body: JSON.stringify({
        user_context: JSON.stringify(userData),
        company_name: company,
      }),
    });
    const coverLetterData = await coverLetterRes.json();
    console.log(coverLetterData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={(e) => submitFunc(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Generate a custom cover letter in seconds!
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter your LinkedIn profile URL and the name of the company you
              are applying to below
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="linkedin-url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  LinkedIn URL
                </label>
                <div className="mt-2">
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    type="text"
                    name="linkedin-url"
                    id="linkedin-url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Company Name
                </label>
                <div className="mt-2">
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    type="text"
                    name="company-name"
                    id="company-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Start
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
