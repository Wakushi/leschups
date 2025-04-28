import { CONTACT_EMAIL } from "@/lib/constants"
import { ShowDate } from "@/types/show.type"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendMail(to: string, subject: string, template: string) {
  const mailOptions: Mail.Options = {
    from: CONTACT_EMAIL,
    to: to,
    subject,
    html: template,
  }

  const info = await transporter.sendMail(mailOptions)
  return info
}

export function getBookingTemplate({
  confirmationId,
  email,
  showDate,
  formattedDate,
  totalPrice,
}: {
  confirmationId: string
  email: string
  showDate: ShowDate
  formattedDate: string
  totalPrice: number
}): string {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/confirm-booking?id=${confirmationId}&email=${email}`

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de réservation</title>
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
            background-color: #d97706;
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
            color: #d97706;
            margin-bottom: 5px;
          }
          .value {
            background-color: #f8fafc;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
          }
          .button {
            display: inline-block;
            background-color: #d97706;
            color: #fff !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 500;
          }
          .button:hover {
            background-color: #b45309;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 0.875rem;
          }
          .note {
            background-color: #fef3c7;
            border: 1px solid #fcd34d;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Confirmation de réservation</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Nous vous confirmons la bonne réception de votre réservation pour le spectacle suivant :</p>
            
            <div class="field">
              <div class="label">Spectacle</div>
              <div class="value">${showDate.show.title}</div>
            </div>
            
            <div class="field">
              <div class="label">Date et heure</div>
              <div class="value">${formattedDate}</div>
            </div>
            
            <div class="field">
              <div class="label">Lieu</div>
              <div class="value">
                ${showDate.auditorium.name}<br>
                ${showDate.auditorium.city}<br>
                <a href="${showDate.auditorium.location_url}" style="color: #d97706;">Voir l'itinéraire</a>
              </div>
            </div>
            
            <div class="field">
              <div class="label">Montant total</div>
              <div class="value">${totalPrice}€</div>
            </div>

            <div class="note">
              <strong>Important :</strong> Le paiement des places se fera sur place le jour du spectacle, en espèces ou par chèque.
            </div>

            <p>Pour finaliser votre réservation, veuillez cliquer sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">Confirmer ma réservation</a>
            </div>

            <p>À bientôt,<br>La troupe de comédie musicale des Chups</p>
          </div>
          <div class="footer">
            Cet email a été envoyé automatiquement suite à votre réservation sur le site des Chups
          </div>
        </div>
      </body>
    </html>
  `
}
