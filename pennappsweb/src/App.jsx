import { useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL =
    import.meta.env.VITE_ENV === "dev"
      ? "http://localhost:8000"
      : "https://hmp-api-w4e4bniyjq-ue.a.run.app";

  const submitFunc = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
    console.log(coverLetterData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        <Spinner className="mx-auto my-auto" />
      ) : (
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
                <div className="sm:col-span-4">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    LinkedIn Profile URL
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        autoComplete="linkedin"
                        className="block flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="https://www.linkedin.com/in/RichardHendricks"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Pied Piper"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
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
      )}
    </div>
  );
}

export default App;
