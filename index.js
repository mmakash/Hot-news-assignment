// load all categories
const allCategoriesLoad = () =>{
    
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try{
        fetch(url)
        .then(res => res.json())
        .then(datas => displayAllCategories(datas.data.news_category))
    }
    catch (err){
        console.log(err);
    }
};
// display categories
const displayAllCategories = (datas) =>{
    const getParentId = document.getElementById('all-menu')
    datas.forEach(data => {
        // console.log(data);
        const createLi = document.createElement('li');
        createLi.classList.add('me-5')
        createLi.innerHTML = `<a href="#" onclick="loadNews('${data.category_id}' , '${data.category_name}')">${data.category_name}</a>`;
        getParentId.appendChild(createLi);
        
    });
};
// load all news
const loadNews = (newsId , newsCategory) =>{
    
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`
    try{
        fetch(url)
        .then(res => res.json())
        .then(data => displayAllNews(data.data, newsCategory))
    }
    catch (err){
        console.log(err)
    }
    loadSpinner(true);
};
const displayAllNews = (newses , newsCategory) =>{

    // items category found text
    const getItem = document.getElementById('item-text');
    getItem.innerText = ``;
    getItem.innerText = `${newses.length} items found`
    
    // not found text
    const getNotFound = document.getElementById('not-found');
    const getParentId = document.getElementById('card-container');
    getParentId.innerHTML = ``;
    const spinner = document.getElementById('spinner')
    if (newses.length === 0) {
        getNotFound.classList.remove('d-none');
        spinner.classList.add('d-none');
        getParentId.innerHTML = ` `;
        return;
    }else{
        getNotFound.classList.add('d-none');
    }
    newses.sort((lower,bigger)=>bigger.total_view - lower.total_view).forEach( news => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('col')
        createDiv.innerHTML = `
                    <div class="card">
                        <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${news.title}</h5>
                          <p class="card-text">${news.details.length > 50 ? news.details.slice(0,50) + '...' : 'no Details to show'}</p>
                                <div class="d-flex author align-items-center">
                                        <div>
                                            <img src="${news.author.img}" class="img-fluid" alt="">
                                        </div>
                                        <div>
                                            <h5 class="mb-0 ms-2">${news.author.name ? news.author.name : 'No data Found' }</h5>
                                        </div>
                                        <div class="views d-flex align-items-center justify-content-center ms-3">
                                            <div><i class="fa-solid fa-eye"></i></div>
                                            <div><h6 class="mb-0 ms-1">${news.total_view > 0 ? news.total_view : 'No views'}</h6></div>
                                        </div>
                                        <div class="more">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick = "fetchModalData('${news._id}')" class="ms-3"><i class="fa-solid fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
        
    
        `;
        // load spinner end
        loadSpinner(false);
        getParentId.appendChild(createDiv);
        
    });

    
};
// get modal data
const fetchModalData = (id) =>{

    const url = `https://openapi.programming-hero.com/api/news/${id}`
    try{
        fetch(url)
        .then(res => res.json())
        .then(datas => showModalData(datas.data[0]))
    }
    catch (err){
        console.log(err)
    }
};
// show modal data
const showModalData = (details) =>{
    console.log(details);
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = `${details.title ? details.title :'No title found'}`;
    const modalDetails = document.getElementById('modal-body');
    modalDetails.innerHTML = `
    
    <img src="${details.image_url ?details.image_url : 'No Image Found' }" alt="" class="img-fluid w-100">
    <h4>Author Name : ${details.author.name ?details.author.name : 'No Author Found' }</h4>
    <h5>Views : ${details.total_view ?details.total_view: 'No views' }</h5>
    <p>${details.details ?details.details:'No details Found' }</p>
    
    `
}
// spinner
const loadSpinner = (isSpin) =>{
    const getSpinner = document.getElementById('spinner');
    if (isSpin) {
        getSpinner.classList.remove('d-none')
    }else{
        getSpinner.classList.add('d-none')
    }
};
allCategoriesLoad();


