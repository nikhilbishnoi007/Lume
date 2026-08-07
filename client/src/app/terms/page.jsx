import React from 'react'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By creating an account or using Lume, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the platform.'
  },
  {
    title: '2. Account Eligibility',
    content: 'You must provide accurate information when creating an account and are responsible for maintaining the confidentiality of your login credentials. You are responsible for all activity that occurs under your account.'
  },
  {
    title: '3. User Content',
    content: 'You retain ownership of the photos and captions you post on Lume. By posting content, you grant us a non-exclusive, worldwide license to display, distribute, and promote that content within the platform. You are solely responsible for the content you upload.'
  },
  {
    title: '4. Prohibited Conduct',
    content: 'You agree not to post content that is illegal, harmful, harassing, or infringes on others\' rights. We reserve the right to remove content or suspend accounts that violate these terms.'
  },
  {
    title: '5. Intellectual Property',
    content: 'The Lume name, logo, and platform design are the property of Lume and may not be used without permission. This does not apply to content you personally upload.'
  },
  {
    title: '6. Termination',
    content: 'We may suspend or terminate your account at our discretion if you violate these terms. You may also delete your account at any time from your profile settings.'
  },
  {
    title: '7. Limitation of Liability',
    content: 'Lume is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.'
  },
  {
    title: '8. Changes to Terms',
    content: 'We may update these Terms of Service from time to time. Continued use of Lume after changes are posted constitutes your acceptance of the revised terms.'
  },
]

const Page = () => {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 md:px-10 md:py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-10">

        <h1 className="text-center font-bold text-2xl pb-2 border-b-2 border-zinc-200 mb-6">
          Terms of Service
        </h1>

        <p className="text-sm text-zinc-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-zinc-700 mb-2">{section.title}</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Page