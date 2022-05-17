$(document).ready(function () {
    const getMovies = () => {
        //loading gif
        $('#container').html(`<a href="/327.gif"><img src="/327.gif" border="0" height="300px" alt="Pizza loafing Icon" /></a>`)
        //This is where we set the timeout in order to use the loading animation
        setTimeout(() => {
            fetch('https://big-tungsten-heliotrope.glitch.me/movies')
                .then(response => response.json())
                .then(movies => {
                    $('#container').html('')
                    console.log(movies)
                    for (let movie of movies) {

                        // this is where the movies get rendered on the cards
                        let htmlStr = `<div class="card"  style="width: 18rem;">`;
                        htmlStr += `<img class="card-img-top" src="${movie.poster}" id="posters" alt="Card image cap">`
                        htmlStr += ` <div class="card-body">`
                        htmlStr += ` <h5 class="card-title">${movie.title}</h5>`
                        htmlStr += `<p class="card-director">Directed by: ${movie.director}</p>`
                        htmlStr += `<p class="card-rating">${movie.rating} out of 5 stars</p>`
                        htmlStr += `<div class="d-flex justify-content-between align-items-center"><button id="edit-${movie.id}" data-value="${movie.id}" class="btn btn-primary editMovie">Make Movie Edits</button>`;
                        htmlStr += `<span id="delete-${movie.id}"><i class="fas fa-garbage-alt" id="garbage"></i></span></div>`;
                        htmlStr += `</div>`
                        htmlStr += `</div>`

                        // this is where we will edit the movies.
                        htmlStr += `<div id="editCurrentMovie-${movie.id}"  style="display: none">`
                        htmlStr += `<h3>Edit this movie</h3>`
                        htmlStr += `<form id="editForm"><div class="form-group">`;
                        htmlStr += `<lab


el for="edit-title-${movie.id}">Edit Movie Title</label>`;
                        htmlStr += `<input value="${movie.title}" type="text" class="form-control" id="edit-title-${movie.id}" aria-describedby="emailHelp" placeholder='${movie.title}'></div>`;
                        htmlStr += `<div><label for="edit-director-${movie.id}">Edit Movie Director</label>`;
                        htmlStr += `<input value="${movie.director}" type="text" class="form-control" id="edit-director-${movie.id}" aria-describedby="emailHelp" placeholder="${movie.director}">
    </div>`;
                        htmlStr += `<label for="edit-rate-${movie.id}">Edit the Rating</label>`;
                        htmlStr += `<select id="edit-rate-${movie.id}" class="form-select" aria-label="Default select example">`;
                        htmlStr += `<option>Rate your title</option>`;
                        htmlStr += `<option value="1">One</option>`;
                        htmlStr += `<option value="2">Two</option>`;
                        htmlStr += `<option value="3" selected="selected">Three</option>`;
                        htmlStr += `<option value="4">Four</option>`;
                        htmlStr += `<option value="5">Five</option>`;
                        htmlStr += `</select>`;
                        htmlStr += `<button id="save-${movie.id}" data-value="${movie.id}" class="btn btn-primary">Save</button></form></div>`
                        $('#container').append(htmlStr)


                        //This is the delete movie button.
                        $(`#delete-${movie.id}`).click(function () {
                            fetch(`https://big-tungsten-heliotrope.glitch.me/movies/${movie.id}`, deleteOptions).then(getMovies)
                        })

                        //this is the edit movie button
                        $(`#edit-${movie.id}`).click(function () {
                            $(`#editCurrentMovie-${movie.id}`).css('display', 'inline');
                        })

                        //this is the save edits button
                        $(`#save-${movie.id}`).click(function (e) {
                            e.preventDefault();
                            let patchThis = {
                                "title": $(`#edit-title-${movie.id}`).val(),
                                // "title": newTitle,
                                "director": $(`#edit-director-${movie.id}`).val(),
                                "rating": $(`#edit-rate-${movie.id}`).val()
                            }

                            let patchOptions = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                //this is sending the info as json string
                                body: JSON.stringify(patchThis),
                            };
                            fetch(`https://big-tungsten-heliotrope.glitch.me/movies/${movie.id}`, patchOptions).then(getMovies);
                        })
                    }

                    let deleteOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                }).then(function () {

            });
        }, 2500)// Add movie button
    }
    getMovies()
    //


});