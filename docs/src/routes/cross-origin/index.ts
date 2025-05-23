import { RequestHandler } from "@qwik.dev/router";

export const onGet: RequestHandler = async ({send}) => {
  const page = `
  <html>
    <head>
      <style>
        body {
          background-color: skyblue;
          margin: 2px;
        }
      </style>
    </head>
    <body>
      <div>
        <span>iframe origin:</span>
        <span id="iframe-origin"></span>
      </div>
      <div>
        <span>parent origin:</span>
        <span id="parent-origin"></span>
      </div>
      <script>
        document.getElementById('iframe-origin').textContent = window.origin;

        const url = new URL(location.href);
        const parentOrigin = url.searchParams.get('parentorigin');
        document.getElementById('parent-origin').textContent = parentOrigin;

        setTimeout(async () => {
          await new Promise((resolve) => {
            setTimeout(() => {
              parent.postMessage('88', parentOrigin);
              resolve();
            });
          });
        });

        const crossOriginCookie = document.cookie;

        localStorage.setItem('mph', '88');
      </script>
    </body>
  </html>`;
  send(200, page);
};