import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type Session,
} from "next-auth";
import { type CtxOrReq } from "next-auth/client/_utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// import { prisma } from "~/server/db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: (ctxReq: CtxOrReq) => NextAuthOptions = ({
  req,
}) => ({
  callbacks: {
    // token.sub will refer to the id of the wallet address
    session: ({ session, token }) =>
      ({
        ...session,
        user: {
          ...session.user,
          id: token.sub, // user's wallet address
        },
      } as Session & { user: { id: string } }),
  },
  providers: [
    CredentialsProvider({
      // ! Don't add this
      // - it will assume more than one auth provider
      // - and redirect to a sign-in page meant for oauth
      // - id: 'siwe',
      name: "Ethereum",
      type: "credentials", // default for Credentials
      // Default values if it was a form
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message ?? "{}") as Partial<SiweMessage>
          );
          const nonce = await getCsrfToken({ req: { headers: req?.headers } });
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);
          // const nextAuthUrl = new URL(
          //   "https://" + process.env.NEXT_PUBLIC_VERCEL_URL!
          // );

          console.log(nextAuthUrl);

          const result = await siwe.verify({
            signature: credentials?.signature ?? "",
            domain: nextAuthUrl.host,
            nonce,
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (error) {
          console.error({ error });
          return null;
        }
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
});

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // Changed from authOptions to authOption(ctx)
  // This allows use to retrieve the csrf token to verify as the nonce
  return getServerSession(ctx.req, ctx.res, authOptions(ctx));
};
