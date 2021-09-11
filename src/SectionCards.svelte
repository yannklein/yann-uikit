<script>
  import { writable } from 'svelte/store';
  import CardHello from './cards/CardHello.svelte';
  import CardIdentity from './cards/CardIdentity.svelte';
  import CardPick from './cards/CardPick.svelte';
  import CardSkills from './cards/CardSkills.svelte';
  import CardDiapo from './cards/CardDiapo.svelte';
  import CardNeumorph from './cards/CardNeumorph.svelte';
  import CardStack from './cards/CardStack.svelte';
  import CardTemplate from './cards/CardTemplate.svelte';

	const currentCard = writable(null);

  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id="cards-section" class="page-section">
  <h2>❐ Cards</h2>
  <div class="cards">
    <CardTemplate cardType="hello"><CardHello /></CardTemplate>
    <CardTemplate cardType="pick"><CardPick /></CardTemplate>
    <CardTemplate cardType="skills"><CardSkills /></CardTemplate>
    <CardTemplate cardType="identity"><CardIdentity /></CardTemplate>
    <CardTemplate cardType="diapo"><CardDiapo /></CardTemplate>
    <CardTemplate cardType="neumorph"><CardNeumorph /></CardTemplate>
    <CardTemplate cardType="stack"><CardStack /></CardTemplate>
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