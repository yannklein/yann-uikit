<script>
  let tapped = false;
  const toggleCard = () => tapped = !tapped;
</script>

<div class="card-pick" on:click={toggleCard}>
  <img src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
  <div class="card-pick-info">
    <h2>The Pick card</h2>
    <p>It goes up when you hover over it.</p>
  </div>
</div>

<style>
  /*Card pick*/
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
  }
</style>