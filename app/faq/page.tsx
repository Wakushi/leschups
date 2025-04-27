"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Qui sont les Chup's ?",
    answer:
      "Les Chup's sont une troupe de comédie musicale basée à Marly dans le Val d'Oise. Passionnés par les arts de la scène, ils allient danse, chant, musique et théâtre pour offrir des spectacles uniques et captivants.",
  },
  {
    question: "Dans quelles villes vous produisez-vous ?",
    answer:
      "Nous nous produisons principalement dans les villes autour de Marly dans le Val d'Oise, mais nous sommes ouverts à des invitations d'autres régions. Consultez notre calendrier sur notre site pour connaître nos prochaines dates.",
  },
  {
    question: "Comment puis-je acheter des billets pour un spectacle ?",
    answer:
      "Vous pouvez réserver par mail (leschups@outlook.fr) ou par téléphone au 06 11 84 60 05. Il est également possible d'acheter vos billets sur place, cependant nous vous recommandons de réserver à l'avance car nos spectacles sont souvent complets.",
  },
  {
    question: "Faites-vous des spectacles adaptés aux enfants ?",
    answer:
      "Oui, nous proposons des spectacles adaptés pour toute la famille, y compris les plus jeunes.",
  },
  {
    question: "Puis-je rejoindre la troupe ?",
    answer:
      "Nous sommes toujours à la recherche de nouveaux talents ! Si vous avez une passion pour la danse, le chant, la musique ou le théâtre, n'hésitez pas à nous envoyer votre candidature.",
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-emerald-700 pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="title mb-6">Questions Fréquentes</h1>
          <p className="subtitle">
            Trouvez des réponses à vos questions sur la troupe des Chup's
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm max-w-3xl mx-auto rounded-2xl shadow-xl p-8 md:p-12 border border-emerald-100/20">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/50 rounded-lg border border-emerald-100/20 drop-shadow-lg"
              >
                <AccordionTrigger className="px-4 md:px-6 text-base md:text-lg font-medium text-emerald-800">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 text-sm md:text-base text-emerald-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center space-y-4 text-emerald-700 text-sm md:text-base">
            <p>
              Nous espérons que cette FAQ répond à vos questions. Si ce n'est
              pas le cas, n'hésitez pas à nous contacter.
            </p>
            <p>Au plaisir de vous voir lors de l'un de nos spectacles !</p>
          </div>
        </div>
      </div>
    </div>
  )
}
