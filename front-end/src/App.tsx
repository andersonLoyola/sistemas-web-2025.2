export default function JamsPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#7A0000] font-sans">
      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center p-6 shadow-md">
        <div className="text-3xl font-bold">JM</div>
        <ul className="flex gap-10 font-semibold">
          <li className="text-[#B30000]">INÍCIO</li>
          <li className="text-red-50">CAMPEÕES</li>
          <li>MINHAS JAMS</li>
          <li>EQUIPE</li>
          <li>PERFIL</li>
        </ul>
        <div className="flex items-center bg-[#F2F2F2] rounded-full px-4 py-2 text-sm">
          <input className="bg-transparent outline-none" placeholder="Buscar gamejam" />
        </div>
      </nav>

      {/* SECTION: JAMS OFICIAIS */}
      <section className="px-10 mt-10">
        <h2 className="text-2xl font-bold mb-6">JAMS OFICIAIS</h2>
        <div className="grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="relative h-72 rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <img
                src="https://via.placeholder.com/300x300"
                alt="jam"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="font-bold text-lg">GAME JAM {i + 1}</h3>
                <p className="text-sm">5/10 • 80 horas</p>
                <p className="text-sm mt-2">
                  Descrição curta da jam com algumas informações.
                </p>
                <p className="text-[#00FF00] font-bold mt-2">R$ 1.000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: JAMS DA COMUNIDADE */}
      <section className="px-10 mt-14">
        <h2 className="text-2xl font-bold mb-6">JAMS DA COMUNIDADE</h2>
        <div className="grid grid-cols-7 gap-4 p-6 border-2 border-[#B30000] rounded-3xl">
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#8B0000] h-32 rounded-xl flex flex-col justify-center items-center text-white font-semibold text-center p-2 shadow-md"
            >
              <img
                src="https://via.placeholder.com/80"
                className="w-16 h-16 mb-2"
              />
              <p>ULTRA JAM</p>
              <p className="text-yellow-300 text-xs">SEM PREMIAÇÃO</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#B30000] text-white mt-20 py-10 px-10 text-sm grid grid-cols-2">
        <div className="leading-6">
          <p>Email oficial: contato@j4m.com</p>
          <p>Suporte ao usuário: suporte@j4m.com</p>
          <p>Telefone: +55 (11) 4002-8922</p>
          <p>WhatsApp: +55 (11) 98888-1234</p>

          <div className="mt-6">
            <p>Redes sociais:</p>
            <p>Instagram: @j4m_oficial</p>
            <p>Twitter/X: @J4M_Community</p>
            <p>Discord: discord.gg/j4m</p>
          </div>
        </div>

        <div className="flex flex-col items-end text-right leading-6">
          <p>Endereço:</p>
          <p>Rua dos Gamers, 404 – Sala 8</p>
          <p>Bairro Pixel City – São Paulo/SP – Brasil</p>
          <p>CEP: 01010-404</p>
        </div>
      </footer>
    </div>
  );
}
