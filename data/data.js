const sections = [
  { "title": "Browser killer",
    "description": "Utils to kill the annoying browser default style",
    "code": {
      "CSS": 
`body {
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
}`
    } 
  },
  { "title": "Responsive container",
    "description": "Content container simple and responsive (used on that page)",
    "code": {
      "HTML":
`<div class="content-container"></div>`,
      "CSS": 
`.content-container {
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
}`
    }
  },
  { "title": "Page Frame",
    "description": "Page frame with a fix header/footer and a scrollable body",
    "code": {
      "HTML": 
`<div class="page-frame-content">
  <div class="page-frame-header">
  </div>
  <div class="page-frame-body">
  </div>
  <div class="page-frame-footer">
  </div>
</div>`,
      "CSS": 
`.page-frame-content {
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
}`
    }
  },
  { 
    "title": "Cards",
  },
  { "title": "Item cards",
  },
  { 
    "title": "Navbar",
  }
];

const cards = {
  "hello": {
    "HTML": 
`<div class="card-hello">
  <img src="image.jpg" alt="">
  <div class="card-hello-info">
    <h2>The Hello Card</h2>
    <p>Some nice and subtle description</p>
  </div>
</div>`,
    "CSS": 
`/*Card Hello*/
.card-hello {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  height: 300px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 8px 16px rgb(0,0,0,0.3);
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
    "JS": 
`document.querySelector(".card-hello img")
  .addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("tapped");
  });`
  },
  "pick": {
    "HTML": 
`<div class="card-pick">
  <img src="image.jpg" alt="">
  <div class="card-pick-info">
    <h2>The Pick card</h2>
    <p>It goes up when you hover over it.</p>
  </div>
</div>`,
    "CSS": 
`/*Card pick*/
.card-pick {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  height: 300px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0px 16px rgb(0, 0, 0, 0.3);
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
  padding: 16px;
}
.card-pick-info h2 {
  /*customizable*/
  margin: 16px 0;
}
.card-pick:hover {
  /*customizable*/
  transition: 0.2s ease-out;
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgb(0, 0, 0, 0.3);
}`
  },
  "skills": {
    "HTML":
`<div class="card-skills">
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
  "CSS": 
`/*Card skills*/
.card-skills {
  /*fixed*/
  display: flex;
  flex-direction: column;
  /*customizable*/
  width: 100%;
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
  box-shadow: 0 0px 16px rgb(0, 0, 0, 0.3);
}
.card-skills-img h2 {
  /*customizable*/
  color: white;
  margin: 0;
  text-shadow: 0 0 8px rgb(0, 0, 0, 0.3);
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
  box-shadow: 0 0px 16px rgb(0, 0, 0, 0.3);
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
    "JS": 
`document.querySelector(".card-skills-info-more")
  .addEventListener("click" , (event) => {
    document.querySelector(".card-skills-info").classList.toggle("show");
    event.currentTarget.querySelector("i").classList.toggle("fa-chevron-down");
    event.currentTarget.querySelector("i").classList.toggle("fa-chevron-up");
})
`
  }
};

export { sections, cards};