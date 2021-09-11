<script>
	import { onMount } from 'svelte';
  let tapped = false;
  const toggleCard = () => tapped = !tapped;

  onMount(() => {
    let imgIndex = 1;
    const cardDiapoImgs = document.querySelectorAll(".card-diapo-img");
    setInterval(() => {
      cardDiapoImgs.forEach(cardDiapoImg => {
        cardDiapoImg.classList.remove("show");
      });
      cardDiapoImgs[imgIndex].classList.add("show");
      imgIndex = (imgIndex + 1) % cardDiapoImgs.length;
    }, 5000);
  });
</script>

<div class="card-diapo" on:click={toggleCard}>
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
</div>

<style>
  /*Card diapo*/
  .card-diapo {
      /*fixed*/
      position: relative;
      /*customizable*/
      height: 300px;
      width: 100%;
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
  }
</style>