import React from 'react'

const Page = () => {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 md:px-10 md:py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-10">

        <h1 className="text-center font-bold text-2xl pb-2 border-b-2 border-zinc-200 mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-zinc-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex flex-col gap-6">

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">1. Information We Collect</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              When you use Lume, we collect information you provide directly — such as your name, email address, profile photo, and the photos or captions you post. We also collect basic usage data like login activity and device information to keep the platform secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">2. How We Use Your Information</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We use your information to operate and improve Lume — displaying your posts to other users, personalizing your feed, and communicating important account updates. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">3. Sharing of Content</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Photos and captions you post are visible to other users as part of the Explore feed, in line with your account&apos;s visibility settings. You control what you share and can delete your posts at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">4. Cookies</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Lume uses cookies to keep you logged in and to remember your preferences. You can disable cookies in your browser settings, though this may affect some features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">5. Data Security</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We take reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">6. Your Rights</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              You can access, update, or delete your account information at any time from your profile settings. For any privacy-related requests, you can contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-700 mb-2">7. Contact Us</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              If you have questions about this Privacy Policy, reach out to us at{' '}
              <span className="text-blue-600">support@lume.app</span>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}

export default Page