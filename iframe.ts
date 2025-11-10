import * as cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const file = path.resolve(process.argv[2]);

const buf = readFileSync(file);
const $ = cheerio.loadBuffer(buf);

const nav = $('#api-nav');

nav.remove();

let children = nav.children();
nav.empty();

children.wrapAll('<html><body></body></html>');
const menu = cheerio.load(`
  <!doctype html>
  <html>
    <head>
      <script type="text/javascript" src="../hljs/highlight.pack.js" defer="true"></script>
      <script type="text/javascript" src="../scripts/hljs-scala3.js" defer="true"></script>
      <script type="text/javascript" src="../scripts/ux.js" defer="true"></script>
    </head>
    <body>
      <nav class="body-small side-menu"></nav>
      <script>
        document.querySelectorAll(".nh").forEach((el) => {
          if (attachedElements.has(el)) return;
          attachedElements.add(el);
          el.addEventListener("click", () => {
            if (
              el.lastChild.href.replace("#", "") ===
              window.location.href.replace("#", "")
            ) {
              el.parentElement.classList.toggle("expanded");
              el.firstChild.classList.toggle("expanded");
            } else {
              el.lastChild.click();
            }
          });
        });
      </script>
    </body>
  </html>
`);

function html(x: any): string {
  return x.map((_,x) => $.html(x)).toArray().join('\n');
}

const styles = $('link[rel=stylesheet]');
console.log(html(styles));

menu('head').append(html(styles));
menu('nav').append(html(children));
// console.log(menu.html());

writeFileSync(file + '.new.html', $.html())

writeFileSync(file + '.sidebar.html', menu.html() || '');


