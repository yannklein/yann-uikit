const sections = [
  {
    title: "Browser killer",
    description: "Utils to kill the annoying browser default style",
    code: {
      CSS: `body {
  background-color: rgb(250,250,250);
  color: rgb(40,40,40);
}
  body, h1, h2, h3, p {
  margin: 0;
}
ul {
  padding: 0;
}
a {
  text-decoration: none;
  display: inline-block;
}`,
    },
  },
  {
    title: "Responsive container",
    description: "Content container simple and responsive (used on that page)",
    code: {
      HTML: `<div class="content-container"></div>`,
      CSS: `.content-container {
  width: 80vw;
  margin: 0 auto;
}

/* Large devices (laptops/desktops, 992px and up) */
@media (max-width: 992px) {
  .content-container {
    width: 700px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media (max-width: 768px) {
  .content-container {
    width: 600px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (max-width: 576px) {
  .content-container {
    width: 300px;
  }
}`,
    },
  },
  {
    title: "Page Frame",
    description: "Page frame with a fix header/footer and a scrollable body",
    link: {url: "header-body-footer.html", name: "example"},
    code: {
      HTML: `<div class="page-frame-content">
  <div class="page-frame-header">
  </div>
  <div class="page-frame-body">
  </div>
  <div class="page-frame-footer">
  </div>
</div>`,
      CSS: `.page-frame-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.page-frame-header {
  background-color: lightblue;
  padding: 16px;
}

.page-frame-body {
  flex-grow: 1;
  overflow: scroll;
}

.page-frame-footer {
  background-color: lightblue;
  padding: 16px;
}`,
    },
  },
  {
    title: "Cards",
  },
  { title: "Items" },
  {
    title: "Navbar",
  },
];

