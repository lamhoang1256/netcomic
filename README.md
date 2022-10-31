# Netcomic
A Website Read Comic Using NextJS, Typescript, Firebase, Tailwindcss, Zustand

## Overview

 - Official website: https://netcomic.vercel.app
-  Author: Nguyễn Hoàng Lâm ( [@lamhoang1256](https://github.com/lamhoang1256) )

## Preview

![home](https://user-images.githubusercontent.com/61537853/198968769-85739c4c-7b50-40a6-a38b-020a2eba05da.png)

## Resources
```
Data: comic crawled from website Nhat Truyen (https://nhattruyenin.com)
Font Family: Averta
```
## Main technology used

- React, Typescript
- Firebase
- Tailwindcss
- Zustand (State management)
- Axios (Support fetching data)
- Swiper (Slider), react-modal
- React-toastify, sweetalert2 (Message UI)
- Other: cheerio, react-tailwindcss-select, query-string, react-lazy-load-image-component, ...

## Features

- Suggested featured comics
- Search comic by name
- Filter by categories, top rank, date, ...
- Save comic history
- Follow comic you like
- Update information profile
- Level up through reading comic
- Comments (require sign in)
- Theme: dark mode, light mode

## Environment Variables

```
NEXT_PUBLIC_NHATTRUYEN = https://nhattruyenin.com
NEXT_PUBLIC_NODE_ENV = development (or production)
NEXT_PUBLIC_SERVER = http://localhost:3000 (or Link vercel)
NEXT_PUBLIC_LOCALHOST = http://localhost:3000

# See: https://firebase.google.com
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Screenshots

<details>
 <summary>Home page</summary>
 <p>
 
 ![homepage](https://user-images.githubusercontent.com/61537853/198968769-85739c4c-7b50-40a6-a38b-020a2eba05da.png)
 </p>
</details>

<details>
 <summary>Comic details page</summary>
 <p>
 
 ![detail](https://user-images.githubusercontent.com/61537853/198970344-c4087645-cb48-4794-beab-1404e72dd3e4.png)
 </p>
</details>



<details>
 <summary>Boy genre comic page</summary>
 <p>
 
![boy](https://user-images.githubusercontent.com/61537853/198970223-59970bb5-54de-42d2-9495-aacdefd3c2cf.png)
 </p>
</details>

<details>
 <summary>Girl genre comic page</summary>
 <p>
 
 ![girl](https://user-images.githubusercontent.com/61537853/198970159-1ade4311-6a5f-4eb9-96e7-1edd3ec7672e.png)
 </p>
</details>

<details>
 <summary>History page</summary>
 <p>
 
![history](https://user-images.githubusercontent.com/61537853/198970281-e81a788d-401c-43a6-b606-4c70aeab8c2a.png)
 </p>
</details>
