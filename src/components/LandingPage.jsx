import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target); // opțional: animăm o singură dată
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observator pentru secțiunea "Cum funcționează aplicația"
    const targetHowItWorks = document.querySelector("#how-it-works");
    if (targetHowItWorks) observer.observe(targetHowItWorks);

    // Observator pentru secțiunea "Ce este Help a Hand"
    const targetAboutHelp = document.querySelector("#about-help-a-hand");
    if (targetAboutHelp) observer.observe(targetAboutHelp);

    // Observator pentru secțiunea "De ce să te alături?"
    const targetWhyJoin = document.querySelector("#why-join");
    if (targetWhyJoin) observer.observe(targetWhyJoin);

    // Observator pentru secțiunea "Fii un voluntar sau găsește ajutor acum!"
    const targetCallToAction = document.querySelector("#call-to-action");
    if (targetCallToAction) observer.observe(targetCallToAction);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#fffcf5" }}
    >
      {/* Header */}
      <header className="bg-white shadow-md w-full">
        <div className="px-10 py-5 flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-[#70d299]">Help a Hand</h1>
          <nav className="space-x-8">
            <Link
              to="/login"
              className="text-[#70d299] font-semibold hover:text-white hover:bg-[#70d299] px-5 py-3 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-[#70d299] font-semibold hover:text-white hover:bg-[#70d299] px-5 py-3 rounded transition"
            >
              Înregistrare
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-6xl mx-auto gap-16 ">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-center">
          <h2 className="text-6xl font-extrabold text-gray-900 mb-8">
            Help a Hand
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-xl">
            Fiecare mână întinsă contează. Ajută persoanele din comunitatea ta
            și fă o diferență reală în viața lor!
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-5 bg-[#70d299] text-white text-xl font-semibold rounded-lg hover:bg-[#429b7f] transition"
          >
            Începe acum
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/public/images/hero_image.jpeg"
            alt="Voluntar ajutând o persoană"
            className="w-full max-w-xxl rounded-lg"
          />
        </div>
      </main>

      {/* Descriere detaliată secțiune */}
      <section className="bg-[#70d299] py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-white mb-12">
            Ce este Help a Hand?
          </h3>
          <p
            id="about-help-a-hand"
            className="text-xl text-white mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            Help a Hand este o aplicație care ajută la conectarea voluntarilor
            cu persoanele care au nevoie de ajutor. Indiferent dacă ești o
            persoană în vârstă sau ai o dizabilitate, vei putea solicita ajutor
            pentru diverse activități zilnice. De asemenea, ca voluntar, poți
            contribui la îmbunătățirea vieților celor din jurul tău.
          </p>
        </div>
      </section>

      {/* Cum funcționează aplicația */}
      <section
        id="how-it-works"
        className="bg-white py-20 px-10 transition-all duration-700 ease-out opacity-0 translate-y-10"
        style={{ backgroundColor: "#fffcf5" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-gray-900 mb-12">
            Cum funcționează aplicația?
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Voluntari Section */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">
                Pentru Voluntari
              </h4>
              <p className="text-lg text-gray-700 mb-6">
                Voluntarii pot alege activitățile în care doresc să ajute, iar
                cererile sunt distribuite pe baza locației și disponibilității.
                Vei putea să:
              </p>
              <ul className="list-disc pl-8 text-gray-700 mb-6">
                <li>
                  Vizualizezi cereri pentru ajutor, cum ar fi plimbatul câinelui
                  sau cumpărături.
                </li>
                <li>
                  Îți alegi activitățile preferate și îți setezi propriul
                  program.
                </li>
                <li>
                  Oferi ajutor pe termen scurt sau lung, în funcție de
                  preferințele tale.
                </li>
              </ul>
              <p className="text-gray-700">
                Poți să-ți îmbogățești viața ajutând alți oameni și să simți
                satisfacția de a face o diferență în comunitatea ta.
              </p>
            </div>
            {/* Beneficiari Section */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">
                Pentru Beneficiari
              </h4>
              <p className="text-lg text-gray-700 mb-6">
                Dacă ai nevoie de ajutor, aplicația îți permite să postezi
                cereri pentru activități zilnice, care vor fi preluate de
                voluntari. Acestea pot include:
              </p>
              <ul className="list-disc pl-8 text-gray-700 mb-6">
                <li>
                  Plimbarea câinelui, în special dacă ai dificultăți de
                  mobilitate.
                </li>
                <li>Cumpărături de produse esențiale.</li>
                <li>Ridicarea corespondenței sau a coletelelor de la poștă.</li>
                <li>
                  Ajutor cu plimbările și activitățile recreative pentru a
                  îmbunătăți starea de bine.
                </li>
              </ul>
              <p className="text-gray-700">
                Fiecare cerere este tratată cu grijă și profesionalism.
                Voluntarii sunt verificați pentru siguranța ta, iar ajutorul
                este oferit cu respect și empatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiile participării */}
      <section
        id="why-join"
        className="bg-gray-50 py-20 px-10 opacity-0 translate-y-10 transition-all duration-700 ease-out"
        style={{ backgroundColor: "#e8e2d4" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-gray-900 mb-12">
            De ce să te alături?
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Beneficii pentru Voluntari */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">
                Beneficii pentru Voluntari
              </h4>
              <ul className="list-disc pl-8 text-gray-700">
                <li>
                  Fă o diferență reală în viața oamenilor din comunitatea ta.
                </li>
                <li>Ajută-ți aproapele și simte satisfacția de a contribui.</li>
                <li>
                  Obține experiență în lucrul cu persoanele în vârstă sau cu
                  dizabilități.
                </li>
                <li>
                  Fii parte dintr-o rețea de oameni care doresc să schimbe în
                  bine lumea din jurul lor.
                </li>
              </ul>
            </div>
            {/* Beneficii pentru Beneficiari */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">
                Beneficii pentru Beneficiari
              </h4>
              <ul className="list-disc pl-8 text-gray-700">
                <li>
                  Acces rapid la ajutorul necesar pentru activitățile zilnice.
                </li>
                <li>Voluntari dedicați care te ajută cu grijă și respect.</li>
                <li>
                  Siguranță și încredere, datorită verificării voluntarilor.
                </li>
                <li>
                  Mai multă independență și posibilitatea de a te bucura de
                  activități în aer liber sau de alte ajutoare esențiale.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="call-to-action"
        className="bg-[#70d299] text-white py-20 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <h3 className="text-4xl font-semibold mb-8">
          Fii un voluntar sau găsește ajutor acum!
        </h3>
        <Link
          to="/register"
          className="inline-block px-10 py-5 bg-white text-[#70d299] text-lg font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Înregistrează-te acum
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 shadow-inner w-full">
        <p className="text-sm text-gray-500">
          &copy; 2025 LTCode. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
