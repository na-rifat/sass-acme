$(document).ready(function () {
    // notionCarousel(
    //     {
    //         autoplay: true,
    //         autoplayInterval: 5000
    //     }
    // );
    notionAccordion(
        {
            startIndex: 1
        }
    );

    notionPricingTab();
    notionToggleMenu();
});

/**
 * Handles Ndotiohive carousle
 * @author Nura Alam Rifat
 * @param {object} props 
 */
function notionCarousel(props) {
    let parent = $(`.notion-carousel`)
    let carousels = parent.find(`.notion-carousel__item`)
    let nextBtn = parent.find(`.carousel-next`)
    let prevBtn = parent.find(`.carousel-prev`)
    let navigator = parent.find(`.notion-carousel__navigator .buttons`)
    let indicator = parent.find(`.notion-carousel__navigator .indicator`)
    let animationType = `swing`;
    let current = $(`.notion-carousel__item.active`)

    carousels.each(function () {
        indicator.append(
            `<div></div>`
        )
    })

    let indicators = indicator.find(`div`)

    indicators.eq(current.index()).addClass(`active`)

    nextBtn.on(`click`, function (e) {
        let current = $(`.notion-carousel__item.active`)
        let next = current.next();

        if (next.index() == carousels.length) next = carousels.eq(0)

        indicators.removeClass(`active`)

        current.animate(
            {
                left: `-100%`
            },
            500,
            animationType,
            function (e) {
                $(this).removeClass(`active`)
            }
        )
        next.css(
            {
                left: `auto`,
                right: `-100%`,
                zIndex: 99
            }
        ).animate(
            {
                right: 0
            },
            500,
            animationType,
            function (e) {
                $(this).addClass(`active`)
                indicators.eq($(this).index()).addClass(`active`)
            }
        )
    })


    prevBtn.on(`click`, function (e) {
        let current = $(`.notion-carousel__item.active`)
        let prev = carousels.eq(current.index() - 1);

        indicators.removeClass(`active`)

        current.css(
            {
                left: `auto`
            }
        ).animate(
            {
                right: `-100%`
            },
            500,
            animationType,
            function (e) {
                $(this).removeClass(`active`)
            }
        )

        prev.css(
            {
                right: `auto`,
                left: `-100%`,
                zIndex: 99
            }
        ).animate(
            {
                left: 0
            },
            500,
            animationType,
            function (e) {
                $(this).addClass(`active`)
                indicators.eq($(this).index()).addClass(`active`)
            }
        )
    })

    let interval = props.autoplayInterval == undefined ? 2000 : props.autoplayInterval
    let autoplay = props.autoplay == undefined ? false : props.autoplay;

    if (autoplay == true) {
        setInterval(() => {
            nextBtn.trigger(`click`)
        }, interval);
    }
}

/**
 * Handles Notionhive accordion
 * @author Nura Alam Rifat
 * @param {object} props 
 */
function notionAccordion(props) {
    let parent = $(`.accordions`)
    let items = parent.find(`.accordions_accordion`)
    let keys = parent.find(`.accordions_key`)
    let openIcons = parent.find(`.accordions_key img:nth-child(1)`)
    let closeIcons = parent.find(`.accordions_key img:nth-child(2)`)
    let currentKey = parent.find(`.accordions_key.active`)
    let currentContent = parent.find(`.accordions_body.active`)
    let currentIndex = currentKey.parent().index();

    items.find('.accordions_body').slideUp(0);
    openIcons.show(0);
    closeIcons.hide(0);

    openIcons.eq(currentIndex).hide();
    closeIcons.eq(currentIndex).show()

    keys.on(`click`, function (e) {
        currentKey = parent.find(`.accordions_key.active`)
        currentContent = parent.find(`.accordions_body.active`)
        let clicked = $(this)
        clickedIndex = clicked.parent().index();
        currentIndex = currentKey.parent().index();


        currentContent.slideUp(300, function (e) {
            currentContent.removeClass(`active`)
            currentKey.removeClass(`active`)

            openIcons.eq(currentIndex).show();
            closeIcons.eq(currentIndex).hide()
        });



        if (clickedIndex != currentIndex) {
            items.eq(clickedIndex).find(`.accordions_body`).slideDown(300, function (e) {
                clicked.addClass(`active`)
                $(this).addClass(`active`)
                openIcons.eq(clickedIndex).hide();
                closeIcons.eq(clickedIndex).show()
            })
        }
    })

    if (props.startIndex != undefined) {
        keys.eq(props.startIndex).trigger(`click`)
    }
}

/**
 * Handles Notionhive pricing tab navigation
 * @author Nura Alam Rifat
 */
function notionPricingTab() {
    let parent = $(`.pricing__tab`)
    let keys = parent.find(`.pricing__tabtool > div`)
    let pages = parent.find(`.pricing__tabpage`)
    let currentKey = parent.find(`.tab-key.active`)
    let currentPage = parent.find(`.pricing__tabpage.active`)

    keys.on(`click`, function (e) {
        currentKey = parent.find(`.pricing__tabtool > div.active`)
        currentPage = parent.find(`.pricing__tabpage.active`)
        let self = $(this)

        if (currentKey.index() == self.index()) return;

        currentKey.removeClass(`active`);
        currentPage.removeClass(`active`)

        self.addClass(`active`)

        currentPage.fadeOut(300, function (e) {
            pages.eq(self.index()).fadeIn(200, function (e) {
                $(this).addClass(`active`)
            })
        })
    })
}


/**
 * Handles menu toggle
 * @author Nura Alam Rifat
 */
function notionToggleMenu() {
    let toggler = $(`.toggler`);
    let menu = $(`.top-nav`);

    toggler.on(`click`, function (e) {
        if (menu.css(`display`) == `none`) {
            menu.slideDown(300)
            $(this).find(`img`).css(
                {
                    transition: `.3s all linear`,
                    transform: `rotate(90deg)`
                }
            )
        } else {
            menu.slideUp(300)
            $(this).find(`img`).css(
                {
                    transition: `.3s all linear`,
                    transform: `rotate(0deg)`
                }
            )
        }

    })
}