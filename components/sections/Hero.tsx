export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4 items-center">
        
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Create a Job-Winning CV
          </h1>
          <p className="mb-6">
            Build modern resumes in minutes.
          </p>
          <button className="bg-white text-primary px-6 py-3 rounded-md">
            Build My CV
          </button>
        </div>

        <div>
          <img
            src="/images/resume.webp"
            alt="CV Preview"
            className="rounded-md shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}