const cards = {
  hello: {
    HTML: `<div class="card-hello">
  <img src="image.jpg" alt="">
  <div class="card-hello-info">
    <h2>The Hello Card</h2>
    <p>Some nice and subtle description</p>
  </div>
</div>`,
    CSS: `/*Card Hello*/
.card-hello {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  height: 300px;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.card-hello img {
  /*fixed*/
  width: 100%;
  object-fit: cover;
  /*customizable*/
  object-position: 50% 50%;
  border-radius: 16px 16px 0 0;
  height: 30%;
  transition: height 1s ease;
}

.card-hello-info {
  /*fixed*/
  overflow: hidden;
  /*customizable*/
  padding: 16px;
}

.card-hello-info h2 {
  /*customizable*/
  margin: 16px 0;
}

/* De-activate card hover style for tablet/mobiles */
@media (min-width: 1100px) {
  .card-hello img:hover {
    /*customizable*/
    height: 70%;
  }
}

.card-hello img.tapped {
  /*customizable*/
  height: 70%;
}`,
    JS: `document.querySelector(".card-hello img")
  .addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("tapped");
  });`,
  },
  pick: {
    HTML: `<div class="card-pick">
  <img src="image.jpg" alt="">
  <div class="card-pick-info">
    <h2>The Pick card</h2>
    <p>It goes up when you hover over it.</p>
  </div>
</div>`,
    CSS: `/*Card pick*/
.card-pick {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  height: 300px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
}
.card-pick img {
  /*fixed*/
  width: 100%;
  min-height: 100px;
  flex-grow: 1;
  object-fit: cover;
  /*customizable*/
  object-position: 50% 50%;
  border-radius: 4px 4px 0 0;
}
.card-pick-info {
  /*customizable*/
  padding: 24px 16px;
}
.card-pick-info h2 {
  /*customizable*/
  margin: 0;
}
.card-pick:hover {
  /*customizable*/
  transition: 0.2s ease-out;
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}`,
  },
  skills: {
    HTML: `<div class="card-skills">
  <div class="card-skills-img" style="background-image: url(background.jpg)">
    <h2>The skills card</h2>
  </div>
  <div class="card-skills-info">
    <div class="card-skills-info-content">
      <p>A card with a collapsable list of skills.</p>
      <ul>
        <li>🧠 an Einstein-level brain</li>
        <li>🐘 the memory of an elephant</li>
        <li>💪 Norrissian muscles</li>
        <li>🎸 a rock-star creativity</li>
        <li>🍷 romantic enough to shame a Frenchman</li>
        <li>👾 geeker than a 4chan teenager</li>
      </ul>
    </div>
    <div class="card-skills-info-more" on:click={toggleShow}>
    <i class="fa fa-chevron-down" aria-hidden="true"></i> More
    </div>
  </div>
</div>`,
    CSS: `/*Card skills*/
.card-skills {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  width: 100%;
  max-width: 500px;
  height: 300px;
  position: relative;
}
.card-skills-img {
  /*fixed*/
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  background-size: cover;
  /*customizable*/
  background-position: 50% 50%;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
}
.card-skills-img h2 {
  /*customizable*/
  color: white;
  margin: 0;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.card-skills-info {
  /*fixed*/
  display: flex;
  flex-direction: column;
  z-index: 2;
  /*customizable*/
  height: 200px;
  width: 100%;
  border-radius: 0 0 4px 4px;
  background-color: white;
  position: absolute;
  top: 100px;
  box-shadow: 0 0px 16px rgba(0, 0, 0, 0.3);
  transition: height 0.3s ease-out;
}
.card-skills-info-content {
  /*fixed*/
  overflow: hidden;
  flex-grow: 1;
  /*customizable*/
  padding: 0 32px;
}
.card-skills-info ul {
  /*customizable*/
  list-style: none;
}
.card-skills-info-more {
  /*fixed*/
  width: 100%;
  /*customizable*/
  padding: 8px 0;
  background-color: rgb(240, 240, 240);
  cursor: pointer;
  text-align: center;
  border-radius: 0 0 4px 4px;
}
.card-skills-info.show {
  /*fixed*/
  height: 100%;
}`,
    JS: `document.querySelector(".card-skills-info-more")
  .addEventListener("click" , (event) => {
    document.querySelector(".card-skills-info").classList.toggle("show");
    event.currentTarget.querySelector("i").classList.toggle("fa-chevron-down");
    event.currentTarget.querySelector("i").classList.toggle("fa-chevron-up");
})
`,
  },
  identity: {
    HTML: `<div class="card-identity" style="background-image: url(background.jpg)">
<div class="card-identity-content">
  <div class="card-identity-avatar">
      <img src="avatar.jpg" alt="avatar" class="card-identity-img">
      <h2>The ID card</h2>
  </div>
  <p>A card convenient to depict someone's identity.</p>
</div>
</div>`,
    CSS: `.card-identity {
  /*fixed*/
  display: flex;
  align-items: center;
  /*customizable*/
  height: 300px;
  border-radius: 16px;
  background-size: cover;
  background-position: 50% 50%;
  width: 100%;
  max-width: 500px;
}
.card-identity-content {
  /*customizable*/
  padding: 24px;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-color: rgba(250, 250, 250, 0.5);
}
.card-identity-avatar {
  /*fixed*/
  display: flex;
  align-items: center;
}
.card-identity-avatar img {
  /*fixed*/
  object-fit: cover;
  border-radius: 50%;
  /*customizable*/
  width: 64px;
  height: 64px;
  object-position: 50% 50%;
  margin-right: 16px;
}
.card-identity-avatar h2 {
  /*fixed*/
  margin: 0;
}
.card-identity-content {
  /*fixed*/
  width: 100%;
}
.card-identity-content p {
  /*fixed*/
  margin: 0;
  margin-top: 16px;
}`,
  },
  diapo: {
    HTML: `<div class="card-diapo" on:click={toggleCard}>
  <div class="card-diapo-img show" style="background-image: url(image1.jpg)">
    <div class="card-diapo-text">
      <h2>The Bad</h2>
      <p>The diapo card</p>
    </div>
  </div>
  <div class="card-diapo-img" style="background-image: url(image2.jpg)">
    <div class="card-diapo-text">
      <h2>The Good</h2>
      <p>The diapo card</p>
    </div>
  </div>
  <div class="card-diapo-img" style="background-image: url(image3.jpg)">
    <div class="card-diapo-text">
      <h2>The Ugly</h2>
      <p>The diapo card</p>
    </div>
  </div>
</div>`,
    CSS: `/*Card diapo*/
.card-diapo {
  /*fixed*/
  position: relative;
  /*customizable*/
  height: 300px;
  width: 100%;
  max-width: 500px;
}
.card-diapo-img {
  /*fixed*/
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  opacity: 0;
  /*customizable*/
  border-radius: 16px;
  transition: opacity 3s ease-out;
}
.card-diapo-img.show {
  /*fixed*/
  opacity: 1;
}
.card-diapo-text {
  /*fixed*/
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*customizable*/
  color: rgb(240, 240, 240);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.card-diapo-text h2 {
  /*fixed*/
  margin: 0;
  /*customizable*/
  font-size: 32px;
}
.card-diapo-text p {
  /*fixed*/
  margin: 0;
}`,
    JS: `let imgIndex = 1;
const cardDiapoImgs = document.querySelectorAll(".card-diapo-img");
setInterval(() => {
  cardDiapoImgs.forEach(cardDiapoImg => {
    cardDiapoImg.classList.remove("show");
  });
  cardDiapoImgs[imgIndex].classList.add("show");
  imgIndex = (imgIndex + 1) % cardDiapoImgs.length;
}, 5000);`,
  },
  neumorph: {
    HTML: `<div class="card-neumorph">
<div class="card-neumorph-buttons">
  <p>⚭</p>
  <p>Y</p>
  <p>⌬</p>
</div>
<h2>The <a href="https://neumorphism.io">Neumorphism</a> card</h2>
</div>`,
    CSS: `.card-neumorph {
  /*customizable*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 300px;
  width: 100%;
  max-width: 500px;
  border-radius: 24px;
  background: -webkit-linear-gradient(55deg, #8aa0db, #a4beff);
  background: -o-linear-gradient(55deg, #8aa0db, #a4beff);
  background: linear-gradient(145deg, #8aa0db, #a4beff);
  box-shadow: 10px 10px 30px #8297cf,
      -10px -10px 30px #b0cdff;
  width: 100%;
}
.card-neumorph-buttons {
  /*customizable*/
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
.card-neumorph h2 {
  /*customizable*/
  font-size: 32px;
  margin: 0;
  text-align: center;
  color: #8aa0db;
  text-shadow: 2px 2px 4px #a4beff;
}
.card-neumorph-buttons p {
  /*customizable*/
  display: flex;
  font-size: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 64px;
  width: 64px;
  margin: 0;
  cursor: pointer;
  color: #6a80bb;
  text-shadow: 2px 2px 6px #a4beff;
  background: -webkit-linear-gradient(55deg, #8aa0db, #a4beff);
  background: -o-linear-gradient(55deg, #8aa0db, #a4beff);
  background: linear-gradient(145deg, #8aa0db, #a4beff);
  box-shadow: 10px 10px 30px #8297cf,
      -10px -10px 30px #b0cdff;
}
.card-neumorph-buttons p:active {
  /*fixed*/
  box-shadow: none;
}
.card-neumorph a {
  /*customizable*/g
  color: #6a80bb;
  text-shadow: 2px 2px 6px #a4beff;
}`,
  },
  stack: {
    HTML: `<div class="card-stack">
<a href="https://en.wikipedia.org/wiki/Alps" class="card-stack-item" style="background-image: url(image1.jpg)">
  <h2>Third item</h2>
  <p>A third item card that looks great</p>
</a>
<a href="https://en.wikipedia.org/wiki/Antelope_Canyon" class="card-stack-item" style="background-image: url(url(image2.jpg)">
  <h2>Second item</h2>
  <p>A second item card that looks great</p>
</a>
<a href="https://en.wikipedia.org/wiki/Canal_du_Midi" class="card-stack-item" style="background-image: url(url(image3.jpg)">
  <h2>First item</h2>
  <p>A first item card that looks great. ( to be used for Desktop view)</p>
</a>
</div>`,
    CSS: `.card-stack {
  /*fixed*/
  z-index: 1;
  position: relative;
  perspective: 400px;
  /*customizable*/
  height: 300px;
  width: 100%;
}
.card-stack-item {
  /*fixed*/
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  /*customizable*/
  color: white;
  text-shadow: 0 0 8px rgba(0,0,0,0.3);
  box-shadow: 16px 0 16px -7px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  transition: transform .3s;
}

.card-stack-item:nth-child(1) {
  /*customizable*/
  transform: translateZ(-64px) translateX(-8px) rotateY(-36deg);
}
.card-stack-item:nth-child(2) {
  /*customizable*/
  transform: translateZ(-64px) translateX(-32px) rotateY(-36deg);
}
.card-stack-item:nth-child(3) {
  /*customizable*/
  transform: translateZ(-64px) translateX(-56px) rotateY(-36deg);
}

.card-stack-item:not(:last-child):hover {
  /*customizable*/
  transform: translateZ(-64px) rotateY(-10deg) translateX(200px);
}

.card-stack-item h2 {
  /*fixed*/
  margin: 0;
  /*customizable*/
  font-size: 32px;
}

.card-stack-item p {
  /*customizable*/
  margin: 0 32px;
}`,
  },
  vinyl: {
    HTML: `<div class="card-vinyl">
  <img
  alt="anteloupe canyon"
  class="card-vinyl-item"
  src="https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  />
  <img
  alt="alps"
  class="card-vinyl-item"
  src="https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
  />
  <div
    class="card-vinyl-item"
    style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
  >
    <h2>Vinyl Card</h2>
    <p>
      Largely inspired by <a id="babin" href="https://github.com/nibab-boo">Babin Bohara</a> previous work.
    </p>
  </div>
</div>`,
    CSS: `#babin {
  background-color: black;
  padding: 3px 6px;
  color: white;
  border-radius: 4px;
}

.card-vinyl {
  /*fixed*/
  position: relative;
  perspective: 400px;
  /*customizable*/
  height: 300px;
  width: 100%;
}
.card-vinyl-item {
  /*fixed*/
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  /*customizable*/
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  transition: 0.3s;
}

.card-vinyl:hover .card-vinyl-item {
  box-shadow: 16px 0 16px -7px rgba(0,0,0,0.7);
}

.card-vinyl:hover .card-vinyl-item:nth-child(1) {
  /*customizable*/
  transform: rotateY(-20deg) translateX(-24px) scaleY(1.1);
}

.card-vinyl:hover .card-vinyl-item:nth-child(2) {
  /*customizable*/
  transform: rotateY(-20deg) translateX(-56px) scaleY(1.05);
}

.card-vinyl:hover .card-vinyl-item:nth-child(3) {
  /*customizable*/
  transform: rotateY(-20deg) translateX(-88px);
}

.card-vinyl-item h2 {
  /*fixed*/
  margin: 0;
  /*customizable*/
  font-size: 32px;
}

.card-vinyl-item p {
  /*customizable*/
  margin: 0 32px;
}`,
  },
};

