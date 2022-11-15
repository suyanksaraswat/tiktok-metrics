# https://tiktok-metrics-three.vercel.app/

This is an app built with Next, TS, Prisma, TRPC and MySQL.

This app have two pages- search and stats page.

Flow of app:

- User search the name
- Data gets scrapped in backend.
- If the username exist in DB, it will update the same with latest stats, otherwise create new one.
- On stats page, data is simply fetched from DB.
