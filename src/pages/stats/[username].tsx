import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { trpc } from "../../utils/trpc";

const Stats: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [data, setData] = useState<any>({
    nickname: null,
    avatar: null,
    followers: null,
    avgViews: null,
    avgComments: null,
    avgLikes: null,
    avgShare: null,
    interactionRate: null,
  });

  const { isFetching } = trpc.example.getUserData.useQuery(
    { username: username as string },
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(username),
      onSuccess: (data) => {
        console.log("### data on success-", data);
        setData(data);
      },
      onError: (err) => {
        router.push("/");
      },
    }
  );

  return (
    <>
      <Head>
        <title>Stats | {username}</title>
        <meta name="description" content="Stats by Tiktok" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen max-w-4xl flex-col justify-center p-4">
        {isFetching ? (
          <p className="font-generalsans text-base font-bold text-[#525C76]">
            Loading...
          </p>
        ) : (
          <>
            <p className="font-generalsans text-base font-bold text-[#525C76]">
              Showing data for
            </p>

            <h1 className="mb-2 font-generalsans text-2xl font-extrabold text-[#0F1D40]">
              tiktok.com/@{username}
            </h1>
            <p className="mb-12 w-max rounded-2xl border border-[#E2E4E8] py-1 px-2 font-generalsans text-base font-extrabold text-[#0F1D40]">
              {data?.nickname}
            </p>

            <div className="grid grid-cols-2 rounded-2xl border border-[#E2E4E8] px-4 py-6 sm:grid-cols-3">
              <div className="border-0 border-b py-2">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Total Followers
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {data?.followers
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>

              <div className="border-0 border-l border-b border-[#E2E4E8] py-2 pl-4">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Average Video Views
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {data?.avgViews
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>

              <div className="border-0 border-b border-[#E2E4E8] py-2 sm:border-l sm:pl-4">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Interaction-rate
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {Math.round(data?.interactionRate)}%
                </h1>
              </div>

              <div className="border-0 border-b border-l border-[#E2E4E8] py-2 pl-4 sm:border-none sm:pl-0">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Average Comments
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {data?.avgComments
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>

              <div className="border-0 border-[#E2E4E8] py-2 sm:border-l sm:pl-4">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Average Likes
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {data?.avgLikes
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>

              <div className="border-0 border-l border-[#E2E4E8] py-2 pl-4 sm:border-l">
                <p className="mb-1 font-generalsans text-xs font-bold text-[#525C76]">
                  Average Shares
                </p>

                <h1 className="font-generalsans text-3xl font-extrabold text-[#0F1D40]">
                  {data?.avgShare
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Stats;
