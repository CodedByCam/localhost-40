const bolognaSections = [
  {
    id: "the-first-university-mutual-aid",
    title: "The First University",
    paragraphs: [
      `In 1088, a group of foreign students in Bologna, Italy, formed a mutual-aid society in order to use their collective power for better books, housing, food, lectures, and even professors. This experience produced high-agency, capable individuals ready to contribute to labor markets. The success of these community members led to the establishment of the western world's first university.`,
    ],
  },
  {
    id: "42-underemployment",
    title: "42% Underemployment",
    embeds: [
      {
        type: "tweet",
        url: "https://x.com/sama/status/1505597901011005442",
      },
    ],
    paragraphs: [
      `934 years later, in 2022, Sam Altman, founder and CEO of OpenAI, posted on X predicting a collapse in higher education. I sent him an email about the University of Bologna, believing the history of higher education may inspire solutions for its future. He responded, and we had a phone call a few hours later. About a week later, Sam agreed to fund one of the solutions we discussed. This was before the explosion of ChatGPT, but it was becoming clearer that AI would have an impact on labor markets and education. Sam asked what we should do about the problems we discussed, and I highlighted a segment of the higher education system, community colleges, that's ripe for a full administrative overhaul and most likely to adopt and create a successful wedge. Much of the hedge was betting that a community college infused with AI could produce results on par with the finest universities in the U.S.`,
      [
        `Sam was prescient about the decline in U.S. college education. Enrollment is down across the board, but the most alarming stat is that `,
        {
          text: "42% of college graduates are in jobs they could have picked up out of high school",
          href: "https://www.newyorkfed.org/research/college-labor-market",
        },
        `. This muddies the ROI of college, which admittedly has benefits outside of earnings, but that's becoming an afterthought as AI drives massive labor market change.`,
      ],
    ],
    chart: {
      title: "New York Fed college labor market chart",
      src: "https://www.newyorkfed.org/research/college-labor-market#--:explore:unemployment",
      source: "Federal Reserve Bank of New York, The Labor Market for Recent College Graduates",
      sourceUrl: "https://www.newyorkfed.org/research/college-labor-market",
    },
  },
  {
    id: "automated-college-administration",
    title: "Automated College Administration",
    demo: "Automated college administration",
    paragraphs: [
      `Now, there are hundreds of ways to augment a college with AI, so this presents the first set of decisions to be made. First, you could build an LLM, AI chat interface, and sell it to administrators to deploy to students across campus. The challenge here is the principal-agent problem where the end user of the product and the buyers are different. We saw the conflict and opted for a more radical approach: to build a new interface, fully integrated into all of the college's existing systems, with an AI layer designed to automate administrative work for students and staff. This meant integrating with everything from admissions and financial aid office systems to curriculum and learning management. My job was to design a system capable of transforming every department's protocols into hundreds of background tasks, able to run in parallel, to deliver the required workflows into an augmented interface simple enough for college students to consume.`,
    ],
  },
  {
    id: "admissions",
    title: "Admissions",
    demo: "Admissions",
    paragraphs: [
      `College systems do not come with robust documentation, APIs, SDKs, or a Stripe-level developer experience. The biggest technical challenge for a system of this nature is to create reliable and adaptable connections, and in the context of full-stack startup speed, ideally permissionless. I started by collaborating with Robert Walker, Senior Backend Engineer, to build the admissions integration. Community colleges mostly have a guaranteed acceptance rate, but a trade-off for this ease of access is 42 prerequisites as filters of pain to test if a student is truly serious about attending before they invest precious human resources. These included everything from sending official transcripts to taking a college course placement exam. I registered as a student, wrote the scope, and partnered with Robert to automate admissions. My scope didn't account for several layers of architectural ambiguity. First, student backgrounds vary, especially for community college. A user may be a new high school graduate (easiest) or a recent university dropout looking to get back on track. Cases like these led to the 42 admission prerequisites reducing or restructuring. So, I optimized the process for Robert by first reducing scope to focus on new high school graduates only, then redesigning our database structure to capture current and future cases, and last by creating a map for each case.`,
      `The result was an iOS app where students could easily understand and complete steps they needed to get enrolled in college. This sets the identity foundation for features to come, and we began to understand the most automatable administrative tasks, and the least.`,
    ],
  },
  {
    id: "financial-aid-payments",
    title: "Financial Aid Payments",
    demo: "Financial aid payments",
    paragraphs: [
      `The next big integration was payments. This was not only ambiguous and complex technically but created one of the greatest technology regulatory challenges. More than $6B in Pell Grant disbursement funds alone go unclaimed every year due to the complexities in U.S. federal student aid. Solving this challenge would lead to enormous value for our users and become the strongest wedge for the business. I partnered with Robert Walker to build out the backend infrastructure, and Eric Townsend, a principal iOS engineer, to develop a seamless frontend experience for admissions and payments.`,
      `Together, we built a net new financial product by allowing students to discover how much financial aid they were set to receive, to connect and manage their aid in our platform, and to receive financial aid refunds, which are cash deposits students receive if there is anything left after the college has been paid in full. The result was $1M+ in funding disbursed to students who were not aware these funds were available to them.`,
      `Getting there was a journey through uncharted territory, quite impossible to scope, and no way to truly test outside of production. So, the first big blocker I needed to clear for Robert and Eric was legal and ethical. Latham & Watkins summoned a specialist in Washington D.C. to create the terms, language, and structure we would use to facilitate payments for students. Robert was then clear to build out the financial aid integration. Similar to the admissions workflow, we could collect necessary details from students, send data to the financial aid office, while identifying opportunities for administrative automation. Unlike admissions, there were three systems we needed to integrate: 1) the college's financial aid system; 2) a third-party financial service responsible for disbursing billions of dollars to students each year; 3) student bank accounts. So, we set up real-time monitoring for all, and much of the value and execution was due to surfacing information for users at the right time. This would become central to how we evolved the system.`,
    ],
  },
  {
    id: "courses",
    title: "Courses",
    demo: "Courses",
    paragraphs: [
      `Getting into the right course, with the right professor, can make or break a student's semester. Financial aid awards are also linked to courses; workload and performance determine the amount of funding a user receives. This feature was built in collaboration with Chinedu Abaologu and Zekkerriyya Zekeri. Given the direct link to business outcomes, this team was afforded an opportunity to develop an increasingly critical skill for engineers, which is to build with business context towards growth. Nearly every feature and function must be wired for either distribution or strategic business outcomes today, and we were fortunate to have an opportunity to be early in cultivating and pressure testing this skill set. A key result of this is Chinedu noticing how offering students the course load that would lead to maximum financial aid led to more engagement, and clearer decisions on the kind of semester users were prepared for.`,
      `Meanwhile, Zek had shipped a powerful LLM integration capable of translating coursework into different languages, perspectives, and forms. This meant students could not only complete their college coursework from within the platform, but they were getting a more rigorous, engaging, and supported experience. And then tragedy struck: the need to augment coursework went from a good feature to the most mission-critical as the dropout rate amongst our users was higher than expected. Sixty percent of community college students withdraw after the first semester on average, but we expected our software to allow us to execute better performance.`,
      `We decided to pause engineering to initiate a relationship with a new important stakeholder: the college president's cabinet. The goal was to find better alignment, oversight, and begin a lockstep process towards better outcomes.`,
    ],
  },
  {
    id: "trust-distribution-learnings",
    title: "Trust & Distribution Learnings",
    paragraphs: [
      `After several meetings with the college president's cabinet, we decided to shut down the project. The primary reason was our inability to secure complete buy-in, which prevented the campus distribution and penetration required for venture speed and scale. Our capital structure fundamentally did not align with our stakeholder's modus operandi, which left little room for engineering to change outcomes.`,
    ],
  },
  {
    id: "credits",
    title: "Credits",
    paragraphs: [
      `The business and customer impact of $1M in U.S. federal funding disbursed, thousands of students enrolling in college, and new research for financial products and automated college administration came as a result of 10,000 hours of 1:1s, design reviews, system pilots, and architectural decisions by Brandon Gotlieb, Robert Walker, Eric Townsend, Chinedu Abalogu, and Zekkerriyya Zekeri. This small team of engineers made an impact through craft, and an appetite to embed deeper into business context and outcomes than the standard engineering practices recommend, a format for career growth and development I will carry into every team I work with.`,
    ],
  },
];

export const memos = [
  "Labor Market Data",
  "1088 Bologna",
  "Temples",
  "Food",
  "Quantum Intelligence",
  "916.52 BTC",
  "Butter",
  "Leather",
  "Vessels",
  "Nostalgia",
  "Brother Lawrence Film",
  "Job LP",
].map((title, index) => ({
  order: index + 1,
  title,
  slug: title
    .toLowerCase()
    .replaceAll(".", "")
    .replaceAll(" ", "-"),
  dek:
    title === "1088 Bologna"
      ? "A brief memo on how I created a new way for students to interface with colleges."
      : `A working memo on ${title.toLowerCase()}, product gravity, market structure, and what may be worth noticing next.`,
  sections: title === "1088 Bologna" ? bolognaSections : [],
}));

export const memoSlots = Array.from(
  { length: 40 },
  (_, index) => memos[index] ?? null,
);

export function getMemoBySlug(slug) {
  return memos.find((memo) => memo.slug === slug);
}
