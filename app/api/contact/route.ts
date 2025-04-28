import { sendMail } from "../(services)/mail.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, message, name, subject } = body

    if (!name || !email || !message || !subject) {
      throw new Error("Missing required fields")
    }

    const emailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message de contact</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .header {
            background-color: #047857;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: white;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 8px 8px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: 600;
            color: #047857;
            margin-bottom: 5px;
          }
          .value {
            background-color: #f8fafc;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
          }
          .message {
            white-space: pre-wrap;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Nouveau message de contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Date</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
            <div class="field">
              <div class="label">Nom</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Sujet</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message">${message}</div>
            </div>
          </div>
          <div class="footer">
            Ce message a été envoyé via le formulaire de contact des Chups
          </div>
        </div>
      </body>
    </html>
    `

    await sendMail(
      process.env.DESTINATION_CONTACT_EMAIL as string,
      `Formulaire de contact: ${subject}`,
      emailContent
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error })
  }
}
