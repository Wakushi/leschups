import LoginForm from "@/components/shared/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-main pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="title mb-6">Connexion</h1>
          <p className="subtitle">
            Connectez-vous pour accéder à votre espace personnel
          </p>
        </div>

        <div className="max-w-md mx-auto shadow-xl p-8 md:p-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-emerald-100/20">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
