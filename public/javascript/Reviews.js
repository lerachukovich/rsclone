class Reviews {

    constructor(id, parent) {
        this.restId = id;
        this.renderReviews = this.renderReviews.bind(this);
        this.parent = parent;

        this.getReviewsData();
    }

    async getReviewsData () {

        const reviewsUrl = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.restId}`;

        await fetch(reviewsUrl, {
            method: 'GET',
            headers: {
                "user-key": "cd7196bc91f2e356b0a6392be28140bf"
            },
            redirect: 'follow'
        })
        .then((response) => response.json())
        .then((result) => {
            this.renderReviews(result.user_reviews);
        });
    }

    renderReviews(reviewsData) {
        const reviewsWrapper = document.createElement('div');
        reviewsWrapper.classList.add('reviews-wrapper');

        reviewsData.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('reviews-item');

            reviewItem.innerHTML = `
                <div class="review-item-wrapper">
                    <div class="review-photo">
                        <img src="${review.review.user.profile_image}" alt="photo">
                    </div>
                    <div class="review-content">
                        <h5 class="card-title">${review.review.rating_text}</h5>
                        <div class="review-rating"><span>Rating:</span> <span>${review.review.rating} &#9733;</span></div>
                        <div class="card-text">${review.review.review_text === '' ? 'User did not leave any text comment' : review.review.review_text}</div>
                        <p class="review-time">${review.review.review_time_friendly}</p>
                        <p class="review-author">Author: ${review.review.user.name}</p>
                    </div>
                </div>
            `;

            reviewsWrapper.appendChild(reviewItem);
        });

        this.parent.appendChild(reviewsWrapper);
    }
}

export default Reviews;