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
  "Hello": {
    "HTML": ``,
    "CSS": ``,
    "JS": ``
  }
}

export default sections;