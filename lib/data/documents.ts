export type DownloadFile = {
  name: string
  url: string
}

const signInFiles: DownloadFile[] = [
  {
    name: "Fiche d'inscription",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Inscription%2FFiche%20d'inscription%202025-2026.doc?alt=media&token=d4659621-fb9d-4fcb-91f4-9ca12e6be47f",
  },
  {
    name: "Formulaire de droit à l'image",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Inscription%2FFormulaire%20droit%20a%20l'image%202025-2026.doc?alt=media&token=092ba9ba-1bc5-4be8-9a4b-583f602af2a4",
  },
  {
    name: "Modalités de règlement",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Inscription%2FModalite%CC%81s%20de%20Re%CC%80glement%202025-2026.docx?alt=media&token=d11e0413-a96e-4616-bd70-f66e4235752c",
  },
  {
    name: "Conditions d'inscription",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Inscription%2FConditions%20inscription%20%202025-2026.doc?alt=media&token=9cd377fd-31e1-4325-83cd-904c5eb9e019",
  },
  {
    name: "RIB de l'association",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/21%20RIB%20CREDIT%20MUTUEL.pdf?alt=media&token=ccc2548e-2785-4f88-9dd1-7106735dc41b",
  },
]

const dateFiles: DownloadFile[] = [
  {
    name: "Planning des répétitions / cours",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Inscription%2F2025-2026%20Calendrier%20des%20salles.pdf?alt=media&token=4d4d94a8-4d4b-4e8e-a664-8d5e96f1e873",
  },
]

const theaterFiles: DownloadFile[] = [
  {
    name: "Bonheur en famille - 1ère partie",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Bonheur%20en%20famille%20V5%20premiere%20partie.docx?alt=media&token=1fadc473-b02a-416c-bc69-637697fd8108",
  },
  {
    name: "Bonheur en famille - 2ème partie",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Bonheur%20en%20famille%20V5%202DE%20partie.docx?alt=media&token=d3b76615-9a4d-4522-8b16-6c7f12a04f6a",
  },
  {
    name: "Le Bal Givré",
    url: "https://firebasestorage.googleapis.com/v0/b/chup-s.appspot.com/o/Le%20bal%20givre%CC%81%20TEXTE%20et%20CHANSONS.pdf?alt=media&token=238ab86d-26fa-4e7b-96ea-0603ec94d862",
  },
]

export { theaterFiles, dateFiles, signInFiles }
