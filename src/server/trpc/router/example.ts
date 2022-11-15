import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { TikTokClient } from "tiktok-private-api-suyank";

const scraper = new TikTokClient();

export const exampleRouter = router({
  getUserData: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.user.findFirst({
        where: {
          username: input.username,
        },
      });

      if (data) {
        return data;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Account does not exist in DB",
      });
    }),

  findTiktokUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await scraper.user.info(input.username);

        let views = 0,
          comms = 0,
          likes = 0,
          shares = 0;
        Promise.all(
          user?.userInfo?.itemList?.slice(0, 10)?.map((res: any) => {
            if (res?.stats?.playCount) {
              views += res?.stats?.playCount;
            }
            if (res?.stats?.commentCount) {
              comms += res?.stats?.commentCount;
            }
            if (res?.stats?.diggCount) {
              likes += res?.stats?.diggCount;
            }
            if (res?.stats?.shareCount) {
              shares += res?.stats?.shareCount;
            }
          })
        );

        const data = {
          username: input.username,
          nickname: user?.userInfo?.nickname || null,
          avatar: user?.userInfo?.avatarLarger || null,
          followers: user?.userInfo?.stats?.followerCount || null,
          avgViews: views || null,
          avgComments: comms || null,
          avgLikes: likes || null,
          avgShare: shares || null,
          interactionRate: ((comms + likes + shares) * 100) / views || null,
        };

        console.log("### data-", data);

        const findUser = await ctx.prisma.user.findFirst({
          where: {
            username: input.username,
          },
        });

        if (findUser) {
          const updatedUser = await ctx.prisma.user.update({
            where: {
              id: findUser.id,
            },
            data,
          });
          return updatedUser;
        } else {
          const createdUser = await ctx.prisma.user.create({
            data,
          });
          return createdUser;
        }
      } catch (err) {
        console.log("### err-", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Account does not exist",
          cause: err,
        });
      }
    }),
});
