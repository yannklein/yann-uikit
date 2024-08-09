<div class="card-simple">
  <img
    alt="anteloupe canyon"
    class="card-simple-image"
    src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  />
  <div class="card-simple-tags">
    <span class="tag-green">Travel</span><span class="tag-orange"
      >Landscape</span
    >
  </div>

  <div class="card-simple-text">
    <img
      src="https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4"
      class="card-simple-avatar"
      alt="avatar"
    />
    <div class="price-tag">¥200</div>
    <div>
      <h2>Simple Card</h2>
      <p>A slightly simple but nice and efficient that does the job 💪</p>
    </div>
    <a class="card-simple-button" href="https://yannklein.dev/">A button</a>
  </div>
</div>

<style>
  .card-simple {
    /*fixed*/
    position: relative;
    /*customizable*/
    width: 100%;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
  }

  .card-simple h2 {
    margin-bottom: 8px;
  }

  .card-simple-tags {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .card-simple-tags .tag-green {
    background: #21c68f;
    border: 2px solid #407765;
    border-radius: 50px;
    padding: 1px 8px;
    font-size: 12px;
    color: #1d342c;
  }

  .card-simple-tags .tag-orange {
    background: #e4b774;
    border: 2px solid #d6912a;
    border-radius: 50px;
    padding: 1px 8px;
    font-size: 12px;
    color: #582d0d;
  }

  .card-simple-text {
    /*fixed*/
    position: relative;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }


  .card-simple-avatar {
    /*fixed*/
    position: absolute;
    top: -32px;
    right: 16px;
    border-radius: 50%;
    height: 64px;
    width: 64px;
    object-fit: cover;
  }

  .card-simple-text .price-tag {
    width: fit-content;
    background: #bebebe;
    border-radius: 50px;
    padding: 4px 8px;
    font-size: 16px;
    font-weight: bold;
    color: #1d342c;
  }

  .card-simple-image {
    height: 260px;
    width: 100%;
    border-radius: 8px 8px 0 0;
  }

  .card-simple-button {
    border-radius: 50px;
    padding: 8px 16px;
    background-color: salmon;
    color: white;
    transition: 0.1s;
    text-align: center;
    width: fit-content;
  }
  .card-simple-button:hover {
    background-color: rgb(250, 92, 75);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
</style>