const items = {
  drawer: {
    HTML: `<div class="item-drawer">
<div class="item-drawer-content">
  <h2>The drawer item</h2>
</div>
<div class="item-drawer-button">
  <i class="fas fa-ellipsis-v"></i>
</div>
<div class="item-drawer-settings">
  <a href="#"><i class="fas fa-edit"></i></a>
  <a href="#"><i class="fas fa-trash"></i></a>
</div>
</div>`,
    CSS: `.item-drawer {
  /*fixed*/
  display: flex;
  align-items: center;
  /*customizable*/
  height: 120px;
  width: 700px;
  max-width: 100%;
/*   width: fit-content; */
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
  background-color: rgb(250,250,250);
}

.item-drawer h2 {
  /*customizable*/
  margin: 0;
}

.item-drawer-content {
  /*fixed*/
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  /*customizable*/
  padding: 0 32px;
}

.item-drawer-settings {
  /*fixed*/
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  white-space: nowrap;
  width: 0px;
  height: 100%;
  /*customizable*/
  transition: 0.3s ease-out;
  background-color: rgb(230,230,230);
  border-radius: 0 16px 16px 0;
  font-size: 40px;
}

.item-drawer-button {
  /*fixed*/
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  /*customizable*/
  background-color: #a4beff;
  border-radius: 0 16px 16px 0;
  width: 40px;
  font-size: 40px;
}

.item-drawer-settings a {
  /*customizable*/
  color: rgb(40,40,40);
}

.item-drawer.active .item-drawer-settings {
  /*customizable*/
  width: 180px;
}

.item-drawer.active .item-drawer-button {
  /*fixed*/
  border-radius: 0;
}`,
    JS: `document.querySelector(".item-drawer-button")
  .addEventListener("click", (event) => {
    document.querySelector(".item-drawer").classList.toggle("active");
  });`,
  },
  "3d": {
    HTML: `<div class="item-3d">
<div class="item-3d-content">
  <h2>The 3D item</h2>
  <p>An icon that pops up out of the card.</p>
</div>
<div class="item-3d-icon">
  <img src="images/youtube.png" alt="">
</div>
</div>`,
    CSS: `.item-3d {
  /*fixed*/
  display: flex;
  align-items: center;
  /*customizable*/
  width: 700px;
  max-width: 100%;
  height: 120px;
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
}

.item-3d h2 {
  /*customizable*/
  margin: 0;
}

.item-3d p {
  /*customizable*/
  margin: 0;
}

.item-3d-content {
  /*fixed*/
  flex-grow: 1;
  /*customizable*/
  background-color: rgb(250,250,250);
  padding-left: 32px;
}

.item-3d-icon {
  /*fixed*/
  position: relative;
  /*customizable*/
  width: 200px;
}

.item-3d-icon img {
  /*fixed*/
  position: absolute;
  top: 50%;
  left: 50%;
  /*customizable*/
  transform: translate(-50%, -60%);
  height: 150px;
  width: 150px;
}

/* Mobile phones (portrait) adn smaller */
@media (max-width: 576px) {
  .item-3d-icon img {
    transform: translate(-30%, -50%);
    height: 120px;
    width: 120px;
  }
}`,
  },
  flip: {
    HTML: `<div class="item-flip" on:click={toggleFlip} class:flipped={isFlipped}>
<div class="item-flip-inner">
  <div class="item-flip-front">
    <div class="item-flip-content">
      <h2>The flipping item</h2>
      <p>Hover it (or click it on mobile) to display...</p>
    </div>
  </div>
  <div class="item-flip-back">
    <div class="item-flip-content">
      <p>The back of the card!</p>
    </div>
  </div>
</div>
</div>`,
    CSS: `.item-flip {
  /*customizable*/
  height: 120px;
  width: 700px;
  max-width: 100%;
}

.item-flip-inner {
  /*fixed*/
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.item-flip h2 {
  /*customizable*/
  margin: 0;
}

.item-flip p {
  /*customizable*/
  margin: 0;
}

.item-flip-front, .item-flip-back {
  /*fixed*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /*customizable*/
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
  background-color: rgb(250,250,250);
}

.item-flip-content {
  padding-left: 24px;
}

.item-flip-back {
  transform: rotateX(180deg);
}

.item-flip.flipped .item-flip-inner {
  transform: rotateX(180deg);
}

/* De-activate card hover style for mobiles */
@media (min-width: 1100px) {
  .item-flip:hover .item-flip-inner {
  transform: rotateX(180deg);
}
}`,
    JS: `document.querySelector(".item-flip")
  .addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("flipped");
  });`,
  },
};

