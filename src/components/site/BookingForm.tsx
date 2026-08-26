'use client';

import { useId, useMemo, useState, useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/lib/cn';

type BookingMode = 'Taxi Bestellung' | 'Preisanfrage';

type BookingFormState = {
  mode: BookingMode;
  date: string;
  time: string;
  passengers: string;
  from: string;
  to: string;
  name: string;
  email: string;
  phone: string;
  wheelchair: boolean;
  childSeat: boolean;
  message: string;
  dsgvo: boolean;
  website: string; // honeypot
};

const passengerOptions = [
  { value: '1-4', label: 'Ein Taxi für 1 bis 4 Personen' },
  { value: '1-6', label: 'Ein Großraumtaxi für 1-6 Personen' },
  { value: '7-12', label: 'Taxis für 7 bis 12 Personen' },
  { value: '12-22', label: 'Taxis für 12 bis 22 Personen' },
  { value: '23-27', label: 'Taxis für 23-27 Personen' },
] as const;

function todayDE() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}

function nowHHMM() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function BookingForm() {
  const formId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { status: 'idle' }
    | { status: 'success' }
    | { status: 'error'; message: string }
  >({ status: 'idle' });

  const [state, setState] = useState<BookingFormState>({
    mode: 'Taxi Bestellung',
    date: '',
    time: '',
    passengers: passengerOptions[0].value,
    from: '',
    to: '',
    name: '',
    email: '',
    phone: '',
    wheelchair: false,
    childSeat: false,
    message: '',
    dsgvo: false,
    website: '',
  });

  // Set default date/time only on client to avoid hydration mismatch
  useEffect(() => {
    if (!state.date && !state.time) {
      setState((prev) => ({
        ...prev,
        date: todayDE(),
        time: nowHHMM(),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof BookingFormState, string>> = {};
    if (!state.date.trim()) e.date = 'Bitte Datum angeben.';
    if (!state.time.trim()) e.time = 'Bitte Uhrzeit angeben.';
    if (!state.passengers.trim()) e.passengers = 'Bitte Personenanzahl auswählen.';
    if (!state.from.trim()) e.from = 'Bitte Abholort angeben.';
    if (!state.to.trim()) e.to = 'Bitte Zielort angeben.';
    if (!state.name.trim()) e.name = 'Bitte Name angeben.';
    if (!state.email.trim()) {
      e.email = 'Bitte E-Mail angeben.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      e.email = 'Bitte gültige E-Mail angeben.';
    }
    if (!state.phone.trim()) e.phone = 'Bitte Telefonnummer angeben.';
    if (!state.dsgvo) e.dsgvo = 'Bitte Datenschutz akzeptieren.';
    return e;
  }, [state]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult({ status: 'idle' });

    // Honeypot: bots fill this, humans shouldn't.
    if (state.website.trim()) {
      setResult({ status: 'success' });
      return;
    }

    if (!canSubmit) {
      setResult({
        status: 'error',
        message: 'Bitte prüfen Sie die Pflichtfelder.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || data.ok === false) {
        throw new Error(data.message || 'Senden fehlgeschlagen.');
      }
      setResult({ status: 'success' });
      setState((s) => ({
        ...s,
        from: '',
        to: '',
        name: '',
        email: '',
        phone: '',
        wheelchair: false,
        childSeat: false,
        message: '',
        dsgvo: false,
        website: '',
      }));
    } catch (err) {
      setResult({
        status: 'error',
        message: err instanceof Error ? err.message : 'Senden fehlgeschlagen.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      id="bestellen"
      aria-labelledby={`${formId}-title`}
      className="space-y-6"
      onSubmit={onSubmit}
    >
      {/* Mode Selection - Yellow Theme */}
      <div className="flex flex-wrap gap-3">
        {(['Taxi Bestellung', 'Preisanfrage'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setState((s) => ({ ...s, mode }))}
            className={cn(
              'flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200',
              state.mode === mode
                ? 'bg-taxi-500 text-night-900 shadow-button'
                : 'bg-night-100 text-night-600 hover:bg-taxi-100 hover:text-night-900'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Date & Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Datum"
          type="text"
          value={state.date}
          onChange={(e) => setState((s) => ({ ...s, date: e.target.value }))}
          placeholder={todayDE()}
          inputMode="numeric"
          required
          error={errors.date}
        />
        <Input
          label="Uhrzeit"
          type="text"
          value={state.time}
          onChange={(e) => setState((s) => ({ ...s, time: e.target.value }))}
          placeholder={nowHHMM()}
          inputMode="numeric"
          required
          error={errors.time}
        />
      </div>

      {/* Passengers */}
      <Select
        label="Anzahl Personen"
        value={state.passengers}
        onChange={(e) => setState((s) => ({ ...s, passengers: e.target.value }))}
        required
        error={errors.passengers}
        hint='Mehr? Bitte in "Nachricht" angeben.'
      >
        {passengerOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>

      {/* Route */}
      <div className="space-y-4">
        <Input
          label="Von"
          value={state.from}
          onChange={(e) => setState((s) => ({ ...s, from: e.target.value }))}
          placeholder="Abholort eingeben"
          required
          error={errors.from}
        />
        <Input
          label="Nach"
          value={state.to}
          onChange={(e) => setState((s) => ({ ...s, to: e.target.value }))}
          placeholder="Zielort eingeben"
          required
          error={errors.to}
        />
      </div>

      {/* Contact Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="Ihr Name"
          required
          error={errors.name}
        />
        <Input
          label="E-Mail"
          type="email"
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          placeholder="name@example.com"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <Input
        label="Telefon"
        type="tel"
        value={state.phone}
        onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
        placeholder="+49 ..."
        autoComplete="tel"
        required
        error={errors.phone}
      />

      {/* Options - Yellow Theme */}
      <div className="rounded-xl border-2 border-taxi-200 bg-taxi-50 p-4">
        <div className="mb-3 text-xs font-black uppercase tracking-wider text-night-700">
          Zusätzliche Optionen
        </div>
        <div className="flex flex-wrap gap-6">
          <Checkbox
            checked={state.wheelchair}
            onChange={(e) => setState((s) => ({ ...s, wheelchair: e.target.checked }))}
            label="Rollstuhltransport"
          />
          <Checkbox
            checked={state.childSeat}
            onChange={(e) => setState((s) => ({ ...s, childSeat: e.target.checked }))}
            label="Kindersitz benötigt"
          />
        </div>
      </div>

      {/* Message */}
      <Textarea
        label="Nachricht (optional)"
        value={state.message}
        onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
        placeholder="Details: Flugnummer, Gepäck, Abholpunkt ..."
        rows={4}
      />

      {/* Honeypot */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        value={state.website}
        onChange={(e) => setState((s) => ({ ...s, website: e.target.value }))}
      />

      {/* Privacy */}
      <Checkbox
        checked={state.dsgvo}
        onChange={(e) => setState((s) => ({ ...s, dsgvo: e.target.checked }))}
        required
        error={errors.dsgvo}
        label={
          <span>
            Ich habe die{' '}
            <a className="font-bold text-taxi-700 underline transition-colors hover:text-taxi-600" href="/datenschutz">
              Datenschutzerklärung
            </a>{' '}
            gelesen und akzeptiere die Verarbeitung meiner Angaben.
          </span>
        }
      />

      {/* Submit */}
      <Button type="submit" disabled={!canSubmit} className="w-full">
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Senden...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Anfrage senden
          </span>
        )}
      </Button>

      {/* Result Messages */}
      {result.status === 'success' && (
        <div className="flex items-start gap-3 rounded-xl border border-success/30 bg-green-50 p-4 text-sm animate-fade-in">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-success">Erfolgreich gesendet!</div>
            <div className="mt-1 text-night-700">
              Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
            </div>
          </div>
        </div>
      )}

      {result.status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-error/30 bg-red-50 p-4 text-sm animate-fade-in">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-error text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-error">Fehler</div>
            <div className="mt-1 text-night-700">{result.message}</div>
          </div>
        </div>
      )}
    </form>
  );
}
