import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md w-full">
        <div className="px-10 py-5 flex justify-between items-center w-full">
          <h1 className="text-5xl font-bold text-green-500">Help a Hand</h1>
          <nav className="space-x-8">
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:text-white hover:bg-green-500 px-5 py-3 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-green-500 font-semibold hover:text-white hover:bg-green-500 px-5 py-3 rounded transition"
            >
              Înregistrare
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center px-10 py-20">
        <div>
          <h2 className="text-6xl font-extrabold text-gray-900 mb-8">
            Help a Hand
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Fiecare mână întinsă contează. Ajută persoanele din comunitatea ta și fă o diferență reală în viața lor!
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-5 bg-green-500 text-white text-xl font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Începe acum
          </Link>
        </div>
      </main>

      {/* Descriere detaliată secțiune */}
      <section className="bg-green-500 py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-white mb-12">
            Ce este Help a Hand?
          </h3>
          <p className="text-xl text-white mb-12">
            Help a Hand este o aplicație care ajută la conectarea voluntarilor cu persoanele care au nevoie de ajutor.
            Indiferent dacă ești o persoană în vârstă sau ai o dizabilitate, vei putea solicita ajutor pentru diverse activități zilnice. De asemenea, ca voluntar, poți contribui la îmbunătățirea vieților celor din jurul tău.
          </p>
        </div>
      </section>

      {/* Cum funcționează aplicația */}
      <section className="bg-white py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-gray-900 mb-12">
            Cum funcționează aplicația?
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Voluntari Section */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">Pentru Voluntari</h4>
              <p className="text-lg text-gray-700 mb-6">
                Voluntarii pot alege activitățile în care doresc să ajute, iar cererile sunt distribuite pe baza locației și disponibilității. Vei putea să:
              </p>
              <ul className="list-disc pl-8 text-gray-700 mb-6">
                <li>Vizualizezi cereri pentru ajutor, cum ar fi plimbatul câinelui sau cumpărături.</li>
                <li>Îți alegi activitățile preferate și îți setezi propriul program.</li>
                <li>Oferi ajutor pe termen scurt sau lung, în funcție de preferințele tale.</li>
              </ul>
              <p className="text-gray-700">
                Poți să-ți îmbogățești viața ajutând alți oameni și să simți satisfacția de a face o diferență în comunitatea ta.
              </p>
            </div>
            {/* Beneficiari Section */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">Pentru Beneficiari</h4>
              <p className="text-lg text-gray-700 mb-6">
                Dacă ai nevoie de ajutor, aplicația îți permite să postezi cereri pentru activități zilnice, care vor fi preluate de voluntari. Acestea pot include:
              </p>
              <ul className="list-disc pl-8 text-gray-700 mb-6">
                <li>Plimbarea câinelui, în special dacă ai dificultăți de mobilitate.</li>
                <li>Cumpărături de produse esențiale.</li>
                <li>Ridicarea corespondenței sau a coletelelor de la poștă.</li>
                <li>Ajutor cu plimbările și activitățile recreative pentru a îmbunătăți starea de bine.</li>
              </ul>
              <p className="text-gray-700">
                Fiecare cerere este tratată cu grijă și profesionalism. Voluntarii sunt verificați pentru siguranța ta, iar ajutorul este oferit cu respect și empatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiile participării */}
      <section className="bg-gray-50 py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-semibold text-gray-900 mb-12">
            De ce să te alături?
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Beneficii pentru Voluntari */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">Beneficii pentru Voluntari</h4>
              <ul className="list-disc pl-8 text-gray-700">
                <li>Fă o diferență reală în viața oamenilor din comunitatea ta.</li>
                <li>Ajută-ți aproapele și simte satisfacția de a contribui.</li>
                <li>Obține experiență în lucrul cu persoanele în vârstă sau cu dizabilități.</li>
                <li>Fii parte dintr-o rețea de oameni care doresc să schimbe în bine lumea din jurul lor.</li>
              </ul>
            </div>
            {/* Beneficii pentru Beneficiari */}
            <div className="text-left">
              <h4 className="text-3xl font-semibold text-gray-800 mb-6">Beneficii pentru Beneficiari</h4>
              <ul className="list-disc pl-8 text-gray-700">
                <li>Acces rapid la ajutorul necesar pentru activitățile zilnice.</li>
                <li>Voluntari dedicați care te ajută cu grijă și respect.</li>
                <li>Siguranță și încredere, datorită verificării voluntarilor.</li>
                <li>Mai multă independență și posibilitatea de a te bucura de activități în aer liber sau de alte ajutoare esențiale.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-500 text-white py-20 text-center">
        <h3 className="text-4xl font-semibold mb-8">
          Fii un voluntar sau găsește ajutor acum!
        </h3>
        <Link
          to="/register"
          className="inline-block px-10 py-5 bg-white text-green-500 text-lg font-semibold rounded-lg hover:bg-gray-200 transition"
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
