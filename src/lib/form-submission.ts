const recipientEmail = "josephmulwa8055@gmail.com";
const formspreeEndpoint = "https://formspree.io/f/xeedowrv";

type SubmitFormOptions = {
    subject: string;
    pdfTitle: string;
    filePrefix: string;
};

type PdfEntry = {
    label: string;
    value: string;
};

export async function submitFormToEmail(form: HTMLFormElement, options: SubmitFormOptions) {
    const entries = getFormEntries(form);
    const pdf = createPdf(options.pdfTitle, entries);
    const pdfFile = new File([pdf], `${options.filePrefix}-${Date.now()}.pdf`, {
        type: "application/pdf",
    });

    const payload = new FormData();
    payload.append("subject", options.subject);
    payload.append("email", findEntryValue(entries, "email"));
    payload.append("attachment", pdfFile);

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

    const result = (await response.json()) as { success?: boolean | string; message?: string };
    if (result.success === false || result.success === "false") {
        throw new Error(result.message || "The form could not be sent. Please try again.");
    }

    return result;
}

function getFormEntries(form: HTMLFormElement): PdfEntry[] {
    return Array.from(new FormData(form).entries())
        .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
        .map(([label, value]) => ({
            label: toDisplayLabel(label),
            value: String(value).trim(),
        }));
}

function findEntryValue(entries: PdfEntry[], key: string) {
    return entries.find((entry) => entry.label.toLowerCase() === key)?.value || recipientEmail;
}

function createPdf(title: string, entries: PdfEntry[]) {
    const pages = paginatePdfLines([
        { text: title, size: 22 },
        { text: `Submitted: ${new Date().toLocaleString()}`, size: 10 },
        { text: "", size: 8 },
        ...entries.flatMap((entry) => [
            { text: entry.label.toUpperCase(), size: 9 },
            ...wrapText(entry.value, 86).map((line) => ({ text: line, size: 11 })),
            { text: "", size: 7 },
        ]),
    ]);

    const fontId = pages.length * 2 + 3;
    const objects: string[] = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        `<< /Type /Pages /Kids ${pages.map((_, index) => `${index * 2 + 3} 0 R`).join(" ")} /Count ${pages.length} >>`,
    ];

    pages.forEach((page, index) => {
        const pageId = index * 2 + 3;
        const contentId = pageId + 1;
        const stream = page
            .map(({ text, size, x, y }) => `BT /F1 ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`)
            .join("\n");

        objects.push(
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`,
            `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
        );
    });

    objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    objects.forEach((object, index) => {
        offsets.push(pdf.length);
        pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });

    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    offsets.slice(1).forEach((offset) => {
        pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    return new Blob([pdf], { type: "application/pdf" });
}

function paginatePdfLines(lines: Array<{ text: string; size: number }>) {
    const pages: Array<Array<{ text: string; size: number; x: number; y: number }>> = [[]];
    let y = 790;

    lines.forEach((line) => {
        const lineHeight = line.size + 7;
        if (y < 64) {
            pages.push([]);
            y = 790;
        }

        pages[pages.length - 1].push({
            ...line,
            x: 48,
            y,
        });
        y -= line.text ? lineHeight : 12;
    });

    return pages;
}

function wrapText(value: string, maxLength: number) {
    return value
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .flatMap((paragraph) => wrapParagraph(paragraph, maxLength));
}

function wrapParagraph(value: string, maxLength: number) {
    const words = sanitizePdfText(value).split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let line = "";

    words.forEach((word) => {
        if (word.length > maxLength) {
            if (line) {
                lines.push(line);
                line = "";
            }
            for (let index = 0; index < word.length; index += maxLength) {
                lines.push(word.slice(index, index + maxLength));
            }
            return;
        }

        const nextLine = line ? `${line} ${word}` : word;
        if (nextLine.length > maxLength) {
            lines.push(line);
            line = word;
        } else {
            line = nextLine;
        }
    });

    if (line) {
        lines.push(line);
    }

    return lines.length ? lines : [""];
}

function escapePdfText(value: string) {
    return sanitizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function sanitizePdfText(value: string) {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[–—]/g, "-")
        .replace(/[^\x20-\x7E]/g, "?");
}

function toDisplayLabel(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
