import { Card, CardContent } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <main className="flex justify-center bg-background py-10 w-full">
      <Card className="w-full max-w-2xl shadow-none">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Datenschutzrichtlinie</h1>
          <hr className="mb-6" />
          <div className="text-muted-foreground mb-4">Stand: April 2025</div>
          <p className="mb-6">Um unseren geplanten Reminder-Service testen zu können, brauchen wir ein paar deiner Daten. Der Schutz deiner Privatsphäre hat dabei oberste Priorität.<br/>Nachfolgend erfährst du, welche Daten wir erheben, warum wir sie brauchen, wie lange wir sie speichern und welche Rechte du hast.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Wer für die Verarbeitung deiner personenbezogenen Daten verantwortlich ist</h3>
          <p className="mb-4">
            Verantwortlich sind wir, die<br/>
            <strong>Wemolo GmbH</strong><br/>
            St.-Martin-Straße 72<br/>
            81541 München – Deutschland<br/>
            Tel.: +49 (0) 89 356 477 60<br/>
            <a href="mailto:help@wemolo.com" className="underline">help@wemolo.com</a><br/>
            <a href="https://www.wemolo.com" target="_blank" rel="noopener noreferrer" className="underline">www.wemolo.com</a>
          </p>
          <p className="mb-4">
            in Zusammenarbeit mit unserem Datenschutz­beauftragten<br/>
            <strong>Christian Schmoll</strong><br/>
            Kaiserplatz 2<br/>
            80803 München – Deutschland<br/>
            <a href="mailto:schmoll@lucid-compliance.com" className="underline">schmoll@lucid-compliance.com</a>
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Warum wir deine personenbezogenen Daten verarbeiten</h3>
          <p className="mb-4">
            Wir führen einen Pilot durch, um herauszufinden, ob Fahrer:innen einen Reminder-Service vor Ablauf ihrer Gratis-Parkzeit möchten.<br/>
            Dafür bitten wir dich um deine <strong>Einwilligung</strong>, damit wir
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>dein <strong>Kennzeichen</strong> registrieren können,</li>
            <li>eine <strong>Kontakt­angabe</strong> (E-Mail oder Mobilnummer) speichern dürfen,</li>
            <li>dich später kontaktieren können, sobald der Reminder live geht.</li>
          </ul>
          <p className="mb-4">Während des Piloten <strong>werden keine echten Benachrichtigungen verschickt</strong>; wir messen nur das Interesse.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Welche Daten wir konkret erheben</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Kennzeichen des Fahrzeugs</li>
            <li>E-Mail-Adresse oder Mobilnummer</li>
            <li>Datum und Uhrzeit deiner Anmeldung (für die Warteliste)</li>
            <li>Gekürzte IP-Adresse und technische Protokolldaten beim Seitenbesuch (für Betrieb & Sicherheit)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Wo wir deine Daten speichern</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Die Wartelisten-Daten liegen verschlüsselt in einer EU-Datenbank (Supabase, Region Frankfurt).</li>
            <li>Reichweiten­messung erfolgt cookiefrei mit Matomo auf einem EU-Server.</li>
            <li>Zum Formular-Schutz verwenden wir Google reCAPTCHA; dabei kann es zu einer Übermittlung in die USA kommen. Diese ist durch EU-Standardvertrags­klauseln abgesichert.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Welche Rechte du hast</h3>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Auskunft</strong> darüber, welche Daten wir von dir speichern</li>
            <li><strong>Berichtigung</strong> unrichtiger oder unvollständiger Daten</li>
            <li><strong>Löschung</strong> („Recht auf Vergessenwerden“)</li>
            <li><strong>Einschränkung</strong> der Verarbeitung</li>
            <li><strong>Daten­übertragbarkeit</strong> in einem gängigen, maschinen­lesbaren Format</li>
            <li><strong>Widerruf</strong> deiner Einwilligung jederzeit mit Wirkung für die Zukunft</li>
            <li><strong>Widerspruch</strong> gegen die Verarbeitung aus besonderen Gründen</li>
            <li><strong>Beschwerde</strong> bei einer Datenschutz­aufsichts­behörde, wenn du der Meinung bist, dass wir gegen Datenschutz­recht verstoßen</li>
          </ul>
          <p className="mb-4">Zur Ausübung deiner Rechte genügt eine Nachricht an <a href="mailto:privacy@wemolo.com" className="underline">privacy@wemolo.com</a>.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">So schützen wir deine Daten</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Verschlüsselte Übertragung (TLS)</li>
            <li>Verschlüsselte Speicherung („at rest“)</li>
            <li>Zugriff nur für wenige autorisierte Mitarbeitende („need-to-know“)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Änderungen dieser Datenschutzerklärung</h3>
          <p className="mb-4">Sollte sich der Pilot ändern oder geltendes Recht dies erfordern, aktualisieren wir diese Erklärung. Die jeweils aktuelle Fassung findest du immer auf dieser Seite.</p>
        </CardContent>
      </Card>
    </main>
  );
}