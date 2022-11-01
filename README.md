# Netcomic
A Website Read Comic Using NextJS, Typescript, Firebase, Tailwindcss, Zustand

## Overview

 - Official website: https://netcomic.vercel.app
-  Author: Nguyễn Hoàng Lâm ( [@lamhoang1256](https://github.com/lamhoang1256) )

## Preview

Dark Mode:
![home-darkmode·](https://user-images.githubusercontent.com/61537853/198968769-85739c4c-7b50-40a6-a38b-020a2eba05da.png)

Light Mode:
![home-lightmode](https://user-images.githubusercontent.com/61537853/198992036-e3b1c77e-93fa-483d-92f0-634b72c47bf0.png)


## Resources

- API: https://netcomic.vercel.app/api-doc (Crawl data from website Nhat Truyen - https://nhattruyenin.com)
- Font Family: Averta

## Main technology used

- NextJS, Typescript
- Firebase
- Tailwindcss
- Zustand (State management)
- Axios (Support fetching data)
- Swiper (Slider), react-modal (Modal)
- React-toastify, sweetalert2 (Message UI)
- Next-swagger-doc, swagger-ui-react (Document API)
- Cheerio (Crawl data from website Nhat Truyen)
- Other: react-tailwindcss-select, query-string, react-lazy-load-image-component, ...

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
 
 Light mode
 ![home-light](https://user-images.githubusercontent.com/61537853/199261314-dc9dd474-6788-480d-9331-2d9f1305dd99.png)
  
 Dark mode
 ![home-dark](https://user-images.githubusercontent.com/61537853/199261622-593214a3-81d7-47db-96a5-57c1821d2777.png)

 </p>
</details>

<details>
 <summary>Comic details page</summary>
 <p>
 
 Light mode
 ![detail-light](https://user-images.githubusercontent.com/61537853/199262110-842c1379-c936-48be-89d0-04e0104892e8.png)
 
 Dark mode
 ![detail-dark](https://user-images.githubusercontent.com/61537853/199262083-0c10df07-afee-4007-a63e-86398565d2cb.png)

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

<details>
 <summary>Change password page</summary>
 <p>
 
  Light mode
 ![change-password-light](https://user-images.githubusercontent.com/61537853/199253432-7a8db713-8046-489b-af1c-ac19cc5ba2f5.png)
  
  Dark mode
 ![change-password-dark](https://user-images.githubusercontent.com/61537853/199253449-30fa4d95-984c-4d20-97b0-aba836085f35.png)

 </p>
</details>

<details>
 <summary>Profile page</summary>
 <p>
 
 Light mode
![profile-light](https://user-images.githubusercontent.com/61537853/199259731-b7ba73f6-aede-4af1-9864-ed5b7f499197.png)

 Dark mode
![profile-dark](https://user-images.githubusercontent.com/61537853/199259756-f7703acc-18b7-4f71-81bf-15742ca1e28a.png)

 </p>
</details>

<details>
 <summary>Follow comic page</summary>
 <p>
 
 Light mode
![follow-light](https://user-images.githubusercontent.com/61537853/199262766-198b0fa9-742d-4f2f-ba7d-d05382cf8745.png)

 Dark mode
![follow-dark](https://user-images.githubusercontent.com/61537853/199262785-ca158fd4-c914-4910-9eea-de8472e9d3bf.png)

 </p>
</details>

<details>
 <summary>Manage user page</summary>
 <p>
 
 Light mode
![manage-user-light](https://user-images.githubusercontent.com/61537853/199260057-5f5a6aba-c17f-42fd-b3b8-34456bae0753.png)

 Dark mode
![manage-user-dark](https://user-images.githubusercontent.com/61537853/199260033-022c3513-4f8c-4aa5-a0c4-10fc219b5bb8.png)

 </p>
</details>

<details>
 <summary>Manage comment page</summary>
 <p>
 
 Light mode
![manage-comment-light](https://user-images.githubusercontent.com/61537853/199260143-292bc056-efee-4807-83e7-f1c6a4a91160.png)

 Dark mode
![manage-comment-dark](https://user-images.githubusercontent.com/61537853/199260163-939ea4bc-f22d-4b07-b2fa-bab0ff661fb1.png)
  
 </p>
</details>