const navbars = {
  vanilla: {
    HTML: `<div class="navbar-vanilla">
  <a class="navbar-vanilla-section" href="#">
    <img class="navbar-vanilla-logo" src="logo.png" alt="logo">
    <h2 class="navbar-vanilla-brand" >Vanilla CSS navbar</h2>
  </a>
  <div class="navbar-vanilla-section">
    <div class="navbar-vanilla-menu">
      <a href="#">CSS tricks</a>
      <a href="#">Design gems</a>
    </div>
    <div class="navbar-vanilla-profile">
      <img src="https://avatars2.githubusercontent.com/u/26819547" alt="">
      <ul>
        <li><a href="#">Profile</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </div>
  </div>
</div>`,
    CSS: `.navbar-vanilla {
  display: flex;
  height: 96px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.navbar-vanilla a {
  text-decoration: none;
  color: rgb(40,40,40);
  font-size: 20px;
}

.navbar-vanilla-section {
  display: flex;
  align-items: center;
}

.navbar-vanilla-logo {
  height: 64px;
  width: 64;
  object-fit: cover;
  object-position: 50% 50%;
  margin: 0 24px;
}

.navbar-vanilla-brand {
  margin: 0;
}

.navbar-vanilla-menu a {
  margin: 0 16px;
}

.navbar-vanilla-profile {
  position: relative;
  margin: 0 24px;
}

.navbar-vanilla-profile img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  cursor: pointer;
}

.navbar-vanilla-profile ul {
  position: absolute;
  top: 64px;
  right: 0;
  list-style: none;
  padding: 0;
  margin: 8px 0;
  background-color: white;
  padding: 16px;
  width: max-content;
  box-shadow: 0 0 16px rgba(0,0,0,0.1);
  text-align: right;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.navbar-vanilla-profile li {
  margin: 8px;
}

.navbar-vanilla-profile.active ul {
  opacity: 1;
  visibility: visible;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (max-width: 576px) {
  .navbar-vanilla-brand {
    font-size: 24px;
  }

  .navbar-vanilla-menu {
    display: none;
  }
}`,
    JS: `document.querySelector(".navbar-vanilla-profile img")
.addEventListener("click", (event) => {
  document.querySelector(".navbar-vanilla-profile").classList.toggle("active");
})`,
  },
};

export { sections, cards, items, navbars };
