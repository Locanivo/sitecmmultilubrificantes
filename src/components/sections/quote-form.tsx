"use client";

import { ChevronDown, CircleAlert, Send } from "lucide-react";
import { useId, useState } from "react";
import { quote, services } from "@/content/content";
import { whatsappMessages } from "@/content/site";
import { trackWhatsappClick } from "@/lib/analytics";
import { whatsappHref } from "@/lib/links";
import { buttonClass } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { CurtainSection } from "@/components/ui/scroll-effects";
import { SectionHeading } from "@/components/ui/section-heading";

type Fields = { vehicle: string; year: string; engine: string; service: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { vehicle: "", year: "", engine: "", service: "", notes: "" };
const maxYear = new Date().getFullYear() + 1;
const serviceOptions = [...services.items.map((item) => item.title), quote.otherService];

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.service) errors.service = "Escolha o serviço desejado.";
  if (fields.vehicle.trim().length < 2) errors.vehicle = "Informe a marca e o modelo do veículo.";
  const year = Number(fields.year);
  if (!/^\d{4}$/.test(fields.year.trim()) || year < 1950 || year > maxYear) errors.year = "Informe o ano com 4 dígitos, ex.: 2018.";
  return errors;
}

/** Monta a mensagem do WhatsApp com os dados preenchidos (campos opcionais vazios são omitidos). */
function buildMessage(fields: Fields) {
  const details = [
    `*Serviço:* ${fields.service}`,
    `*Veículo:* ${fields.vehicle.trim()}`,
    `*Ano:* ${fields.year.trim()}`,
    fields.engine.trim() && `*Motorização:* ${fields.engine.trim()}`,
    fields.notes.trim() && `*Observações:* ${fields.notes.trim()}`,
  ].filter(Boolean);
  return `${whatsappMessages.geral}\n\n${details.join("\n")}`;
}

const inputClass =
  "mt-2 block w-full rounded-md border bg-paper px-4 py-3.5 text-base text-graphite placeholder:text-body/60 transition-[border-color,box-shadow] duration-200 focus:border-graphite focus:outline-none focus:ring-4 focus:ring-red/15";

function Field({
  label,
  optional,
  error,
  children,
  id,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-bold text-graphite">
        {label}
        {optional && <span className="text-xs font-medium text-body">Opcional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="mt-2 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-red">
          <CircleAlert aria-hidden="true" className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `${id}-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-erro` : undefined,
    className: `${inputClass} ${errors[key] ? "border-red" : "border-line"}`,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstError = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstError) {
      document.getElementById(`${id}-${firstError}`)?.focus();
      return;
    }
    trackWhatsappClick("formulario-orcamento", "geral");
    window.open(whatsappHref("geral", buildMessage(fields)), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <CurtainSection id="orcamento" aria-labelledby="orcamento-title" className="section relative overflow-hidden bg-graphite-2 text-paper">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
      <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="orcamento-title" tone="dark" eyebrow={quote.eyebrow} title={quote.title} text={quote.text} />
          <Reveal delay={0.1}>
            <ol className="mt-10 space-y-4">
              {quote.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-paper/15 font-display text-lg font-extrabold text-red-light">
                    {index + 1}
                  </span>
                  <span className="text-[0.9375rem] font-semibold text-paper/85">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form noValidate onSubmit={onSubmit} className="rounded-lg bg-paper p-6 text-graphite shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] sm:p-8 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id={`${id}-service`} label="Serviço desejado" error={errors.service}>
                  <div className="relative">
                    <select {...fieldProps("service")} required className={`${fieldProps("service").className} appearance-none pr-11`}>
                      <option value="" disabled>
                        Selecione o serviço
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-body" />
                  </div>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id={`${id}-vehicle`} label="Marca e modelo" error={errors.vehicle}>
                  <input {...fieldProps("vehicle")} type="text" autoComplete="off" placeholder="Ex.: Toyota Corolla" required />
                </Field>
              </div>
              <Field id={`${id}-year`} label="Ano" error={errors.year}>
                <input {...fieldProps("year")} type="text" inputMode="numeric" maxLength={4} placeholder="Ex.: 2019" required />
              </Field>
              <Field id={`${id}-engine`} label="Motorização" optional>
                <input {...fieldProps("engine")} type="text" placeholder="Ex.: 2.0 Flex" />
              </Field>
              <div className="sm:col-span-2">
                <Field id={`${id}-notes`} label="Observações" optional>
                  <textarea {...fieldProps("notes")} rows={3} placeholder="Algum detalhe que ajude nossa equipe" className={`${fieldProps("notes").className} resize-y`} />
                </Field>
              </div>
            </div>

            <button type="submit" className={buttonClass("red", "lg", "mt-7 w-full")}>
              <WhatsappIcon className="size-5" />
              {quote.submit}
              <Send aria-hidden="true" className="size-4 max-sm:hidden" />
            </button>

            <p aria-live="polite" className="mt-4 min-h-5 text-center text-[0.8125rem] text-body">
              {sent
                ? "Pronto! Abrimos o WhatsApp com a sua mensagem. É só enviar."
                : "Seus dados não ficam salvos no site: vão direto para a conversa no WhatsApp."}
            </p>
          </form>
        </Reveal>
      </div>
    </CurtainSection>
  );
}
