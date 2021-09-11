<script>
	import { cards } from '../../data/data.js';
  import CardCode from "./CardCode.svelte";
  import { writable } from 'svelte/store';
  import Icon from 'fa-svelte'
  import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
  

  const codeShown = writable(false);
  let tapped = false;
  const toggleCard = () => tapped = !tapped;
  const showCode = (newStatus) => (codeShown.set(newStatus))
</script>

<div class="card-container">
  <h3 on:click={() => showCode(true)}><Icon icon={faCode}/></h3>
  <div class="card-hello" on:click={toggleCard}>
    <img class:tapped src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
    <div class="card-hello-info">
      <h2>The Hello Card</h2>
      <p>The image gets bigger when you hover over it (or tap it on mobile). The info of the card gets hidden when the card gets bigger.</p>
    </div>
  </div>
</div>
{#if $codeShown}
  <CardCode {showCode} code={cards.Hello}/>
{/if}

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  h3 {
    display: flex;
    align-items: center;
    width: fit-content;
    background-color: #F4F2F0;
    border-radius: 4px;;
    padding: 4px 8px;
    margin: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  /*Card Hello*/
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
  }
</style>