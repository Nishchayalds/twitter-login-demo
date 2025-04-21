// export const cardsData = [
//   {
//     title: "Total Honors",
//     value: "1000",
//     image: "Group.png",
//     summery:
//       "You have a total of 1200 Honors. You've earned 800 from quests, 200 from referrals, and 200 from daily claims.",
//   },
//   {
//     title: "Rank Progress",
//     value: "Genin",
//     image: "Vector.png",
//     summery:
//       "Your current rank is Genin.You're 75% of the why to chunin! Earn 300 more Honors to level up and achieve your next rank.",
//   },
//   {
//     title: "Referrals",
//     value: "25",
//     image: "Group208.png",
//     summery:
//       " You've earned 500 Honores from your referrals. Keep sharing to accumulate more rewards!",
//   },
// ];

export const shinobiCard = [
  {
    title: "Your Current Rank",
    value: "79",
    image: "Group.png",
    summery: "You are currently ranked 75 on the Ensei leaderboard!",
  },
  {
    title: "Honors Required",
    value: "1200",
    image: "Group.png",
    summery:
      "You are currently at the Genin rank. To advance to the next rank, Chunin, you need to earn 1,200 more Honors.",
  },
  {
    title: "Daily Honors Claim",
    value: "30",
    image: "Group.png",
    summery:
      "Your daily Honors are ready to be claimed! Click Claim Now to collect your reward and boost your progress.",
  },
];

export const partners = [
  {
    title: "Arbitrum",
    logo: "arbitrum.png",
    quest: "53",
  },
  {
    title: "base",
    logo: "base.png",
    quest: "52",
  },
  {
    title: "OP Mainnet",
    logo: "optimism.png",
    quest: "30",
  },
  {
    title: "Blast",
    logo: "blast.png",
    quest: "25",
  },
  {
    title: "Polygon",
    logo: "polygon.png",
    quest: "21",
  },
  {
    title: "Blast",
    logo: "blast.png",
    quest: "25",
  },
  {
    title: "Arbitrum",
    logo: "arbitrum.png",
    quest: "53",
  },
];

export const tasks = [
  {
    title: "Follow on Twitter",
    logo: "twitter.png",
  },
  // {
  //   title: "Follow on Facebook",
  //   logo: "fb.png",
  // },
  {
    title: "Follow on Instagram",
    logo: "instagram.png",
  },
  {
    title: "Subscribe on Youtube",
    logo: "youtube.png",
  },
  {
    title: "Follow on Tiktok",
    logo: "tiktok.png",
  },
  {
    title: "Follow on Snapchat",
    logo: "snapchat.png",
  },
];


// export function DeleteCookies() {
//   document.cookie = "usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// }

// This can be placed in a React component or any client-side code
export const DeleteCookies = () => {
  console.log("Deleting usertoken cookie...");

  // Delete the cookie by setting its expiration date to a past time
  document.cookie = "usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
