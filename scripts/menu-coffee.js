fetch('./scripts/products.json')
.then(response => response.json())
.then(data => {
  let menuPage = 'coffee';

  const tabCoffee = document.getElementById('tab-coffee');
  const tabTea = document.getElementById('tab-tea');
  const tabDessert = document.getElementById('tab-dessert');

  const previews = {'coffee': [], 'tea': [], 'dessert': []}

  let grid = document.getElementById('grid');

  let sizes = document.getElementById('sizes').querySelectorAll('.tab-item');
  let additives = document.getElementById('additives').querySelectorAll('.tab-item');
  
  sizes[0].classList.add('active');

  data.forEach(element => {
    if(element.category == 'coffee'){
      previews['coffee'].push(element);
    }
    if(element.category == 'tea'){
      previews['tea'].push(element);
    }
    if(element.category == 'dessert'){
      previews['dessert'].push(element);
    }
  });

  function resetElements(){
    document.getElementById('grid').innerHTML = '';

    if(window.matchMedia("(min-width: 769px) and (max-width: 1440px)").matches){
      showFirstFourElements();
      showOtherElements();
    }
    if(window.matchMedia("(max-width: 768px)").matches){
      if(previews[menuPage].length <= 4){
        gridButton.style.transition = 'none';
        gridButton.style.position = 'absolute';
        gridButton.style.visibility = 'hidden';
      }
      showFirstFourElements();
    }
  }

  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');
  const modalTotal = document.getElementById('modal-total');
  const size1 = document.getElementById('size1');
  const size2 = document.getElementById('size2');
  const size3 = document.getElementById('size3');
  const addition1 = document.getElementById('addition1');
  const addition2 = document.getElementById('addition2');
  const addition3 = document.getElementById('addition3');

  function showModalWindow(name){
    previews[menuPage].forEach(item => {
      if (item.name == name) {
        modalTitle.innerText = item.name;
        modalDescription.innerText = item.description;
        modalImage.src = `styles/images/${item.name}.jpg`;
        modalTotal.innerText = `${item.price}`;

        size1.innerText = item.sizes['s'].size;
        size2.innerText = item.sizes['m'].size;
        size3.innerText = item.sizes['l'].size;

        addition1.innerText = item.additives[0].name;
        addition2.innerText = item.additives[1].name;
        addition3.innerText = item.additives[2].name;
      }
      



    });

    additives.forEach(tab=>{
      tab.addEventListener('click', function(){
        if(tab.classList.contains('active')){
          tab.classList.remove('active');
          modalTotal.innerText = (parseFloat(modalTotal.innerText.replace('$', '')) - 0.50).toFixed(2);
        }
        else{
          tab.classList.add('active');
          modalTotal.innerText = (parseFloat(modalTotal.innerText.replace('$', '')) + 0.50).toFixed(2);
        }
      });
    });

    sizes.forEach(tab => {
      tab.addEventListener('click', function(){
        let totalWithoutSize = parseFloat(modalTotal.innerText.replace('$', '')).toFixed(2);
        
        sizes.forEach (tab => {
          tab.classList.remove('active');
        });

        if(tab == sizes[0]){
          modalTotal.innerText = (Number(totalWithoutSize) + 0.00).toFixed(2);
        }
        if(tab == sizes[1]){
          modalTotal.innerText = (Number(totalWithoutSize) + 0.50).toFixed(2);
        }
        if(tab == sizes[2]){
          modalTotal.innerText = (Number(totalWithoutSize) + 1.00).toFixed(2);
        }

        this.classList.add('active');
      })
    });

    document.getElementById('backdrop').style.display = 'block';
    document.getElementById('body').style.overflow = 'hidden';
  }

  document.getElementById('modal-close').addEventListener('click', function(){
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById('body').style.overflow = '';

    additives.forEach(tab => {
      tab.classList.remove('active');

    });

    sizes.forEach(tab => {
      tab.classList.remove('active');
    });

    sizes[0].classList.add('active');

  });

  tabCoffee.addEventListener('click', function(){
    
    menuPage = 'coffee';

    tabCoffee.className = 'tab-item active';
    tabTea.className = 'tab-item';
    tabDessert.className = 'tab-item';

    resetElements();
  })

  tabTea.addEventListener('click', function(){
    menuPage = 'tea';

    tabCoffee.className = 'tab-item';
    tabTea.className = 'tab-item active';
    tabDessert.className = 'tab-item';

    resetElements();
  })

  tabDessert.addEventListener('click', function(){
    
    menuPage = 'dessert';

    tabCoffee.className = 'tab-item';
    tabTea.className = 'tab-item';
    tabDessert.className = 'tab-item active';

    resetElements();
  })
  
  function addItem(name, description, price){
    let preview = document.createElement('div');

    preview.className = 'preview';

    let previewImageContainer = document.createElement('div');
    previewImageContainer.className = 'preview-image scale';



    let previewImage = document.createElement('img');
    previewImage.src = `styles/images/${name}.jpg`;
    previewImage.className = 'scale';

    let previewTitleContainer = document.createElement('div');
    previewTitleContainer.className = 'title';

    let previewDescription = document.createElement('div');
    previewDescription.className = 'preview-description';

    let previewTitle = document.createElement('div');
    previewTitle.className = 'heading-3';
    previewTitle.innerText = name;

    let previewText = document.createElement('div');
    previewText.className = 'medium';
    previewText.innerText = description;

    let previewPrice = document.createElement('div');
    previewPrice.className = 'price heading-3';
    previewPrice.innerText = `$${price}`;

    preview.addEventListener('click', function(){
      showModalWindow(name);
    });

    previewImageContainer.appendChild(previewImage);
    previewTitleContainer.appendChild(previewTitle);
    previewTitleContainer.appendChild(previewText);
    previewDescription.appendChild(previewTitleContainer);
    previewDescription.appendChild(previewPrice);
    preview.appendChild(previewImageContainer);
    preview.appendChild(previewDescription);
    grid.appendChild(preview)
  }
  
  function showFirstFourElements(){
    for(let i = 0; i < 4; i++){
      addItem(previews[menuPage][i].name, previews[menuPage][i].description, previews[menuPage][i].price);
    }
    gridButton.style.position = 'static';
    gridButton.style.visibility = 'visible';
  }

  const gridButton = document.getElementById('grid-button');

  function showOtherElements(){
    for(let i = 4; i < previews[menuPage].length; i++){
      addItem(previews[menuPage][i].name, previews[menuPage][i].description, previews[menuPage][i].price);
    }
    gridButton.style.position = '';
    gridButton.style.visibility = '';
  }

  gridButton.addEventListener('click', showOtherElements);

  resetElements();

  window.addEventListener('resize', function(){
    resetElements();
  });
});
