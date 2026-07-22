import "server-only";
import type { SubmissionFormValues } from "@/lib/submissionSchema";

const CATEGORY_LABELS: Record<string, string> = {
  business: "Бизнес",
  medicine: "Медицина",
  education: "Образование",
  government: "Госсектор",
  other: "Другое",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMessage(data: SubmissionFormValues) {
  const lines = [
    "🆕 <b>Новое обращение</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
  ];

  if (data.company) {
    lines.push(`<b>Компания:</b> ${escapeHtml(data.company)}`);
  }

  lines.push(
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Email:</b> ${escapeHtml(data.email)}`
  );

  if (data.category) {
    lines.push(
      `<b>Сфера:</b> ${escapeHtml(CATEGORY_LABELS[data.category] ?? data.category)}`
    );
  }

  lines.push(
    "",
    `<b>Проблема:</b>\n${escapeHtml(data.problemDescription)}`
  );

  if (data.proposedSolution) {
    lines.push("", `<b>Предложение:</b>\n${escapeHtml(data.proposedSolution)}`);
  }

  lines.push("", `<i>Язык формы: ${data.language.toUpperCase()}</i>`);

  return lines.join("\n");
}

/**
 * Best-effort Telegram notification. Never throws — a failed notification
 * must not stop the submission from being saved/acknowledged.
 */
export async function notifyTelegram(data: SubmissionFormValues) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatMessage(data),
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      console.error("Telegram notify failed:", await response.text());
    }
  } catch (err) {
    console.error("Telegram notify error:", err);
  }
}
