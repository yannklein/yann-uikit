<div class="card-stack">
  <a href="https://en.wikipedia.org/wiki/Alps" class="card-stack-item" style="background-image: url(https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)">
    <h2>Third item</h2>
    <p>A third item card that looks great</p>
  </a>
  <a href="https://en.wikipedia.org/wiki/Antelope_Canyon" class="card-stack-item" style="background-image: url(https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)">
    <h2>Second item</h2>
    <p>A second item card that looks great</p>
  </a>
  <a href="https://en.wikipedia.org/wiki/Canal_du_Midi" class="card-stack-item" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
    <h2>First item</h2>
    <p>A first item card that looks great. ( to be used for Desktop view)</p>
  </a>
</div>

<style>
  .card-stack {
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
    box-shadow: 16px 0 16px -7px rgb(0 0 0 / 70%);
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
  }
</style>