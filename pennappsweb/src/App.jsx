import { useState } from "react";
import "./App.css";

function App() {
  const [linkedin, setLinkedin] = useState("");
  const url = "/api/linkedin-email-finder";
  const apiKey = import.meta.env.VITE_PROSPEO_API;

  const requiredHeaders = {
    "Content-Type": "application/json",
    "X-KEY": apiKey,
  };

  // const data = {
  //   url: "https://www.linkedin.com/in/lucas-zhu-239b13144/",
  // };

  const submitLinkedin = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: requiredHeaders,
      body: JSON.stringify({ url: linkedin }),
    })
      .then((response) => response.json())
      .then(console.log);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={(e) => submitLinkedin(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              LinkedIn Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter your LinkedIn profile URL to get started!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  LinkedIn URL
                </label>
                <div className="mt-2">
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
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
