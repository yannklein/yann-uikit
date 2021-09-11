<div class="card-identity" style="background-image: url(https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)">
  <div class="card-identity-content">
    <div class="card-identity-avatar">
        <img src="https://avatars2.githubusercontent.com/u/26819547?s=400&u=ae79d8825ad1127723641cbf32a9a7e2ec221e7f&v=4" alt="avatar" class="card-identity-img">
        <h2>The ID card</h2>
    </div>
    <p>A card convenient to depict someone's identity.</p>
  </div>
</div>

<style>
  .card-identity {
    /*fixed*/
    display: flex;
    align-items: center;
    /*customizable*/
    height: 300px;
    width: 100%;
    border-radius: 16px;
    background-size: cover;
    background-position: 50% 50%;
  }
  .card-identity-content {
    /*customizable*/
    padding: 24px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background-color: rgba(250, 250, 250, 0.5);
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
</style>