"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LicensePlateInput } from "@/components/ui/input-licenseplate";
import React from "react";
import { Mail, Check, Bell, PartyPopper } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaWhatsapp } from "react-icons/fa";
import SliderMarksDemo from "@/components/customized/slider/slider-09";
import supabase from "@/lib/supabase";
import { useFormData } from "@/lib/localStorage";

export default function Home() {
  const { formData, save: saveFormData } = useFormData();

  // Initialize form state with saved data or defaults
  const [plate, setPlate] = useState(formData?.plate || "");
  const [city, setCity] = useState(formData?.city || "");
  const [rest, setRest] = useState(formData?.rest || "");
  const [contactValue, setContactValue] = useState(formData?.contactValue || "");
  const [nameValue, setNameValue] = useState(formData?.nameValue || "");
  const [smsSelected, setSmsSelected] = useState(formData?.smsSelected || false);
  const [whatsappSelected, setWhatsappSelected] = useState(formData?.whatsappSelected || false);
  const [benefit, setBenefit] = useState<string[]>(formData?.benefit || []);
  const [benefitOther, setBenefitOther] = useState(formData?.benefitOther || "");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Labels für die Sliders
  const reminderLabels = ["5 min", "15 min", "25 min", "30 min"];
  const monthlyLabels = ["1 €", "3 €", "5 €", "10 €"];
  const perUseLabels = ["0,50 €", "1 €", "2 €", "3 €"];

  // Zustände für die Labels
  const [reminderLabel, setReminderLabel] = useState(reminderLabels[1]); // Start with 15 min
  const [monthlyLabel, setMonthlyLabel] = useState(monthlyLabels[1]); // Start with 3 €
  const [perUseLabel, setPerUseLabel] = useState(perUseLabels[1]); // Start with 1 €

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const formData = {
      plate,
      city,
      rest,
      contactValue,
      nameValue,
      smsSelected,
      whatsappSelected,
      benefit,
      benefitOther
    };
    saveFormData(formData);
  }, [plate, city, rest, contactValue, nameValue, smsSelected, whatsappSelected, benefit, benefitOther]);

  // Log visit and geolocation on page load
  useEffect(() => {
    const logVisitWithGeo = async () => {
      let visitorIp: string = '';
      try {
        // Get geolocation
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Get IP address
        visitorIp = await fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => data.ip);

        // First check if an entry exists for this IP
        const { data: existingData, error: queryError } = await supabase
          .from('signups')
          .select('*')
          .eq('ip', visitorIp);

        if (queryError) {
          console.error('Error querying existing data:', queryError);
          return;
        }

        // If no existing entry, create one with status 'visited'
        if (!existingData || existingData.length === 0) {
          await supabase
            .from('signups')
            .insert({
              ip: visitorIp,
              visited_at: new Date().toISOString(),
              status: 'visited'
            });
        } else {
          // Update existing entry
          await supabase
            .from('signups')
            .update({
              visited_at: new Date().toISOString(),
              status: 'visited'
            })
            .eq('id', existingData[0].id);
        }

      } catch (error) {
        console.error('Error getting geolocation:', error);
        // Still log the visit without location data
        // First check if an entry exists for this IP
        const { data: existingData, error: queryError } = await supabase
          .from('signups')
          .select('*')
          .eq('ip', visitorIp);

        if (queryError) {
          console.error('Error querying existing data:', queryError);
          return;
        }

        // If no existing entry, create one with status 'visited'
        if (!existingData || existingData.length === 0) {
          await supabase
            .from('signups')
            .insert({
              ip: visitorIp,
              visited_at: new Date().toISOString(),
              status: 'visited'
            });
        } else {
          // Update existing entry
          await supabase
            .from('signups')
            .update({
              visited_at: new Date().toISOString(),
              status: 'visited'
            })
            .eq('id', existingData[0].id);
        }
      }
    };

    logVisitWithGeo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Get user's IP address
      const visitorIp = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip);

      // Get existing entry
      const { data: existingData, error: queryError } = await supabase
        .from('signups')
        .select('*')
        .eq('ip', visitorIp);

      if (queryError) {
        console.error('Error querying existing data:', queryError);
        throw queryError;
      }

      // If no existing entry, create one
      let entryId;
      if (!existingData || existingData.length === 0) {
        const { data: createdData, error: insertError } = await supabase
          .from('signups')
          .insert({
            ip: visitorIp,
            signup_at: new Date().toISOString(),
            visited_at: new Date().toISOString(),
            status: 'joined_waiting_list',
            channel: smsSelected && whatsappSelected ? "sms+whatsapp" : smsSelected ? "sms" : whatsappSelected ? "whatsapp" : "",
            plate: city && rest ? `${city}-${rest}` : plate,
            phone: contactValue,
            name: nameValue
          })
          .select('id')
          .single();

        if (insertError) {
          throw insertError;
        }
        entryId = createdData.id;
      } else {
        entryId = existingData[0].id;
      }

      // Update the entry with form data
      const updateError = await supabase
        .from('signups')
        .update({
          plate: city && rest ? `${city}-${rest}` : plate,
          channel: smsSelected && whatsappSelected ? "sms+whatsapp" : smsSelected ? "sms" : whatsappSelected ? "whatsapp" : "",
          phone: contactValue,
          name: nameValue,
          signup_at: new Date().toISOString(),
          visited_at: new Date().toISOString(),
          status: 'joined_waiting_list'
        })
        .eq('id', entryId)
        .then(({ error }) => error);

      if (updateError) {
        throw updateError;
      }

      // Update status to joined+feedback
      const feedbackError = await supabase
        .from('signups')
        .update({
          status: 'joined+feedback'
        })
        .eq('id', entryId)
        .then(({ error }) => error);

      if (feedbackError) {
        throw feedbackError;
      }

      setSuccess(true);
      window.scrollTo(0, 0);
      // Clear form data from localStorage after successful submission
      const formData = new FormData();
      formData.append('plate', plate);
      formData.append('city', city);
      formData.append('rest', rest);
      formData.append('contactValue', contactValue);
      formData.append('nameValue', nameValue);
      formData.append('smsSelected', smsSelected ? 'true' : 'false');
      formData.append('whatsappSelected', whatsappSelected ? 'true' : 'false');
      formData.append('benefit', JSON.stringify(benefit));
      formData.append('benefitOther', benefitOther);
      saveFormData(formData);

    } catch (error) {
      console.error('Error updating form data:', error);
      setError("Irgendwas lief schief. Bitte versuch es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Pre-Submit-Ansicht (Formular, Hinweise etc.) ---
  const PreSubmitContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-2 mt-[-12px] mb-4">
        <div className="flex flex-row items-center gap-5">
          <Check className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Trage dein Kennzeichen und deine Kontaktdaten ein.</span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <Bell className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Wir können dich 15 Minuten vor Ablauf deiner Gratis-Parkzeit erinnern.</span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <PartyPopper className="text-[#5046e8]" size={24} />
          <span className="text-base font-medium text-muted-foreground text-left w-full block">Du kannst rechtzeitig vom Parkplatz fahren und Strafzettel vermeiden!</span>
        </div>
      </div>
      <label htmlFor="plate" className="block text-base font-semibold mb-2">
        Kennzeichen
      </label>
      <div className="flex justify-center">
        <LicensePlateInput
          id="plate"
          value={plate}
          onChange={e => setPlate(e.target.value)}
          className="w-full mb-2"
          required
        />
      </div>
      <label htmlFor="name" className="block text-base font-semibold mt-[-12px] mb-2">
        Name
      </label>
      <Input
        id="name"
        type="text"
        placeholder="z.B. Max Mustermann"
        value={nameValue}
        onChange={e => setNameValue(e.target.value)}
        className="w-full mb-2"
        autoComplete="name"
      />
      <label htmlFor="contact" className="block text-base  font-semibold mb-2">
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
          onClick={() => setSmsSelected((v: boolean) => !v)}
          className={
            (smsSelected
              ? "bg-[#5046e8] border-2 border-[#5046e8] text-white"
              : "bg-white border-2 border-black text-black") +
            " flex-1 min-w-0 px-3 py-2 rounded-full font-semibold"
          }
        >
          <Mail
            className={`inline mr-1 align-text-bottom text-${smsSelected ? 'white' : 'black'}`}
            size={18}
          />
          SMS
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setWhatsappSelected((v: boolean) => !v)}
          className={
            (whatsappSelected
              ? "bg-[#5046e8] border-2 border-[#5046e8] text-white"
              : "bg-white border-2 border-black text-black") +
            " flex-1 min-w-0 px-3 py-2 rounded-full font-semibold"
          }
        >
          <FaWhatsapp
            className="inline mr-1 text-lg align-text-bottom font-semibold"
            size={20}
            color={whatsappSelected ? "white" : "black"}
          />
          WhatsApp
        </Button>
      </div>
      <div className="flex items-center space-x-3 mt-5 mb-6">
        <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={val => setAcceptedTerms(!!val)} />
        <Label htmlFor="terms">Ich akzeptiere die <a href="/datenschutz" className="underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a><span className="text-red-600 ml-1">*</span></Label>
      </div>
      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/80 font-semibold"
        disabled={submitting}
      >
        {submitting ? "Wird gesendet..." : "Zur Warteliste anmelden"}
      </Button>
      <div className="text-xs text-left text-yellow-700 bg-yellow-50 rounded px-3 py-2 mt-0">
        <strong>Hinweis:</strong> Der Service ist aktuell in der Testphase, in der wir nur das Interesse an dem Service messen. Es werden noch keine Erinnerungen verschickt. Wir informieren dich, sobald es Neuigkeiten gibt. Deine Daten verwenden wir ausschließlich für diesen Test. Mehr dazu in unserer <a href="/datenschutz" className="underline" target="_blank">Datenschutzerklärung</a>.
      </div>
    </form>
  );

  // --- Post-Submit-Ansicht (Success, Feedback etc.) ---
  const PostSubmitContent = (
    <div className="text-black text-left font-semibold py-4">
      <div className="text-2xl mb-2">🎉 Du stehst auf der Warteliste!</div>
        
      <div className="text-base font-normal mb-2">
        Wir benachrichtigen dich, sobald der Service zu den Erinnerungen bereit ist.
      </div>
      <div className="border-b border-gray-300 my-4"></div>
      <div className="mt-4 space-y-6">
        {/* 1. Main benefit */}
        <div>
          <div className="font-base font-semibold mb-2">
            Wie würde dir dieser Service am meisten helfen?
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 mt-2">
              <Checkbox id="benefit-stress" checked={benefit.includes('stress')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'stress'] : v.filter((b: string) => b !== 'stress'))} />
              <label htmlFor="benefit-stress" className="text-base font-medium  leading-none">Weniger Stress beim Einkaufen</label>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Checkbox id="benefit-fee" checked={benefit.includes('fee')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'fee'] : v.filter((b: string) => b !== 'fee'))} />
              <label htmlFor="benefit-fee" className="text-base font-medium leading-none">Keine Strafzettel mehr</label>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Checkbox id="benefit-shopping" checked={benefit.includes('shopping')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'shopping'] : v.filter( (b: string) => b !== 'shopping'))} />
              <label htmlFor="benefit-shopping" className="text-base font-medium leading-none">Mehr Zeit zum Einkaufen</label>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Checkbox id="benefit-other" checked={benefit.includes('other')} onCheckedChange={checked => setBenefit(v => checked ? [...v, 'other'] : v.filter((b: string) => b !== 'other'))} />
              <label htmlFor="benefit-other" className="text-base font-medium leading-none">Etwas anderes …</label>
            </div>
            {benefit.includes('other') && (
              <Input
                type="text"
                placeholder="Gib hier deinen eigenen Vorteil ein …"
                value={benefitOther}
                onChange={e => setBenefitOther(e.target.value)}
                className="w-full mt-2 text-sm font-normal"
              />
            )}
          </div>
        </div>
        {/* 2. Reminder lead time */}
        <div>
          <div className="font-base font-semibold mb-5">
         <span className="font-semibold">Wann möchtest du erinnert werden?</span> <span className="font-normal">(Minuten vor Ablauf der Gratis-Parkzeit)</span>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-9/10 flex flex-col items-center mb-0">
              <SliderMarksDemo
                defaultValue={[reminderLabels.indexOf(reminderLabel)]}
                max={reminderLabels.length - 1}
                step={1}
                value={[reminderLabels.indexOf(reminderLabel)]}
                onValueChange={vals => setReminderLabel(reminderLabels[vals[0]])}
                labels={reminderLabels}
              />
            </div>
          </div>
        </div>
        {/* 3. Monthly subscription willingness */}
        <div>
          <div className="font-base mb-5">
          <span className="font-semibold"> Was wäre dir das Feature im Monat wert,</span> <span className="font-normal">wenn du dir dadurch mehrere Strafzettel (je 40€) sparst?</span></div>
          <div className="w-full flex justify-center">
          <div className="w-9/10 flex flex-col items-center mb-4">
              <SliderMarksDemo
                defaultValue={[monthlyLabels.indexOf(monthlyLabel)]}
                max={monthlyLabels.length - 1}
                step={1}
                value={[monthlyLabels.indexOf(monthlyLabel)]}
                onValueChange={vals => setMonthlyLabel(monthlyLabels[vals[0]])}
                labels={monthlyLabels}
              />
          </div>
        </div>
        {/* 4. Pay-per-use willingness */}
        <div>
          <div className="font-base mb-5">
          <span className="font-semibold">Oder lieber pro Erinnerung zahlen?</span> <span className="font-normal">Was wäre ein fairer Preis pro Erinnerung?</span>
          </div>
          <div className="w-full flex justify-center">
          <div className="w-9/10 flex flex-col items-center">
              <SliderMarksDemo
                defaultValue={[perUseLabels.indexOf(perUseLabel)]}
                max={perUseLabels.length - 1}
                step={1}
                value={[perUseLabels.indexOf(perUseLabel)]}
                onValueChange={vals => setPerUseLabel(perUseLabels[vals[0]])}
                labels={perUseLabels}
              />
          </div>
        </div>
        
        {/* Save Button */}
        <Button
          type="button"
          className="w-full bg-[#5046e8] hover:bg-[#5046e8] rounded-full text-base font-semibold mt-8"
          onClick={async () => {
            setSaving(true);
            setSaveSuccess(false);
            setSaveError(null);
            try {
              const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  monthlyValue: monthlyLabel,
                  perUseValue: perUseLabel,
                  reminderLead: reminderLabel,
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
        </Button>
        {saveSuccess && <div className="text-green-600 text-center mt-2">Antworten gespeichert!</div>}
        {saveError && <div className="text-red-600 text-center mt-2">{saveError}</div>}
      </div>
    </div>
    </div>
    </div>
  );

  return (
    <main className="flex min-h-screen bg-background pt-0">
      <div className="flex flex-col items-center w-full mt-0">
        <Card className="w-full max-w-lg mb-4 py-0">
          {!success && (
            <CardHeader className="pt-2">
              
              <CardTitle className="text-2xl text-left mb-0">
                So funktioniert der Service:
              </CardTitle>
            </CardHeader>
          )}
          <CardContent>
            {success ? PostSubmitContent : PreSubmitContent}
            {!success && (
            <Accordion type="single" collapsible className="w-full mt-4 mb-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base text-left">
                    <span className="flex flex-col flex-1">
                      <span className="text-sm font-medium">
                        Wie funktioniert das Scannersystem auf diesem Parkplatz?
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
                          src="/Supervision-Rendering.jpg"
                          alt="Parkplatz-Überwachungssystem"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            <div className="text-left mt-2">
              <p className="text-sm text-muted-foreground">
                Möchtest du mehr über Wemolo und unser System erfahren? Besuche uns auf <a href="https://www.wemolo.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">wemolo.com</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
