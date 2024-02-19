
<h1>Building a Video Player App with React</h1>
I will explain the learnings and features i implemented while building the video player application using React.js. Along the way, I encountered some challenges and learned new things further enhancing my development skills.
<h1>Interacting with Web APIs for video element</h1>
While building the video player component, I got a chance to learn the behaviour for the video element and its associated JavaScript APIs. Used those to control various event in a video

<h1>Autoplay Restrictions in Chrome</h1>
One significant challenge I encountered was Chrome autoplay policy, which restricts autoplaying videos unless the user has interacted with the document first. To overcome this limitation, I implemented a workaround by requiring user interaction before initiating autoplay, unless an refresh is done by the user ensuring a seamless user experience across different browsers.

<h1>Drag and Drop</h1>
Implemented drag-and-drop functionality for reordering videos in the playlist Rather than using any external libraries, I learned React built-in APIs to create a seamless drag-and-drop experience. By utilizing useState and useRef hooks along with drag-and-drop events, I achieved a lightweight and efficient solution.

<h1>Keyboard Shortcuts</h1>
Enhanced user accessibility, I implemented keyboard shortcuts to control video events such as seek ,volume control resize and search shortcuts. Also handled edge cases and conflicts between the shortcuts to ensure a smooth experience .

<h1>Lighthouse score</h1>
<img src="https://i.imgur.com/8ckw33P.png"
  height="800"
  width="500"
  alt="Light house score"/>
<h1>Code Modularity</h1>
Maintained a clean and organized codebase for ease of maintenance. I emphasized code modularity by breaking down the application into reusable components, custom hooks and providers to handle complex logic. By adhering to best practices and keeping file sizes in check, I ensured readability and maintainability throughout the development process.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
