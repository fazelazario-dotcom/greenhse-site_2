export const metadata={
  title:'About Us | Greenhse Technologies Perth',
  description:"Greenhse Technologies — Perth's LED lighting and smart home supplier since 2010. Australian owned, certified fittings, free lighting design and wholesale prices direct to the public.",
  alternates:{canonical:'/about/'},
};

export default function About(){
  return (
    <main className="ab">
      <p className="bl-crumb"><a href="/">Home</a> › About us</p>
      <p className="eyebrow">Who we are</p>
      <h1>About Greenhse Technologies</h1>
      <p className="ab-lede">Perth&apos;s trusted LED lighting and smart home supplier — certified fittings,
        expert advice and local support. Australian owned and operating since 2010.</p>

      <div className="ab-grid">
        <section className="ab-card">
          <h2>The Greenhse advantage</h2>
          <ul>
            <li>High quality, energy-efficient products supplied direct to consumers at low cost</li>
            <li>Australian owned and operating since 2010</li>
            <li>Over 20 years of experience</li>
            <li>A strong focus on R&amp;D and engineering improvement</li>
            <li>Design and development of our own products</li>
            <li>Winner of the Belmont Small Business Award — overall judges award for
                environmental, energy efficiency and innovation</li>
          </ul>
          <a className="btn" href="/categories/">Browse our range →</a>
        </section>
        <section className="ab-card">
          <h2>Why Greenhse?</h2>
          <ul>
            <li>Domestic, retail, commercial and industrial — small or large quantities</li>
            <li>Shortest return on investment</li>
            <li>Expert advice, plus free lighting design and an energy/cost saving report</li>
            <li>Wholesale prices direct to the public</li>
            <li>Australian certified products with public liability cover</li>
            <li>Shipping throughout Australia and worldwide</li>
          </ul>
          <a className="btn" href="/contact/">Get in touch →</a>
        </section>
      </div>

      <section className="ab-visit">
        <h2>Come and see it lit</h2>
        <p>Our Ellenbrook showroom has the range running so you can judge colour temperature and
           glare with your own eyes rather than from a spec sheet.</p>
        <p className="ab-addr">5/1 Locke Ln, Ellenbrook WA 6069<br/>
          <a href="tel:+61892972969">(08) 9297 2969</a> · Mon–Fri 8AM–5PM</p>
        <a className="btn" href="/light-lab/">See recent work →</a>
      </section>
    </main>
  );
}
