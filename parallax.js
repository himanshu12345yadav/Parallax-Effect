var image = document.getElementsByTagName('img');
var container = document.getElementsByClassName('parallax-container');

window.addEventListener('load', () => {
    document.body.classList.remove('overlay');
});
window.addEventListener('scroll', () => {
    Array.from(container).forEach((element, index) => {
        if (
            window.screen.availHeight < element.offsetTop &&
            window.scrollY + window.screen.availHeight > element.offsetTop &&
            window.scrollY < element.offsetTop + element.clientHeight
        ) {
            // If the image is someway below.
            if (image[index].height - element.clientHeight > 0) {
                // Normal condition , image height is more than the container's height.
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
                // For images height smaller that the Container's height.
                const scale_value =
                    element.clientHeight / image[index].height + 1;
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
            // Image can be seen at the first sight when the page is loaded.
            window.screen.availHeight > element.offsetTop &&
            window.scrollY < element.offsetTop + element.clientHeight
        ) {
            var speed =
                (element.offsetTop + element.clientHeight) /
                (image[index].height - element.clientHeight);
            image[index].style.transform = `translateY(${
                window.scrollY / speed
            }px)`;
        }
    });
});

let observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.children[0].classList.add('lazy-loading');
                observer.unobserve(entry.target);
            }
        });
    },
    { rootMargin: '0px', threshold: 0.25 }
);
Array.from(container).forEach((item) => observer.observe(item));
