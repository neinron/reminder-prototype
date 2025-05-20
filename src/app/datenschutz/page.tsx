import { Card, CardContent } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <main className="flex justify-center bg-background py-10 w-full">
      <Card className="w-full max-w-2xl shadow-none">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Datenschutzrichtlinie</h1>
          <hr className="mb-6" />
          <div className="text-muted-foreground mb-4">Stand: Mai 2025</div>
          <p className="mb-6">Um unseren geplanten Reminder-Service testen zu können, brauchen wir ein paar deiner Daten. Der Schutz deiner Privatsphäre hat dabei oberste Priorität.<br/>Nachfolgend erfährst du, welche Daten wir erheben, warum wir sie brauchen, wie lange wir sie speichern und welche Rechte du hast.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Wer für die Verarbeitung deiner personenbezogenen Daten verantwortlich ist</h3>
          <p className="mb-4">
            Verantwortlich sind wir, die<br/>
            Wemolo GmbH<br/>
            St.-Martin-Straße 72<br/>
            81541 München – Deutschland<br/>
            Tel.: +49 (0) 89 356 477 60<br/>
            <a href="mailto:help@wemolo.com" className="underline">help@wemolo.com</a><br/>
            <a href="https://www.wemolo.com" target="_blank" rel="noopener noreferrer" className="underline">www.wemolo.com</a>
          </p>
          <p className="mb-4">
            in Zusammenarbeit mit unserem Datenschutz­beauftragten<br/>
            Christian Schmoll<br/>
            Kaiserplatz 2<br/>
            80803 München – Deutschland<br/>
            <a href="mailto:schmoll@lucid-compliance.com" className="underline">schmoll@lucid-compliance.com</a>
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Warum wir deine personenbezogenen Daten verarbeiten</h3>
          <p className="mb-4">
            Wir führen einen Pilot durch, um herauszufinden, ob Fahrer:innen einen Reminder-Service vor Ablauf ihrer Gratis-Parkzeit möchten.<br/>
            Dafür bitten wir dich um deine Einwilligung, damit wir
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>dein Kennzeichen registrieren können,</li>
            <li>eine Kontaktangabe (Telefonnummer) speichern dürfen,</li>
            <li>dich später kontaktieren können, sobald der Reminder live geht.</li>
          </ul>
          <p className="mb-4">Während des Piloten werden keine echten Benachrichtigungen verschickt; wir messen nur das Interesse.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Welche Daten wir konkret erheben</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Kennzeichen des Fahrzeugs</li>
            <li>Telefonnummer</li>
            <li>Name</li>
            <li>Kontaktpräferenz (SMS/WhatsApp)</li>
            <li>Preisvorstellungen (monatlich und pro Erinnerung)</li>
            <li>Wahrnehmter Nutzen des Services</li>
            <li>Datum und Uhrzeit deiner Anmeldung (für die Warteliste)</li>
            <li>Gekürzte IP-Adresse und technische Protokolldaten beim Seitenbesuch (für Betrieb & Sicherheit)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Wo wir deine Daten speichern</h3>
          <ul className="list-disc ml-6 mb-4">
            <li>Die Wartelisten-Daten liegen verschlüsselt in einer EU-Datenbank (Supabase, Region Frankfurt).</li>
            <li>Geo-Lokalisierung erfolgt mit ipapi.co (EU-Server).</li>
            <li>Reichweiten­messung erfolgt cookiefrei mit Matomo auf einem EU-Server.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Wie lange wir deine Daten aufbewahren</h3>
          <p className="mb-4">Diese Daten speichern wir solange sicher bei uns ab, bis der Zweck, zu dem wir deine Daten benötigen, erfüllt ist. Nach Abschluss der Testphase werden alle personenbezogenen Daten gelöscht, außer wenn du uns erlaubst, dich für zukünftige Updates zu kontaktieren.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Rechtliche Grundlagen</h3>
          <p className="mb-4">Die Verarbeitung deiner personenbezogenen Daten erfolgt auf der Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Diese Einwilligung kannst du jederzeit widerrufen.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Welche Rechte du hast</h3>
          <p className="mb-4">Zur Ausübung deiner Rechte genügt eine Nachricht an <a href="mailto:privacy@wemolo.com" className="underline">privacy@wemolo.com</a>. Hier sind die Details zu deinen Rechten:</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Recht auf Auskunft (Art. 15 DSGVO)</strong>: Du kannst jederzeit von uns eine Bestätigung verlangen, ob wir personenbezogene Daten von dir verarbeiten. Falls ja, geben wir dir Auskunft über die Zwecke, Kategorien der verarbeiteten Daten, Empfänger und geplante Speicherdauer.</li>
            <li><strong>Recht auf Berichtigung (Art. 16 DSGVO)</strong>: Wenn deine bei uns gespeicherten Daten fehlerhaft oder unvollständig sind, müssen wir diese nach deinen Vorgaben berichtigen.</li>
            <li><strong>Recht auf Löschung (Art. 17 DSGVO)</strong>: Du kannst die unverzügliche Löschung deiner personenbezogenen Daten einfordern, wenn einer der folgenden Gründe zutrifft: Der Zweck der Datenverarbeitung ist entfallen, du hast deine Einwilligung widerrufen oder die Verarbeitung ist unrechtmäßig.</li>
            <li><strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong>: Wenn du die Richtigkeit deiner Daten bestreitest oder die Daten für rechtliche Ansprüche benötigst, kannst du die Verarbeitung deiner Daten einschränken lassen.</li>
            <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</strong>: Du hast das Recht, deine personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format anzufordern.</li>
            <li><strong>Recht auf Widerspruch (Art. 21 DSGVO)</strong>: Du kannst jederzeit Widerspruch gegen die Verarbeitung deiner personenbezogenen Daten einlegen.</li>
            <li><strong>Recht auf Beschwerde (Art. 77 DSGVO)</strong>: Du hast das Recht, dich an die zuständige Aufsichtsbehörde zu wenden, wenn du der Meinung bist, dass wir gegen Datenschutzrecht verstoßen.</li>
          </ul>

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