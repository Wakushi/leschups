import ContactForm from "@/components/shared/contact/contact-form"
import { FaPhoneAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import Link from "next/link"
import Copy from "@/components/shared/copy"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-emerald-700 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="title mb-6">Contactez-nous</h1>
          <p className="subtitle">
            Une question ? Une suggestion ? N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white/10 h-fit backdrop-blur-sm rounded-2xl p-8 border border-emerald-100/20">
            <h2 className="text-2xl font-semibold text-emerald-50 mb-8">
              Nos coordonnées
            </h2>
            <div className="space-y-6">
              <div className="mb-2">
                <div className="flex items-center gap-2 text-xl">
                  <Link
                    href="tel:0611846005"
                    className="flex items-center gap-2 text-bold text-center drop-shadow-xl text-emerald-50 hover:text-emerald-100 transition-colors"
                  >
                    <FaPhoneAlt className="w-6 h-6" />
                    <span>06.11.84.60.05</span>
                  </Link>
                  <Copy contentToCopy="0611846005" />
                </div>
                <div className="flex items-center gap-2 text-xl mt-4">
                  <Link
                    href="mailto:leschups@outlook.fr"
                    className="flex items-center justify-center gap-2 text-bold text-center drop-shadow-xl text-emerald-50 hover:text-emerald-100 transition-colors"
                  >
                    <MdEmail className="w-6 h-6" />
                    <span>leschups@outlook.fr</span>
                  </Link>
                  <Copy contentToCopy="leschups@outlook.fr" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100/20">
            <h2 className="text-2xl font-semibold text-emerald-50 mb-8">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
