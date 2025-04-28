"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"
import { LicensePlateInput } from "@/components/ui/input-licenseplate"
import React from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
 
export default function Home() {
  const [plate, setPlate] = useState("");
  const [city, setCity] = useState("");
  const [rest, setRest] = useState("");
  // Kontaktkanäle
  const [contactValue, setContactValue] = useState("");
  const [smsSelected, setSmsSelected] = useState(false);
  const [whatsappSelected, setWhatsappSelected] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  return (
    <main className="flex justify-center items-start min-h-screen bg-background py-10">
      <div className="flex flex-col items-center w-full">
        <Card className="w-full max-w-lg ">
          <CardHeader>
            <CardTitle className="text-3xl text-left mb-1">
              Parkzeit Erinnerungen
            </CardTitle>
            <div className="text-left text-muted-foreground text-base mb-0 mt-0" style={{marginTop: 0}}>
              Wir erinnern dich rechtzeitig per SMS oder WhatsApp an das Ende deiner Parkzeit.<br />
              So kannst du Strafzettel vermeiden und entspannt parken.
              Einfach Kennzeichen und Kontaktmethode eintragen!
            </div>
          </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-black text-left font-semibold py-8">
              🎉 Du stehst auf der Warteliste!<br />
              Wir benachrichtigen dich, sobald die Erinnerungen starten.
            </div>
          ) : (
            <form
              onSubmit={e => {
                if (!contactValue.trim()) {
                  e.preventDefault();
                  setError("Bitte gib deine Telefonnummer an.");
                  return;
                }
                if (!acceptedTerms) {
                  e.preventDefault();
                  setError("Bitte akzeptiere die Datenschutzerklärung.");
                  return;
                }
                setError("");
                handleSubmit(e);
              }}
              className="space-y-4"
            >

              <div>
                <label htmlFor="plate" className="block font-bold mb-1">Kennzeichen</label>
                <div style={{height: 10}} />
                <div className="flex justify-center w-full">
                  <LicensePlateInput
                    id="plate"
                    value={plate}
                    onChange={e => {
                      setPlate(e.target.value);
                      if (typeof e.city === "string") setCity(e.city);
                      if (typeof e.rest === "string") setRest(e.rest);
                    }}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block font-bold mb-1">
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
                <div className="flex gap-2 mt-2 w-full">
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={val => setAcceptedTerms(!!val)} />
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
                <div className="text-xs text-muted-foreground mt-2 mb-2 leading-snug">
                  Der Service befindet sich aktuell in einer Testphase. Reminders werden noch nicht verschickt – wir prüfen zunächst das Interesse. Trag dich ein und wir halten dich auf dem Laufenden. Mit Klick auf „Zur Warteliste anmelden“ erklärst du dich damit einverstanden, dass wir deine Angaben ausschließlich für diesen Test speichern und dich kontaktieren, sobald es Neuigkeiten gibt. Mehr dazu in unserer <a href="/datenschutz" className="underline" target="_blank">Datenschutzerklärung</a>.
                </div>
            </form>
          )}
        </CardContent>
        </Card>
      </div>
    </main>
  );
}