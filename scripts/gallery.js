const gallery = document.querySelectorAll('.wrapper .img-container');
const previewBox = document.querySelector('.img-preview');
const previewImg = previewBox.querySelector('img');
const closeImg = previewBox.querySelector('.icon');
const previousBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const imgFocus = document.querySelector('.img-focus');

window.onload = () => {
    //shows how many images there are inside gallery
    for (let i = 0; i < gallery.length; i++) {

        //putting the value of i into the newIndex variable
        let newIndex = i;
        let clickImgIndex;

        gallery[i].onclick = () => {

            //passing the value of newIndex to the clickImgIndex variable
            clickImgIndex = newIndex;

            //getting the src of the selected image
            function imgPreview() {
                let selectedImg = gallery[newIndex].querySelector('img').src;
                previewImg.src = selectedImg;
            }

            //when at the first image it changes the display to none
            if (newIndex == 0) {
                previousBtn.style.display = 'none';
            }
            if (newIndex >= gallery.length - 1) {
                nextBtn.style.display = 'none';
            }

            //previous button
            previousBtn.onclick = () => {
            //decrements from the value in newIndex variable
                newIndex --;
                if (newIndex == 0) {
                    imgPreview();
                    previousBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'block';
                    imgPreview();
                }
            }

            //next button
            nextBtn.onclick = () => {
                //increments from the value in newIndex variable
                newIndex ++;
                if (newIndex >= gallery.length - 1) {
                    nextBtn.style.display = 'none'
                    imgPreview();
                } else {
                    previousBtn.style.display = 'block';
                    imgPreview();
                }
            }

            //calling the function
            imgPreview();

            //adds class to the imge preview
            previewBox.classList.add('enhanced');
            imgFocus.style.display = 'block';
            document.querySelector('body').style.overflow = 'hidden';

            closeImg.onclick = () => {
                //assigns user's first click from newIndex to clickImgIndex variables
                newIndex = clickImgIndex;

                //removes class of the image preview
                previewBox.classList.remove('enhanced');

                //changes style of the previous / next buttons to block
                previousBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                imgFocus.style.display = 'none';
                document.querySelector('body').style.overflow = 'auto';
            }
        }
    }
}