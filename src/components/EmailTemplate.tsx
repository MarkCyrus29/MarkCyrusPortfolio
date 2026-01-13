export interface EmailTemplateProps {
  firstName: string;
  email: string;
  message: string;
  captchaToken: string;
}

export function emailTemplateHTML({
  firstName,
  email,
  message,
}: EmailTemplateProps) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa; padding: 32px;">
    <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
      
      <h1 style="font-size: 20px; margin-bottom: 16px; color: #111827;">
        📩 New Message from ${escapeHTML(firstName)}
      </h1>

      <div style="margin-bottom: 12px;">
        <strong>Email:</strong>
        <p style="margin: 4px 0; color: #374151;">
          ${escapeHTML(email)}
        </p>
      </div>

      <div>
        <strong>Message:</strong>
        <p style="margin-top: 8px; white-space: pre-line; line-height: 1.5; color: #374151;">
          ${escapeHTML(message)}
        </p>
      </div>

    </div>
  </div>
  `;
}

// ✅ Prevents HTML injection
function escapeHTML(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
