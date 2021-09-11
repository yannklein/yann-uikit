<script>
  import Icon from 'fa-svelte'
  import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'

  let isShown = false;
  const toggleShow = () => isShown = !isShown; 
</script>

<div class="card-skills">
  <div class="card-skills-img" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
    <h2>The skills card</h2>
  </div>
  <div class="card-skills-info" class:show={isShown}>
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
      <Icon icon={ isShown ? faChevronUp : faChevronDown}/> More
    </div>
  </div>
</div>

<style>
  /*Card skills*/
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
  }
</style>