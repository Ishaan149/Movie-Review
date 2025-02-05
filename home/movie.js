const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");


const APILINK = 'https://ef50b691-e368-40aa-b817-601645973dce-00-2i5eow6yrfqj0.janeway.replit.dev/api/v1/reviews/';


const main = document.getElementById("review_creator");
const title = document.getElementById("movie_title");
const review_container = document.getElementById("review_container");

title.innerText = "Reviews For: " + movieTitle;

const div_new = document.createElement('div');

div_new.innerHTML = `
    <div class = "card">
        New Review
        <p> <strong>User: </strong> 
        <input type = "text" id = "new_user" value = "">
        </p>
        <p> <strong>Review: </strong>
        <input type = "text" id = "new_review" value = "">
        </p>
        <p class = "button_container"> <a href = "#" onclick = "saveReview('new_review','new_user')"> Add </a></p>
    </div>
    `

main.appendChild(div_new);


returnReviews(APILINK);
function returnReviews(url){
    fetch(url + "movie/" + movieId).then(res => res.json())
        .then(function(data){
        console.log(data);
        data.forEach(review => {

            const div_card = document.createElement('div');

            div_card.innerHTML = `
            <div class = "card" id= "${review._id}">
            
            <p> <strong>User: </strong> ${review.user}</p>
            
            <p> <strong>Review: </strong> ${review.review}</p>
            
            <p class="edit_btn"> 
            
            <a href = "#" onclick = "editReview('${review._id}','${review.review}','${review.user}')"> Edit </a> 
            
            <a href = "#" onclick = "deleteReview('${review._id}')"> Remove </a>
            
            </p>
            
            </div>
        `

            review_container.appendChild(div_card);
        });
    });
}

function editReview(id, review, user){
    const element = document .getElementById(id)
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element.innerHTML = `
                        <p> <strong>User: </strong> 
                        <input type = "text" id = "${userInputId}" value = "${user}">
                        </p>
                        <p> <strong>Review: </strong>
                        <input type = "text" id = "${reviewInputId}" value = "${review}">
                        </p>
                        <p> <a href = "#" onclick = "saveReview('${reviewInputId}','${userInputId}','${id}')"> Save </a></p>
    `
}

function saveReview(reviewInputId, userInputId, id=""){
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value

    if (id){
        fetch (APILINK + id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
        });
    } else{
        fetch (APILINK + "new",{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
        });
    }
}

function deleteReview(id) {
    fetch (APILINK + id,{
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    });
}


