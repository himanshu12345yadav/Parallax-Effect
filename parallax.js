window.addEventListener('scroll', () => {
    var image = document.getElementsByTagName('img');
    var container = document.getElementsByClassName('parallax-container');
    [...container].forEach((element, index) => {
        if (
            window.screen.availHeight < element.offsetTop &&
            window.scrollY + window.screen.availHeight > element.offsetTop &&
            window.scrollY < element.offsetTop + element.clientHeight
        ) {
            // If the image is someway below and not seen on the first instance seen of the page that is top of the page, Means we have to scroll the page to find that image.
            if (image[index].height - element.clientHeight > 0) {
                // normal condition image height is more than the container height.
                var speed =
                    window.screen.availHeight /
                    (image[index].height - element.clientHeight);

                image[index].style.transform = `translateY(${
                    (window.scrollY +
                        window.screen.availHeight -
                        element.offsetTop) /
                    speed
                }px)`;
            } else {
                const scale_value = element.clientHeight / image[index].height+ 1;
                // image height is less than the container height so we have to scale the image to overflow the container.
                var speed =
                    (window.screen.availHeight + element.clientHeight) /
                    (element.clientHeight - image[index].height);
                image[index].style.transform = `translateY(${
                    (window.scrollY +
                        window.screen.availHeight -
                        element.offsetTop) /
                    speed
                }px) scale(${scale_value})`;
            }
        } else if (
            // Image is on the first instance of the page means can be seen without scrolling means image is not so down so that we have to scoll it.
            window.screen.availHeight > element.offsetTop &&
            window.scrollY < element.offsetTop + element.clientHeight
        ) {
            var speed =
                (element.offsetTop + element.clientHeight) /
                (image[index].height - element.clientHeight);
            image[index].style.transform = `translateY(${
                window.scrollY / speed
            }px)`;
        } else {
            console.log('No image Found');
        }
    });
});
