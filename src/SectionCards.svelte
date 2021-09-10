<script>
  import { writable } from 'svelte/store';
  import CardHello from './cards/CardHello.svelte';

	const currentCard = writable(null);

  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id="cards-section" class="page-section">
  <h2>❐ Cards</h2>
  <div class="cards">
    <CardHello/>
    <div class="card-pick">
      <img src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
      <div class="card-pick-info">
        <h2>The Pick card</h2>
        <p>It goes up when you hover over it.</p>
      </div>
    </div>
    <div class="card-skills">
      <div class="card-skills-img" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
        <h2>The skill card</h2>
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
        <div class="card-skills-info-more">
          <i class="fa fa-chevron-down" aria-hidden="true"></i> More
        </div>
      </div>
    <script>
      document.querySelector(".card-skills-info-more")
        .addEventListener("click" , (event) => {
          document.querySelector(".card-skills-info").classList.toggle("show");
          event.currentTarget.querySelector("i").classList.toggle("fa-chevron-down");
          event.currentTarget.querySelector("i").classList.toggle("fa-chevron-up");
      })
    </script>
    </div>


    <div class="card-identity" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
      <div class="card-identity-content">
        <div class="card-identity-avatar">
            <img src="https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4" class="card-identity-img">
            <h2>The ID card</h2>
        </div>
        <p>A card convenient to depict someone's identity.</p>
      </div>
    </div>

    <div class="card-identity" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
      <div class="card-identity-content">
        <div class="card-identity-avatar">
            <img src="https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4" class="card-identity-img">
            <h2>The ID card</h2>
        </div>
        <p>A card convenient to depict someone's identity.</p>
        <ul style="padding: 0 16px">
          <li>Big enough</li>
          <li>If we want to add</li>
          <li>Additional infos</li>
        </ul>
      </div>
    </div>

    <div class="card-diapo">
      <div class="card-diapo-img show" style="background-image: url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg); background-position-x: left">
        <div class="card-diapo-text">
          <h2>The Bad</h2>
          <p>The diapo card</p>
        </div>
      </div>
      <div class="card-diapo-img" style="background-image: url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg); background-position-x: center">
        <div class="card-diapo-text">
          <h2>The Good</h2>
          <p>The diapo card</p>
        </div>
      </div>
      <div class="card-diapo-img" style="background-image: url(https://fr.web.img4.acsta.net/newsv7/16/07/22/12/35/275530.jpg); background-position-x: right">
        <div class="card-diapo-text">
          <h2>The Ugly</h2>
          <p>The diapo card</p>
        </div>
      </div>
      <script>
        let imgIndex = 1;
        const cardDiapoImgs = document.querySelectorAll(".card-diapo-img");
        setInterval(() => {
          cardDiapoImgs.forEach(cardDiapoImg => {
            cardDiapoImg.classList.remove("show");
          });
          cardDiapoImgs[imgIndex].classList.add("show");
          imgIndex = (imgIndex + 1) % cardDiapoImgs.length;
        }, 5000);
      </script>
    </div>
    <div class="card-neumorph">
      <div class="card-neumorph-buttons">
        <p>⚭</p>
        <p>Y</p>
        <p>⌬</p>
      </div>
      <h2>The <a href="https://neumorphism.io">Neumorphism</a> card</h2>
    </div>
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
  </div>
</div>

<style>
  .page-section {
    margin-bottom: 48px;
  }
  /*Card grid */
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 48px;
  }

  /*Card pick*/
  .card-pick {
    /*fixed*/
    display: flex;
    flex-direction: column;
    /*customizable*/
    height: 300px;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0px 16px rgb(0,0,0,0.3);
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
    box-shadow: 0 8px 16px rgb(0,0,0,0.3);
  }

  /*Card skills*/
  .card-skills {
    /*fixed*/
    display: flex;
    flex-direction: column;
    /*customizable*/
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
    box-shadow: 0 0px 16px rgb(0,0,0,0.3);
  }

  .card-skills-img h2 {
    /*customizable*/
    color: white;
    margin: 0;
    text-shadow: 0 0 8px rgb(0,0,0,0.3);
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
    box-shadow: 0 0px 16px rgb(0,0,0,0.3);
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
    background-color: rgb(240,240,240);
    cursor: pointer;
    text-align: center;
    border-radius: 0 0 4px 4px;
  }

  .card-skills-info.show {
    /*fixed*/
    height: 100%;
  }

  .card-identity {
    /*fixed*/
    display: flex;
    align-items: center;
    /*customizable*/
    height: 300px;
    border-radius: 16px;
    background-size: cover;
    background-position: 50% 50%;
  }

  .card-identity-content {
    /*customizable*/
    padding: 24px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(250,250,250,0.5);
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
  }

  /*Card diapo*/
  .card-diapo {
    /*fixed*/
    position: relative;
    /*customizable*/
    height: 300px;
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
    color: rgb(240,240,240);
    text-shadow: 0 0 8px rgba(0,0,0,0.3);
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
  }

  .card-neumorph {
    /*customizable*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 300px;
    border-radius: 24px;
    background: -webkit-linear-gradient(55deg, #8aa0db, #a4beff);
    background: -o-linear-gradient(55deg, #8aa0db, #a4beff);
    background: linear-gradient(145deg, #8aa0db, #a4beff);
    box-shadow:  10px 10px 30px #8297cf,
                -10px -10px 30px #b0cdff;
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
    box-shadow:  10px 10px 30px #8297cf,
                -10px -10px 30px #b0cdff;
  }

  .card-neumorph-buttons p:active {
    /*fixed*/
    box-shadow: none;
  }

  .card-neumorph a {
    /*customizable*/
    color: #6a80bb;
    text-shadow: 2px 2px 6px #a4beff;
  }

  .card-stack {
    /*fixed*/
    position: relative;
    perspective: 400px;
    /*customizable*/
    height: 300px;
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

  :root {
    /*customizable*/
    --offset: -38px;
    --rotation: -30deg;
  }

  .card-stack-item:nth-child(1) {
    /*customizable*/
    transform: translateX(calc(32px + var(--offset))) rotateY(var(--rotation));
  }
  .card-stack-item:nth-child(2) {
    /*customizable*/
    transform: translateX(calc(0px + var(--offset))) rotateY(var(--rotation));
  }
  .card-stack-item:nth-child(3) {
    /*customizable*/
    transform: translateX(calc(-32px + var(--offset))) rotateY(var(--rotation));
  }

  .card-stack-item:not(:last-child):hover {
    /*customizable*/
    transform: rotateY(-10deg) translateX(160px);
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

  /*  background: linear-gradient( 109.6deg,  rgba(248,68,146,1) 11.2%, rgba(88,122,205,1) 91.1% );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/


  /* Medium tablets and smaller */
  @media (max-width: 1100px) {
    .cards {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }

</style>