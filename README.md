# Proof of Community

Live demo: https://proofof-community.vercel.app/
Smart Contracts repository: https://github.com/angelmc32/contracts-pof-community/tree/main/packages/hardhat/contracts

Welcome to Proof of Community, a groundbreaking platform that breathes life into digital communities. With us, your group, club, or organization has the power to unleash its true potential. Harness the capabilities of our platform to craft immersive experiences, forge profound connections, and drive tangible impact – all within a single, dynamic ecosystem. Your community, your rules. Dive in today and take the first step toward building a future that's stronger and more interconnected.

🎉The infinite machine of good vibes🎉 The infinite machine of good vibes lies a profound commitment to nurturing authentic interactions, promoting positivity, and igniting genuine engagement within communities. This concept is rooted in the belief that meaningful interactions constitute the foundation of thriving digital ecosystems. With an unwavering focus on fostering sincere engagement, embracing authenticity, and weaving impactful connections among community members, the project resonates with a potent narrative. Its essence can be distilled into a singular mission: to construct an environment where every interaction, every exchange, and every contribution carries the potential to uplift and inspire.

Why would users keep returning? Because here, the content is of high quality, meticulously curated. Because you have the chance to generate ownership of the communities, to foster the growth of both the community and its members, and to create value for all. And when we say all, we truly mean all.

![image](https://github.com/angelmc32/proof-of-community/assets/19479678/4de119ee-f28a-4b96-a042-37c04745a34e)

As a community amasses more reputation, its ability to generate income for everyone expands. We align with Zora's philosophy, where fees are distributed equitably towards communities and creators, thus creating a nurturing and sustainable ecosystem. Through an innovative approach that captures this essence, the protocol's design becomes a conduit for generating and perpetuating an unceasing stream of positive interactions and enriching experiences.

Positive feedback generates more tokens, more reputation, and more identity.

Connections > Engagement > Community > Identity

Our protocol allows for engaging connections within and outside communities, driving collaboration and good vibes for all the members of the community.

These connections are “proved” by an engagement metric delivered by our CommunityBoundERC20 token, an “members only”-transferable ERC20 that increases liquidity whenever users engage with other users in a positive manner.

At the same time, the performance of member-engagement can be tracked to allow users more permissions within the community, culminating in ownership of a Community Wallet, a Safe wallet implementation for our project.

Finally, using a special subgraph we will be able to generate a score using on-chain metrics, plus a social validation component where real-life situations allow users to be “verified” by reputable users (calculated with the same function, but with higher engagement requirements, suchs as Community Managers, admins and mods).

💎 Unlocking the Power of Soul Bound Tokens 💎

![image](https://github.com/angelmc32/proof-of-community/assets/19479678/67abcde6-278c-4fb7-8ed5-5bb8b9b71251)

We're proud to introduce you to the heart of our innovation: Community Bound Tokens (CBTs). These tokens aren't just a form of rewards; they're a symbol of genuine interaction and engagement. Through CBTs, we're revolutionizing the way users participate in events, create posts, and establish vibrant communities. Imagine the ability to not just consume content but to shape it, all through your unique contributions.

Inspired by ETHGlobal Paris Community Bound Token hack (https://ethglobal.com/showcase/community-bound-y73ys) , we expand the ERC20 “members only” approach and leverage it into community wallets, with the idea of generating a revenue model for Communities and its members. Soulbound Memberships were added as token-gating mechanism for communities, and allows other existing NFT communities to port their activity into Proof of Community, making it a truly permissionless platform.

📈 Daily Interaction, Daily Rewards: Get your drip 📈

But the journey of engagement doesn't wait for monthly assessments. With Proof of Community, you're bestowed with the power of 10 CBTs daily. These tokens become your key to unlock interactions, forge connections, and engage with the community. The more you engage, the more tokens you earn – a true embodiment of the Web3 spirit.

🎉 Elevate Engagement with Gnosis Safe Multisig 🎉

But that's not all. Our journey toward authenticity and accountability doesn't end there. We've integrated Gnosis Safe Multisig to create a secure, multi-signature wallet. This wallet becomes the guardian of the CBTs, ensuring transparency and control. Each user can now actively shape their token management, enhancing the connection between their actions and the rewards they reap.

🔗 The Power of Genuine Interactions 🔗

Our mission extends beyond innovation; it's about bringing a sense of humanity into digital landscapes. With Proof of Community, authenticity isn't just a concept – it's a tangible outcome. By linking your interactions with external platforms like Twitter through APIs, we create an intricate web of connections. This web, fueled by human interactions, becomes a fortress against potential bots or malicious actors.

🚀 Proof of Community: Elevating Engagement and Validating Humanity 🚀

The essence of Proof of Community lies in our ability to truly engage communities and verify the presence of real users. As users contribute to events, share insights in posts, and interact with other members, their actions are a testament to their authenticity. Upvotes and downvotes, fueled by CBTs, become the currency of genuine appreciation, fostering an ecosystem that thrives on authentic participation.

🌟 Scorecard of Authenticity: The Human Factor 🌟

How do we distinguish between genuine participants and potential bots? It's in the scorecard. Your engagement across the protocol – posts, votes, comments, interactions with different communities, and the use of CBTs – all contribute to a unique score ranging from 0 to 100%. The closer you are to 100%, the more human your interactions, cementing your place as an authentic community member.

🌐 Evolving Monthly Balances 🌐

And we don't stop there. Monthly, our protocol performs a thorough analysis of your interactions within and across communities. Your score is balanced, ensuring accuracy and fairness. It's a testament to our commitment to nurturing an ecosystem where authenticity prevails, and interactions stand as a testament to humanity.

Join us at Proof of Community, where innovation isn't a buzzword but the foundation of a journey toward thriving, genuine digital communities. Be part of a movement that celebrates humanity, embraces authenticity, and redefines the very essence of digital interactions. Your adventure awaits, one CBT at a time.

How it's Made
Inspired by Community Bound Tokens built during ETHGlobal Paris: https://ethglobal.com/showcase/community-bound-y73ys

Figma Designs for UX/UI: https://www.figma.com/file/ZwyIg15jfeZGypjaD82fi1/Dashboard---Super-hack?type=design&node-id=106%3A5515&mode=design&t=Xq8INhLdcqODqCpK-1

Core components: Community Bound Token - Custom ERC20 Safe Protocol kit + Safe Multisig Soulbound NFT Membership - Custom ERC721

T3 stack web2 app for social network like feature, such as upvotes, event creation, posts + comments. Inspired by reddit to generate "karma points" or "Community Bound Tokens" in our case. Bad users get punished while good users get rewarded and generate value to the community.

As users grow, they access more ownership via the Multisig wallet addition as signer or redistribution of value through CBT engagement.

Not able to finish: The Graph Subgraph for Personhood score

Steps:

Users create a multisig Safe wallet for a community, and a NFT membership is deployed together with it.
Custom ERC20 token is available to request a community as member, to allow community members to mint and transfer Community Bound Tokens
Custom ERC721 serves as token gating for community access
## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Sign-In with Ethereum](https://login.xyz/)
- [Wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!
