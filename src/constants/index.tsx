import { base } from "@/config";

export const urlConstants = {
  By_twitter: `${base.API_URL}shinobi/login-by-twitter/`,
  By_telegram: `${base.API_URL}shinobi/login-by-telegram/`,
  me: `${base.API_URL}shinobi/me/`,
  leaderboard: `${base.API_URL}shinobi/leaderboard/`,
  campaign: `${base.API_URL}masters/campaign/`,
  onboarding: `${base.API_URL}rootuser/onboarding-campaign/`,
  interactive: `${base.API_URL}rootuser/interactive-campaign/`,
  partner: `${base.API_URL}masters/partner/`,
  history: `${base.API_URL}masters/honors-history/`,
  levels: `${base.API_URL}shinobi/levels/`,
  partners: `${base.API_URL}masters/category-campaign/`,
  featured: `${base.API_URL}rootuser/feature-campaign-data/`,
  dashbordcam: `${base.API_URL}masters/quest-campaign-honor/`,
  categories: `${base.API_URL}masters/category/`,
  partnercampaign: `${base.API_URL} masters/partner-campaign`,
  UserCount: `${base.API_URL}masters/users-count`,
  IFd: `${base.API_URL}shinobi/invited-friends/`,
  DailyFarming: `${base.API_URL}masters/farming-history/`,
  FarmingHonors: `${base.API_URL}masters/farming/`,
  GetRecordforFarming: `${base.API_URL}shinobi/daily-claim/`,
  CreateRecordforFarming: `${base.API_URL}shinobi/daily-claim/`,
  QuizQuestions: `${base.API_URL}masters/quiz/`,
  TgIdCheck: `${base.API_URL}shinobi/tg-idcheck/`,
  CheckLogin: `${base.API_URL}shinobi/check-login/`,
  


  // tap to earn game
  GetCoins: `${base.API_URL}shinobi/get-progress/`,
  UpdateCoins: `${base.API_URL}shinobi/create-or-update-progress/`,
};

export function convertToMilliseconds(
  days: any,
  hours: any,
  minutes: any,
  seconds: any
) {
  const dayMs = days * 24 * 60 * 60 * 1000;
  const hourMs = hours * 60 * 60 * 1000;
  const minuteMs = minutes * 60 * 1000;
  const secondMs = seconds * 1000;
  return dayMs + hourMs + minuteMs + secondMs;
}
