import { Card, CardContent } from "@/components/ui/card";

export default function ImpressumPage() {
  return (
    <main className="flex justify-center bg-background py-10 w-full">
      <Card className="w-full max-w-2xl shadow-none">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Impressum</h1>
          <hr className="mb-6" />
          <div className="text-muted-foreground mb-4">Stand: April 2024</div>

          <section className="mb-6">
            <div className="mb-2 font-semibold">Wemolo GmbH</div>
            <div>St.-Martin-Straße 72<br/>81541 München<br/>Deutschland</div>
            <div><a href="mailto:help@wemolo.com" className="underline">help@wemolo.com</a></div>
            <div>Tel.: +49 89 6931 464 91</div>
            <div>Website: <a href="https://www.wemolo.com" className="underline" target="_blank" rel="noopener noreferrer">www.wemolo.com</a></div>
            <div>Vertreten durch die Geschäftsführer: Jakob Bodenmüller, Yukio Iwamoto, Bastian Pieper</div>
            <div>Firmensitz: München</div>
            <div>Registergericht: Amtsgericht München</div>
            <div>Registernummer: HRB 250653</div>
            <div>Umsatzsteuer-Identifikationsnummer: DE325788012</div>
            <div className="text-xs text-muted-foreground mt-2">Hinweis: Dieses Impressum gilt für alle von Wemolo betriebenen Websites, insbesondere die oben genannte Website sowie der Blog und Help Center von Wemolo sowie die webbasierte Software.</div>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mt-8 mb-2">Haftung für Inhalte</h3>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Dienstleister sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Jedoch sind wir nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mt-8 mb-2">Urheberrecht</h3>
            <p>Die Inhalte dieser Website unterliegen dem Urheberrecht, sofern nicht anders gekennzeichnet, und dürfen nicht ohne vorherige schriftliche Zustimmung von Wemolo weder als Ganzes noch in Teilen verbreitet, verändert oder kopiert werden. Die auf dieser Website eingebundenen Bilder dürfen nicht ohne vorherige schriftliche Zustimmung von Wemolo verwendet werden. Auf den Websites enthaltene Bilder unterliegen teilweise dem Urheberrecht Dritter. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mt-8 mb-2">Haftung für Links</h3>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mt-8 mb-2">Verantwortlicher</h3>
            <div>Jakob Bodenmüller (Geschäftsführer)</div>
            <div>St.-Martin-Straße 72<br/>81541 München, Deutschland</div>
            <div>Tel.: +49 (0) 89 356477 60</div>
            <div>E-Mail: <a href="mailto:help@wemolo.com" className="underline">help@wemolo.com</a></div>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mt-8 mb-2">Zuständige Aufsichtsbehörde bei Datenschutzbeschwerden</h3>
            <div>Bayerisches Landesamt für Datenschutzaufsicht</div>
            <div>Postfach 1349<br/>91504 Ansbach, Deutschland</div>
          </section>

        </CardContent>
      </Card>
    </main>
  );
}
