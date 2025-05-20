"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"
import { LicensePlateInput } from "@/components/ui/input-licenseplate"
import React from "react";
import { Mail, Check, Bell, PartyPopper } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaWhatsapp } from "react-icons/fa";
import SliderMarksDemo from "@/components/customized/slider/slider-09";

export default function Home() {
  const [plate, setPlate] = useState("");
  const [city, setCity] = useState("");
  const [rest, setRest] = useState("");
  // Kontaktkanäle
  const [contactValue, setContactValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [smsSelected, setSmsSelected] = useState(false);
  const [whatsappSelected, setWhatsappSelected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [monthlyValue, setMonthlyValue] = useState(2); // €0–5, step 0.1
  const [perUseValue, setPerUseValue] = useState(0);   // €0–1, step 0.05
  const [reminderLead, setReminderLead] = useState(2); // 1–20 min, default 10
  const [benefit, setBenefit] = useState<string[]>([]); // Array für mehrere Checkboxen
  const [benefitOther, setBenefitOther] = useState(""); // Freitext für "Other"
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

// Zustände für die Labels
const [reminderLabel, setReminderLabel] = useState("15 min");
const [monthlyLabel, setMonthlyLabel] = useState("3 €");
const [perUseLabel, setPerUseLabel] = useState("0.50 €");

// Labels für die Sliders
const reminderLabels = ["5 min", "15 min", "25 min", "30 min"];
const monthlyLabels = ["1 €", "3 €", "5 €", "10 €"];
const perUseLabels = ["0.10 €", "0.20 €", "0.30 €", "0.40 €", "0.50 €", "0.60 €", "0.70 €", "0.80 €", "0.90 €", "1.00 €"];

  // Log visit on page load
  useEffect(() => {
    fetch("/api/visit", { method: "POST" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Kennzeichen mit Bindestrich zusammensetzen
    const stitchedPlate = city && rest ? `${city}-${rest}` : plate;
    // Channel-String bestimmen
    let channel = "";
    if (smsSelected && whatsappSelected) channel = "sms+whatsapp";
    else if (smsSelected) channel = "sms";
    else if (whatsappSelected) channel = "whatsapp";
    const payload: Record<string, string> = {
      plate: stitchedPlate,
      channel,
      phone: contactValue,
      name: nameValue,
    };

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      setError("Irgendwas lief schief. Bitte versuch es erneut.");
    }
    setSubmitting(false);
  };

  // --- Pre-Submit-Ansicht (Formular, Hinweise etc.) ---
  const PreSubmitContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-2 mt-[-10px] mb-4">
        <div className="flex flex-row items-center gap-5">
          <Check className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Trage dein Kennzeichen und deine Kontaktdaten ein.</span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <Bell className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Wir erinnern dich per Nachricht 15 Minuten vor Ablauf deiner Parkzeit.</span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <PartyPopper className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Du kannst du rechtzeitig ausfahren und Strafzettel vermeiden!</span>
        </div>
      </div>
      <label htmlFor="plate" className="block font-bold mb-2">
        Kennzeichen
      </label>
      <LicensePlateInput
        id="plate"
        value={plate}
        onChange={e => setPlate(e.target.value)}
        className="w-full mb-0"
        required
      />
      <label htmlFor="name" className="block font-bold mb-2 mt-[-8px]">
        Name
      </label>
      <Input
        id="name"
        type="text"
        placeholder="z.B. Max Mustermann"
        value={nameValue}
        onChange={e => setNameValue(e.target.value)}
        className="w-full mb-0"
        autoComplete="name"
      />
      <label htmlFor="contact" className="block font-bold mb-2 mt-4">
        Telefonnummer
      </label>
      <Input
        id="contact"
        type="tel"
        placeholder="z.B. +491701234567"
        value={contactValue}
        onChange={e => setContactValue(e.target.value)}
        className="w-full mb-2"
        autoComplete="tel"
        required
      />
      <div className="flex gap-2 mt-3 w-full">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSmsSelected(v => !v)}
          className={
            (smsSelected
              ? "bg-[#5046e8] border-2 border-[#5046e8] text-white"
              : "bg-white border-2 border-black text-black") +
            " flex-1 min-w-0 px-3 py-2 rounded-full font-bold"
          }
        >
          <Mail
            className="inline mr-1 align-text-bottom"
            size={18}
            color={smsSelected ? "white" : "black"}
          />
          SMS
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setWhatsappSelected(v => !v)}
          className={
            (whatsappSelected
              ? "bg-[#5046e8] border-2 border-[#5046e8] text-white"
              : "bg-white border-2 border-black text-black") +
            " flex-1 min-w-0 px-3 py-2 rounded-full font-bold"
          }
        >
          <FaWhatsapp
            className="inline mr-1 text-lg align-text-bottom"
            size={18}
            color={whatsappSelected ? "white" : "black"}
          />
          WhatsApp
        </Button>
      </div>
      <div className="flex items-center space-x-3 mt-5 mb-6">
        <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={val => setAcceptedTerms(!!val)} className="ml-6" />
        <Label htmlFor="terms">Ich akzeptiere die <a href="/datenschutz" className="underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a><span className="text-red-600 ml-1">*</span></Label>
      </div>
      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? "Wird gesendet..." : "Zur Warteliste anmelden"}
      </Button>
      <div className="text-xs text-left text-yellow-700 bg-yellow-50 rounded px-3 py-2 mt-0">
        <strong>Hinweis:</strong> Der Service befindet sich aktuell in einer Testphase. Erinnerungen werden noch nicht verschickt – wir prüfen zunächst das Interesse. Trag dich ein und wir halten dich auf dem Laufenden. Mit Klick auf „Zur Warteliste anmelden“ erklärst du dich damit einverstanden, dass wir deine Angaben ausschließlich für diesen Test speichern und dich kontaktieren, sobald es Neuigkeiten gibt. Mehr dazu in unserer <a href="/datenschutz" className="underline" target="_blank">Datenschutzerklärung</a>.
      </div>
    </form>
  );

  // --- Post-Submit-Ansicht (Success, Feedback etc.) ---
  const PostSubmitContent = (
    <div className="text-black text-left font-semibold py-4">
      <div className="text-2xl mb-2">🎉 Du stehst auf der Warteliste!</div>
        
      <div className="text-base font-medium mb-2">
        Wir benachrichtigen dich, sobald der Service zu den Erinnerungen bereit ist.
      </div>
      <div className="mt-8 space-y-10">
        {/* 4. Main benefit */}
        <div>
          <div className="font-base font-medium mt-2 mb-4">
            Was wäre für dich der größte Nutzen dieses Services?
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="benefit-stress" checked={benefit.includes('stress')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'stress'] : v.filter((b: string) => b !== 'stress'))} />
              <label htmlFor="benefit-stress" className="text-sm font-medium leading-none">Ich spare mir Stress</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="benefit-fee" checked={benefit.includes('fee')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'fee'] : v.filter((b: string) => b !== 'fee'))} />
              <label htmlFor="benefit-fee" className="text-sm font-medium leading-none">Ich vermeide Strafgebühren</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="benefit-shopping" checked={benefit.includes('shopping')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'shopping'] : v.filter( (b: string) => b !== 'shopping'))} />
              <label htmlFor="benefit-shopping" className="text-sm font-medium leading-none">Ich kann länger einkaufen</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="benefit-other" checked={benefit.includes('other')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'other'] : v.filter((b: string) => b !== 'other'))} />
              <label htmlFor="benefit-other" className="text-sm font-medium leading-none">Etwas anderes …</label>
            </div>
            {benefit.includes('other') && (
              <input
                type="text"
                className="mt-1 border rounded px-2 py-1 text-sm font-medium"
                placeholder="Beschreibe hier deinen größten Nutzen"
                value={benefitOther}
                onChange={e => setBenefitOther(e.target.value)}
              />
            )}
          </div>
        </div>
        {/* 3. Reminder lead time */}
        <div>
          <div className="font-base font-medium mt-2 mb-4">
            Wie viele Minuten vor Ablauf deiner Gratis-Parkzeit würdest du am liebsten erinnert werden?
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full flex flex-col items-center">
              <SliderMarksDemo
                defaultValue={[1]}  // Start with 15 min
                max={reminderLabels.length - 1}
                step={1}
                value={[reminderLead]}
                onValueChange={vals => {
                  setReminderLead(vals[0]);
                  setReminderLabel(reminderLabels[vals[0]]);
                }}
                labels={reminderLabels}
              />
            </div>
          </div>
        </div>
        {/* 1. Monthly subscription willingness */}
        <div>
          <div className="font-base font-medium mt-2 mb-0">
          Stell dir vor, du kannst mit diesem Feature mehrere Parkverstöße (40€/Strafzettel) ersparen.
          </div>
          <div className="font-base font-medium mt-2 mb-4">
          Wie viel wäre dir das monatlich wert?
          </div>
          <div className="w-full flex justify-center">
          <div className="w-full flex flex-col items-center">
              <SliderMarksDemo
                defaultValue={[1]}  // Start with 3 €
                max={monthlyLabels.length - 1}
                step={1}
                value={[monthlyValue]}
                onValueChange={vals => {
                  setMonthlyValue(vals[0]);
                  setMonthlyLabel(monthlyLabels[vals[0]]);
                }}
                labels={monthlyLabels}
              />
          </div>
        </div>
        {/* 2. Pay-per-use willingness */}
        <div>
          <div className="font-base font-medium mt-2 mb-4">
            Falls du lieber pro Erinnerung zahlen würdest: Welcher Preis pro Reminder wäre für Sie akzeptabel?
          </div>
          <div className="w-full flex justify-center">
          <div className="w-full flex flex-col items-center">
              <SliderMarksDemo
                defaultValue={[4]}  // Start with 0.50 €
                max={perUseLabels.length - 1}
                step={1}
                value={[perUseValue]}
                onValueChange={vals => {
                  setPerUseValue(vals[0]);
                  setPerUseLabel(perUseLabels[vals[0]]);
                }}
                labels={perUseLabels}
              />
          </div>
        </div>
        
        {/* Save Button */}
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
          onClick={async () => {
            setSaving(true);
            setSaveSuccess(false);
            setSaveError(null);
            try {
              const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  monthlyValue,
                  perUseValue,
                  reminderLead,
                  benefit,
                  benefitOther,
                }),
              });
              if (res.ok) {
                setSaveSuccess(true);
              } else {
                setSaveError("Fehler beim Speichern.");
              }
            } catch {
              setSaveError("Fehler beim Speichern.");
            }
            setSaving(false);
          }}
          disabled={saving}
        >
          {saving ? "Speichern..." : "Antworten speichern"}
        </button>
        {saveSuccess && <div className="text-green-600 mt-2">Antworten gespeichert!</div>}
        {saveError && <div className="text-red-600 mt-2">{saveError}</div>}
      </div>
    </div>
    </div>
    </div>
  );

  return (
    <main className="flex min-h-screen bg-background pt-0">
      <div className="flex flex-col items-center w-full mt-0">
        <Card className="w-full max-w-lg mb-4">
          {!success && (
            <CardHeader>
              
              <CardTitle className="text-2xl text-left">
                Wie du nie wieder einen Strafzettel bekommst:
              </CardTitle>
            </CardHeader>
          )}
          <CardContent>
            {success ? PostSubmitContent : PreSubmitContent}
            {!success && (
            <Accordion type="single" collapsible className="w-full mt-4 mb-10">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base text-left">
                    <span className="flex flex-col flex-1">
                      <span className="text-sm font-medium">
                        Wie funktioniert das Scannerssystem auf diesem Parkplatz?
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Beim Ein- und Ausfahren erfassen unsere Scanner dein Kennzeichen und starten bzw. stoppen automatisch die Parkuhr. Solange du die ausgewiesene Gratis-Parkzeit einhältst, parkst du völlig kostenlos – ganz ohne Ticket oder Parkscheibe. Durch die Kennzeichenerfassung werden Dauer- und Fremdparker aussortiert, sodass auch zu Stoßzeiten für dich ein Platz frei bleibt.
                      </p>
                      <div className="relative w-full">
                        <img
                          src="/supervision-rendering.jpg"
                          alt="Parkplatz-Überwachungssystem"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
