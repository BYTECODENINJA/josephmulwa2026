const recipientEmail = "josephmulwa8055@gmail.com";
const formspreeEndpoint = "https://formspree.io/f/xeedowrv";

type SubmitFormOptions = {
    subject: string;
};

type FormEntry = {
    label: string;
    value: string;
};

export async function submitFormToEmail(form: HTMLFormElement, options: SubmitFormOptions) {
    const entries = getFormEntries(form);
    const payload = new FormData();

    payload.append("subject", options.subject);
    payload.append("email", findEntryValue(entries, "email"));

    entries.forEach(({ label, value }) => {
        payload.append(label, value);
    });

    const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: payload,
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("The form could not be sent. Please try again.");
    }

    const result = (await response.json()) as { ok?: boolean; errors?: unknown[] };
    if (result.ok === false || result.errors?.length) {
        throw new Error("The form could not be sent. Please try again.");
    }

    return result;
}

function getFormEntries(form: HTMLFormElement): FormEntry[] {
    return Array.from(new FormData(form).entries())
        .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
        .map(([label, value]) => ({
            label: toDisplayLabel(label),
            value: String(value).trim(),
        }));
}

function findEntryValue(entries: FormEntry[], key: string) {
    return entries.find((entry) => entry.label.toLowerCase() === key)?.value || recipientEmail;
}

function toDisplayLabel(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
