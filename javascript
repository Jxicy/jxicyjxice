// Add the following require statements at the top of your script
const fs = require('fs');
const path = require('path');

// Assuming your media folder is in the same directory as your HTML file
const mediaFolder = 'media';

// Function to read image files from a folder
function readImageFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(fileName => /\.(jpg|jpeg|png|gif)$/i.test(fileName));
    return imageFiles;
}

// Function to display images
function displayImages(images) {
    const galleryContainer = document.getElementById('gallery');

    images.forEach(image => {
        const img = new Image();
        img.src = `media/${image}`;
        img.alt = image;
        const mediaHTML = `<div class="swiper-slide"></div>`;
        galleryContainer.innerHTML += mediaHTML;
        galleryContainer.lastChild.appendChild(img);
    });
}

// Wait for the DOM to be ready before populating the gallery and initializing Swiper
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();

    // Initialize Swiper
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    // Add click event listener to each photo
    const photos = document.querySelectorAll('.swiper-container img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => openModal(photo.src, photo.alt));
    });
});

// Function to create the HTML for each media item
function createMediaHTML(fileName, mediaType) {
    let html;

    if (mediaType === 'photo') {
        html = `<div class="swiper-slide"><img src="media/${fileName}" alt="${fileName}"></div>`;
    } else if (mediaType === 'video') {
        html = `<div class="swiper-slide"><video controls><source src="media/${fileName}" type="video/mp4">Your browser does not support the video tag.</video></div>`;
    } else if (mediaType === 'song') {
        html = `
            <div class="song">
                <h3>${fileName}</h3>
                <audio controls>
                    <source src="songs/${fileName}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    } else {
        // Handle other media types if needed
        console.error('Unsupported media type:', mediaType);
        return ''; // Return an empty string for unsupported types
    }

    console.log(html); // Log the generated HTML to the console
    return html;
}

// Assuming you have an array of file names in your "media" folder
const mediaFiles = [
    'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
    'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg',
    'photo11.jpg', 'photo12.jpg', 'photo13.jpg', 'photo14.jpg', 'photo15.jpg',
    'photo16.jpg', 'photo17.jpg', 'photo18.jpg', 'photo19.jpg', 'photo20.jpg',
    'photo21.jpg', 'photo22.jpg', 'photo23.jpg', 'photo24.jpg', 'photo25.jpg',
    'photo26.jpg', 'photo27.jpg', 'photo28.jpg', 'photo29.jpg', 'photo30.jpg',
    'photo31.jpg', 'photo32.jpg', 'photo33.jpg', 'photo34.jpg', 'photo35.jpg',
    'photo36.jpg', 'photo37.jpg', 'photo38.jpg', 'photo39.jpg', 'photo40.jpg',
    'photo41.jpg', 'photo42.jpg', 'photo43.jpg', 'photo44.jpg', 'photo45.jpg',
    'photo46.jpg', 'photo47.jpg', 'photo48.jpg', 'photo49.jpg', 'photo50.jpg',
    'photo51.jpg', 'photo52.jpg', 'photo53.jpg', 'photo54.jpg', 'photo55.jpg',
    'photo56.jpg', 'photo57.jpg', 'photo58.jpg', 'photo59.jpg', 'photo60.jpg',
    'photo61.jpg', 'photo62.jpg', 'photo63.jpg', 'photo64.jpg', 'photo65.jpg',
    'photo66.jpg', 'photo67.jpg', 'photo68.jpg', 'photo69.jpg', 'photo70.jpg',
    'photo71.jpg', 'photo72.jpg', 'photo73.jpg', 'photo74.jpg', 'photo75.jpg',
    'photo76.jpg', 'photo77.jpg', 'photo78.jpg', 'photo79.jpg', 'photo80.jpg',
    'photo81.jpg', 'photo82.jpg', 'photo83.jpg', 'photo84.jpg', 'photo85.jpg',
    'photo86.jpg', 'photo87.jpg', 'photo88.jpg', 'photo89.jpg', 'photo90.jpg',
    'photo91.jpg', 'photo92.jpg', 'photo93.jpg', 'photo94.jpg', 'photo95.jpg',
    'photo96.jpg', 'photo97.jpg', 'photo98.jpg', 'photo99.jpg', 'photo100.jpg',
    // ... add more photos as needed
];

// Array of media items with file names and media types
const mediaItems = [
    ...mediaFiles.map(fileName => ({ fileName, mediaType: 'photo' })),
    // ... add more items as needed, specifying mediaType accordingly
];

// Function to populate the gallery
function populateGallery() {
    const galleryContainer = document.getElementById('gallery');

    mediaItems.forEach(({ fileName, mediaType }) => {
        const mediaHTML = createMediaHTML(fileName, mediaType);
        galleryContainer.innerHTML += mediaHTML;
    });
}

// Wait for the DOM to be ready before populating the gallery and initializing Swiper
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();

    // Initialize Swiper
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
});
// Function to open the modal
function openModal(src, alt, mediaType) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Check if the media type is a video
    const isVideo = mediaType === 'video';

    modal.innerHTML = `
        <div class="modal-content ${isVideo ? 'video-modal' : ''}">
            <span class="close" onclick="closeModal()">&times;</span>
            ${isVideo ? `<video controls><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>` : `<img src="${src}" alt="${alt}">`}
        </div>
    `;

    document.body.appendChild(modal);
}

// Rest of your script...
