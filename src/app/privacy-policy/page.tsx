"use client" // Add "use client" directive for using hooks

import { useRouter } from "next/navigation"; // Import useRouter
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  const router = useRouter(); // Initialize useRouter

  return (
    <div className="flex flex-col min-h-screen bg-background">

      <header className="flex items-center px-4 py-3 border-b h-14 bg-background/95 backdrop-blur">
        {/* Use Button onClick to navigate back */}
        <div className="flex items-center mr-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium ml-2">Privacy Policy</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">Korean Typing Privacy Policy</h1>
        {/* Updated date format placeholder */}
        <p className="text-sm text-gray-600 mb-8">Last Updated: [2025-04-01]</p>

        <div className="space-y-6 text-gray-800 leading-relaxed">
          <p>
            {/* Corrected line 31 */}
            Passyou (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) values your privacy and is committed to protecting your personal information in compliance with applicable privacy laws and regulations. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Korean Typing application (the &quot;Service&quot;).
          </p>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect and How We Collect It</h2>
            <p>We may collect the following types of personal information to provide and improve our Service:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="font-semibold">Information You Provide Directly:</strong>
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  {/* Updated examples */}
                  <li>Account Information: [Specify items collected at signup, e.g., Email address, Nickname, Information from linked SNS accounts (e.g., user identifier)]</li>
                  <li>Optional Information: [Specify optional info, e.g., Profile picture, Date of birth. Leave blank or remove if none.]</li>
                </ul>
              </li>
              <li>
                <strong className="font-semibold">Information Collected Automatically:</strong>
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  <li>Service Usage Data: Typing practice records (speed, accuracy, practice content, etc.), access logs, cookies, IP address, device information (OS version, device model, advertising identifiers like ADID/IDFA).</li>
                </ul>
              </li>
              <li><strong className="font-semibold">Information Regarding Paid Services:</strong> Payment information is processed directly by app market platforms like the App Store or Google Play Store. We do not directly collect or store sensitive payment details like credit card numbers. However, we may receive purchase history information (e.g., order number, product name, purchase date) from the app market for service delivery and customer support.</li>
              <li>
                <strong className="font-semibold">Collection Methods:</strong>
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  <li>Automatically generated and collected during app launch or use.</li>
                  <li>Directly entered by the user during signup and service use.</li>
                  <li>[Specify other methods if any, e.g., Provided by partners, Customer support inquiries]</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="font-semibold">Service Provision and Billing:</strong> Delivering content, providing personalized services, managing paid service payments and usage history, identity verification.</li>
              <li><strong className="font-semibold">User Management:</strong> Verifying identity for membership services, personal identification, preventing fraudulent use by unauthorized users, confirming signup intent, age verification, handling complaints and inquiries, delivering notices.</li>
              <li><strong className="font-semibold">Service Improvement and Development:</strong> Developing new services, providing customized services, offering services and ads based on statistical characteristics (specify if personalized ads are used and require consent), verifying service effectiveness, analyzing access frequency, statistics on user service usage, delivering promotional information like events (with prior user consent).</li>
              <li><strong className="font-semibold">Security, Privacy, and Safety Management:</strong> Restricting violations of terms of service, preventing account hijacking and fraudulent transactions, retaining records for dispute resolution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Retention and Deletion</h2>
            {/* Generalized retention period */}
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When the information is no longer needed, we will securely delete or anonymize it.</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="font-semibold">Retention based on Internal Policy:</strong>
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  <li>Fraudulent Use Records: To prevent abuse [Specify retention period, e.g., 1 year].</li>
                </ul>
              </li>
              <li>
                <strong className="font-semibold">Retention based on Legal Requirements:</strong> We may retain certain information to comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention periods may vary depending on the applicable laws.
                {/* Removed specific Korean law references */}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Deletion Procedures</h2>
            <p>We promptly destroy personal information once the purpose of collection and use has been achieved, according to the retention periods mentioned above. The destruction procedure and method are as follows:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="font-semibold">Procedure:</strong> Information entered by the user (e.g., for signup) is transferred to a separate database (or separate documents if on paper) after the purpose is achieved and stored for a certain period according to internal policies and relevant laws (see Retention Period) before being destroyed. This separately stored personal information is not used for any other purpose unless required by law.</li>
              <li>
                <strong className="font-semibold">Method:</strong>
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  <li>Electronically stored information: Deleted using technical methods that make recovery impossible.</li>
                  <li>Information stored on paper: Shredded or incinerated.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">5. Sharing Information with Third Parties</h2>
            {/* Corrected line 110 */}
            <p>We use your personal information within the scope notified in &quot;2. How We Use Your Information&quot; and do not provide it to external parties without your prior consent, except in the following cases:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>When users have provided prior consent.</li>
              <li>When required by law or requested by investigative agencies according to procedures and methods defined in the law for investigation purposes.</li>
              <li>[If applicable: When provided in a form that cannot identify specific individuals for statistical purposes, academic research, or market research.]</li>
            </ul>
          </section>

          <section>
            {/* Changed title to Service Providers */}
            <h2 className="text-xl font-semibold mt-8 mb-3">6. Sharing Information with Service Providers</h2>
            <p>To improve our services, we may entrust the processing of personal information to external specialized companies (Service Providers) as follows:</p>
            {/* Note: Fill in actual provider details or remove this section if none */}
            <ul className="list-disc list-inside space-y-2 mt-3 bg-gray-50 p-4 rounded">
              <li>
                <strong className="font-semibold">Service Provider:</strong> [Provider Name - *Please fill in actual provider name*]
                <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                  <li><strong className="font-semibold">Purpose of Entrusted Task:</strong> [Describe the task, e.g., Service operation and customer support, Data analysis, Cloud server operation - *Please fill in details*]</li>
                  <li><strong className="font-semibold">Retention Period:</strong> [Until termination of the contract or achievement of the purpose - *Please confirm and specify*]</li>
                </ul>
              </li>
              {/* Add more list items if there are other providers */}
            </ul>
            <p className="mt-3">
              When entering into agreements with Service Providers, we clearly state responsibilities such as prohibiting processing beyond the entrusted purpose, implementing technical and administrative safeguards, restricting re-entrustment, managing and supervising the provider, and liability for damages, in accordance with relevant privacy laws. We supervise the providers to ensure they handle personal information securely. If the scope of work or the service provider changes, we will promptly disclose it through this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">7. Your Rights and Choices</h2>
            {/* Updated user rights section */}
            <ol className="list-decimal list-inside space-y-2">
              <li>You have the right to access, review, and correct your registered personal information at any time. You can also request to withdraw your consent or delete your account.</li>
              {/* Corrected line 143 */}
              <li>To view or modify your personal information, use the &apos;Edit Profile&apos; (or similar) function. To withdraw consent or delete your account, use the &apos;Delete Account&apos; function after verifying your identity.</li>
              <li>Alternatively, you can contact our Data Protection Officer/Privacy Contact (see Section 10) via mail, phone, or email, and we will take action without delay.</li>
              <li>If you request correction of errors in your personal information, we will not use or provide the information until the correction is completed. If incorrect information has already been provided to a third party, we will promptly notify them of the correction.</li>
              {/* Corrected line 146 */}
              <li>Personal information terminated or deleted upon your request will be processed as specified in &quot;3. Data Retention and Deletion&quot; and handled so it cannot be viewed or used for other purposes.</li>
              {/* COPPA Compliance: Changed age to 13 */}
              <li><strong className="font-semibold">Children&apos;s Privacy:</strong> Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child under 13 has provided us with personal information, please contact us. If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we take steps to remove that information from our servers. Parents or legal guardians have the right to review the information collected from their child, request deletion, and refuse further collection or use.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">8. Cookies and Tracking Technologies</h2>
            {/* Corrected line 148 */}
            <p>We use &apos;cookies&apos; and similar technologies to store and retrieve user information frequently to provide personalized services. A cookie is a small text file sent by the server operating the website to the user&apos;s browser and stored on the user&apos;s computer hard drive.</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="font-semibold">Purpose of Use:</strong> Analyzing user access frequency and visit times, identifying user preferences and interests, tracking user activity, assessing participation in various events and visit counts for targeted marketing and personalized service provision.</li>
              {/* Corrected line 154 */}
              <li><strong className="font-semibold">How to Refuse Cookies:</strong> You have the option to control cookie installation. You can configure your web browser options to allow all cookies, prompt for confirmation each time a cookie is saved, or refuse all cookies. (Example for common browsers: Check your browser&apos;s settings or help menu, often under &apos;Privacy&apos; or &apos;Security&apos;). However, refusing cookies may limit your ability to use some of our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">9. Technical and Administrative Security Measures</h2>
            <p>We implement the following technical and administrative measures to ensure the security of your personal information and prevent loss, theft, leakage, alteration, or damage:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="font-semibold">Password Encryption:</strong> User passwords are encrypted for storage and management, ensuring only the user knows them. Accessing and modifying personal information also requires knowing the password.</li>
              <li><strong className="font-semibold">Technical Countermeasures Against Hacking:</strong> We strive to prevent leakage or damage of user personal information due to hacking or computer viruses. We regularly back up data, use the latest antivirus programs, and employ encrypted communication to securely transmit personal information over networks. We use intrusion prevention systems to control unauthorized external access and endeavor to implement all possible technical measures to secure our systems.</li>
              <li><strong className="font-semibold">Minimizing and Training Staff:</strong> Access to personal information is limited to designated staff, who are assigned separate passwords that are regularly updated. We emphasize compliance with the privacy policy through regular training for these staff members.</li>
              <li><strong className="font-semibold">Internal Monitoring:</strong> We operate an internal data protection team to monitor compliance with the privacy policy and the actions of responsible personnel. If issues are identified, we strive to correct them immediately. However, the Company is not liable for problems arising from user negligence or issues on the internet leading to the leakage of personal information such as ID and password.</li>
            </ul>
            {/* Note: The errors reported for line 157 couldn't be directly mapped to an obvious quote or apostrophe in the provided code snippet for that line or the surrounding ones. It's possible the line numbers were slightly off or referred to a nuance the linter picked up. However, I've corrected all the clear instances based on the other error messages. I also corrected the apostrophe in "Children's Privacy" on line 146, which wasn't explicitly listed but follows the same rule. */}
          </section>

          {/* Section 10 seems missing - ensure numbering is correct if you add it back */}

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">11. Changes to This Privacy Policy</h2>
            <p>If there are any additions, deletions, or modifications to this Privacy Policy, we will notify you through in-app announcements or email at least 7 days prior to the revision. However, for significant changes affecting user rights, such as changes in the collection and use of personal information or provision to third parties, we will provide notice at least 30 days in advance.</p>
            {/* Updated date format placeholders */}
            <ul className="list-disc list-inside mt-3">
              <li>Effective Date: [2025-04-01]</li>
              <li>Last Updated Date: [2025-04-01]</li>
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
};
