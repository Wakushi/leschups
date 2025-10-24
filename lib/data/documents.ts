export type DownloadFile = {
  name: string
  url: string
}

const signInFiles: DownloadFile[] = [
  {
    name: "Fiche d'inscription",
    url: "/documents/fiche-inscription.doc",
  },
  {
    name: "Formulaire de droit à l'image",
    url: "/documents/formulaire-droit-a-l-image.doc",
  },
  {
    name: "Modalités de règlement",
    url: "/documents/modalites-de-reglement.docx",
  },
  {
    name: "Conditions d'inscription",
    url: "/documents/conditions-inscription.doc",
  },
  {
    name: "RIB de l'association",
    url: "/documents/rib.pdf",
  },
]

const dateFiles: DownloadFile[] = [
  {
    name: "Planning des répétitions / cours",
    url: "/documents/calendrier.pdf",
  },
]

const theaterFiles: DownloadFile[] = [
  {
    name: "Bonheur en famille (Édition Survilliers)",
    url: "/documents/bonheur-en-famille-survilliers.docx",
  },
  {
    name: "Le Bal Givré",
    url: "/documents/bal-givre.docx",
  },
]

export { theaterFiles, dateFiles, signInFiles }
