import { useState } from "react";
import "./App.css";
import imgUrl from "../public/hire-me-pls.png";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import Spinner from "./components/Spinner";

function App() {
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [clickedGenerate, setClickedGenerate] = useState(false);
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

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-16 w-auto" src={imgUrl} alt="" />
                </a>
              </div>
            </nav>
          </header>

          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Generate a custom cover letter in seconds!
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Enter your LinkedIn profile URL and the name of the company
                  you are applying to below
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#submit"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a
                    href="#learn-more"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <form
            onSubmit={(e) => submitFunc(e)}
            id="submit"
            className="border border-gray-200 bg-gray-100 p-4 rounded-lg mx-auto max-w-7xl px-6 lg:mx-8 mt-32"
          >
            <div className="space-y-12">
              <div className="border-gray-900/10 pb-12 mt-4">
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  LinkedIn Profile URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 "
                    placeholder="https://linkedin.com/in/Richard-Hendricks"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>

                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                >
                  Company
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 font-semibold text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 "
                    placeholder="Pied Piper"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-x-6">
              {loading ? (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => submitFunc(e)}
                >
                  Generate
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </button>
              )}
            </div>
          </form>

          {clickedGenerate && (
            <div className="border border-gray-200 bg-gray-100 p-4 rounded-lg mx-auto max-w-7xl px-6 lg:mx-8 mt-32">
              {responseMessage && loading ? (
                <>
                  <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                    Your Cover Letter
                  </h2>
                  <pre className="mt-2">{responseMessage}</pre>
                </>
              ) : (
                <>
                  <Spinner />
                </>
              )}
            </div>
          )}

          <div className="bg-white py-24 sm:py-32" id="learn-more">
            <h2 className="text-center text-3xl font-semibold text-lg leading-8 text-gray-900 mb-4">
              Built with the technologies of the future
            </h2>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                <div className="bg-gray-100 p-8 sm:p-10 border border-gray-200">
                  <img
                    className="max-h-12 w-full object-contain"
                    src="https://i0.wp.com/www.globalemancipation.ngo/wp-content/uploads/2017/09/github-logo.png?ssl=1"
                    alt="GitHub"
                    width={158}
                    height={48}
                  />
                </div>
                <div className="bg-gray-100 p-6 sm:p-10">
                  <p
                    className="w-full mx-auto my-auto text-center text-3xl text-[#9169FF]"
                    style={{ fontFamily: "IBM Plex Mono" }}
                  >
                    Metaphor
                  </p>
                </div>
                <div className="bg-gray-100  p-6 sm:p-10 border border-gray-200">
                  <img
                    className="max-h-12 w-full object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
                    alt="Tuple"
                    width={158}
                    height={48}
                  />
                </div>
                <div className="bg-gray-100  p-6 sm:p-10 border border-gray-200">
                  <img
                    className="max-h-12 w-full object-contain"
                    src="https://www.gend.co/hs-fs/hubfs/gcp-logo-cloud.png?width=730&name=gcp-logo-cloud.png"
                    alt="GCP"
                    width={158}
                    height={48}
                  />
                </div>
                <div className="bg-gray-100  p-6 sm:p-10 border border-gray-200">
                  <img
                    className="max-h-12 w-full object-contain"
                    src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
                    alt="FastAPI"
                    width={158}
                    height={48}
                  />
                </div>
                <div className="bg-gray-100 p-6 sm:p-10 border border-gray-200">
                  <img
                    className="max-h-12 w-full object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                    alt="React"
                    width={158}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>

          <Faq />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
