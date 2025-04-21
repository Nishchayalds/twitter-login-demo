import { urlConstants } from "@/constants";
import axios from "@/utils/axios";
import NextAuth, { AuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialProvider from "next-auth/providers/credentials";
import { AuthDataValidator, objectToAuthDataMap } from "@telegram-auth/server";

const authOptions: AuthOptions = {
  secret: process.env.jwt_secret,
  jwt: {
    secret: process.env.jwt_secret,
  },
  session: {
    strategy: "jwt",
    updateAge: 1000 * 60 * 60 * 24,
  },

  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID ?? "",
      clientSecret: process.env.TWITTER_SECRET ?? "",

      profile: async (profile: any) => {
        try {
          const mydata = {
            name: profile?.name,
            user_name: profile?.screen_name,
            password: profile?.id_str,
          };

          const savedUser = await axios.post(
            `${urlConstants.By_twitter}`,
            mydata
          );
          // console.log(savedUser);

          const config = {
            headers: {
              "App-AUTH": `SJWT ${savedUser.data.access}`,
            },
          };
          const userData = await axios.get(urlConstants.me, config);

          return {
            id: userData?.data?.id.toString(),
            user_name: userData.data.user_name.toString(),
            referred_by: userData.data.referred_by,
            image: savedUser.data.access.toString(),
            total_referral: userData.data.total_referral,
            rank: userData.data.rank,
            next_level: userData.data.next_level,
            quest_honors: userData.data.quest_honors,
            referral_honors: userData.data.referral_honors,
            total_honor: userData.data.total_honor,
            loginType: "Twitter",
            telegram_id: userData?.data?.telegram_id,
            referral_code: userData.data.referral_code,
            // add login type (Twitter)
          };
        } catch (err) {
          // console.log(err);
          throw err;
        }
      },
    }),

    CredentialProvider({
      name: "credentials",
      id: "user-login",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "johndoe@test.com",
        },
        name: { label: "name", type: "text" },
        password: { label: "password", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("form data", credentials);
        try {
          const savedUser = await axios.post(urlConstants.By_telegram, {
            user_name: credentials?.username,
            name: credentials?.name,
            password: credentials?.password,
          });
          // console.log("console from credentials", savedUser.data);

          const config = {
            headers: {
              "App-AUTH": `SJWT ${savedUser?.data?.access}`,
            },
          };
          const userData = await axios.get(urlConstants.me, config);

          // console.log("userdata", userData);

          return {
            id: userData?.data?.id.toString(),
            user_name: userData.data.user_name.toString(),
            referred_by: userData.data.referred_by,
            image: savedUser.data.access.toString(),
            total_referral: userData.data.total_referral,
            rank: userData.data.rank,
            next_level: userData.data.next_level,
            quest_honors: userData.data.quest_honors,
            referral_honors: userData.data.referral_honors,
            total_honor: userData.data.total_honor,
            loginType: "TG",
            telegram_id: userData?.data?.telegram_id,
            referral_code: userData.data.referral_code,
          };
        } catch (error: any) {
          if (error.response.data.message) {
            throw new Error(error.response.data.message);
          }
          throw new Error(error);
        }
      },
    }),

    CredentialProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: {
        username: {
          label: "username",
          type: "username",
          placeholder: "johndoe@test.com",
        },
        token: { label: "token", type: "text" },
      },
      async authorize(credentials: any, req: any) {
        try {
          console.log(credentials);
          const validator = new AuthDataValidator({
            botToken: `${process.env.BOT_TOKEN}`,
          });
          const data = objectToAuthDataMap(req.query || {});

          const user = await validator.validate(data);

          if (user.id && user.first_name) {
            const config = {
              headers: {
                "App-AUTH": `SJWT ${credentials?.token}`,
              },
            };
            const userData = await axios.patch(
              `${urlConstants.me + credentials?.username}/`,
              { telegram_id: user.id },
              config
            );
            return {
              id: userData?.data?.id.toString(),
              user_name: userData.data.user_name.toString(),
              referred_by: userData.data.referred_by,
              image: credentials.token.toString(),
              total_referral: userData.data.total_referral,
              rank: userData.data.rank,
              next_level: userData.data.next_level,
              quest_honors: userData.data.quest_honors,
              referral_honors: userData.data.referral_honors,
              total_honor: userData.data.total_honor,
              loginType: "Twitter",
              telegram_id: userData?.data?.telegram_id,
              referral_code: userData.data.referral_code,

              // Adding login type (TG)
            };
          }
        } catch (error: any) {
          if (error.response.data.message) {
            throw new Error(error.response.data.message);
          }
          throw new Error(error);
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile, credentials }) {
      return true;
    },
    async jwt({ token, user, account }: any) {
      // console.log(account);
      if (user) {
        token.id = user.id;
        token.user_name = user.user_name;
        token.referred_by = user.referred_by;
        token.type = user.type;
        token.total_referral = user.total_referral;
        token.rank = user.rank;
        token.next_level = user.next_level;
        token.quest_honors = user.quest_honors;
        token.referral_honors = user.referral_honors;
        token.total_honor = user.total_honor;
        token.loginType = user.loginType;
        token.referral_code = user.referral_code;
        token.telegram_id = user.telegram_id;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.id = token.id;
      session.user_name = token.user_name;
      session.referred_by = token.referred_by;
      session.type = token.type;
      session.total_referral = token.total_referral;
      session.rank = token.rank;
      session.next_level = token.next_level;
      session.quest_honors = token.quest_honors;
      session.referral_honors = token.referral_honors;
      session.total_honor = token.total_honor;
      session.loginType = token.loginType;
      session.referral_code = token.referral_code;
      session.telegram_id = token.telegram_id;
      return session;
    },
  },

  debug: false,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
