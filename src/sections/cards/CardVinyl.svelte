<div class="card-vinyl">
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
</div>

<style>
  #babin {
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
    text-shadow: 0 2px 4px rgb(0 0 0 / 70%);
    box-shadow: 16px 0 16px -7px rgb(0 0 0 / 70%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform 0.3s;
  }

  :root {
    /*customizable*/
    --offset: -38px;
    --rotation: -30deg;
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
  }
</style>
