const API_KEY = `AIzaSyDQM7hT3PLhQnh6P_6PGHjKaYaNM8_KCKM`;
let videoDataBox=[];
const videoListBox = document.querySelector('.video-list')
const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('#searchBtn')
const category= document.querySelectorAll('.category');
category.forEach(ele=>ele.addEventListener('click',(e)=>getVideoCategory(e)))

// 검색
const getSearchVideo = async() => {
    let keyword = searchInput.value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${keyword}&type=video&key=${API_KEY}`
    let response = await fetch(url);
    let videoData = await response.json();
    videoDataBox=videoData.items;
    render();
}
const videoList = async() => {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=30&regionCode=kr&key=${API_KEY}`
    let response = await fetch(url);
    let videoData = await response.json();
    videoDataBox=videoData.items;
    console.log(videoDataBox)
    //console.log(videoData.items[0].snippet.thumnails.default.url);
    render();
}

const getVideoCategory = async(e) => {
    // 카테고리 클릭시 색상 변경
    category.forEach(ele=>ele.classList.remove('on'))
    e.target.classList.add('on');
    // 카테고리 데이터셋 불러오기
    let topic = e.target.dataset.category;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${topic}&type=video&key=${API_KEY}`
    let response = await fetch(url);
    let videoData = await response.json();
    videoDataBox=videoData.items;
    console.log(videoDataBox)
    render();
}

const render = () => {
    let videoResult = '';
    videoResult=videoDataBox.map((item)=>{
        return ` <div class="video-item">
        <div class="thum-img">
            <img src=${item.snippet.thumbnails.medium.url} alt="" />
        </div>
        <div class="video-txt">
            <h2>채널: ${item.snippet.channelTitle}</h2>
            <h3>비디오: ${item.snippet.title}</h3>
        </div>
    </div>`
    }).join("")

    videoListBox.innerHTML = videoResult;
}
videoList();
searchBtn.addEventListener('click', getSearchVideo)
searchInput.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        getSearchVideo();
    }
})

//스크롤시 상단 검색바 고정
const header = document.querySelector(".search-field");
const headerHeight = header.offsetHeight;

window.onscroll = function () {
  const windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
};