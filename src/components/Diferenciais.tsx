import styles from './Diferenciais.module.css';
import 'boxicons/css/boxicons.min.css'; // já deve estar importado no layout

export default function Diferenciais() {
  return (
    <section className="pt-20 pb-32 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-[#3a5550] mb-12">
        Nossos Diferenciais
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className={`p-6 rounded-lg shadow text-center ${styles.cardVitrine}`}>
          <i className="bx bx-store-alt text-4xl mb-4"></i>
          <h3 className="text-lg font-bold mb-2">Grande Vitrine</h3>
          <p>Exponha seu talento para olheiros em todo o Brasil com um perfil atrativo e acessível.</p>
        </div>

        <div className={`p-6 rounded-lg shadow text-center ${styles.cardTradicao}`}>
          <i className="bx bx-award text-4xl mb-4"></i>
          <h3 className="text-lg font-bold mb-2">Confiabilidade</h3>
          <p>Segurança e seriedade na plataforma, promovendo apenas jogadores e olheiros verificados.</p>
        </div>

        <div className={`p-6 rounded-lg shadow text-center ${styles.cardModerno}`}>
          <i className="bx bx-bulb text-4xl mb-4"></i>
          <h3 className="text-lg font-bold mb-2">Foco no Futuro</h3>
          <p>Tecnologia e inovação para evoluir seu perfil e aumentar as chances de sucesso na carreira esportiva.</p>
        </div>
      </div>
    </section>
  );
}
