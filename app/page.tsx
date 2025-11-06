import MeasurementForm from "@/components/measurement-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-3 py-6 md:px-4 md:py-12">
        <header className="mb-6 md:mb-12 text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-[#D4A017] text-balance">Замерщик</h1>
        </header>
        <MeasurementForm />
      </div>
    </main>
  )
}
