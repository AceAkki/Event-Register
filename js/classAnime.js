import { animate, createTimeline, createScope, createTimer, createSpring, text, stagger, spring, onScroll, utils } from 'https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.esm.min.js'

export class AnimeMain {
    animateTextShow(txt) {
        const { words } = text.splitText(txt, { words: true });
    
        animate(words, {
            opacity: [{ from: 0, to: 1, ease: "inOut(3)", duration: 500 }],
            y: [
                { to: ['100%', '0%'] },
            ],
            duration: 750,
            delay: stagger(50),
            ease: 'outExpo',
            loop: false
        });
    }

    horizontalSplit(elm) {
        text.splitText(elm, {
            chars: {
                class: 'char',
                clone: 'left',
                wrap: 'clip',
            },
        });
    
        const rotateAnim = createTimeline({
            autoplay: true,
            loop: true,
            defaults: { ease: 'inOutQuad', duration: 1000, }
        })
            .add('.char > span', { x: '100%' }, stagger(5, { use: 'data-char' }));
    
    }

    drop(elm) {
        text.splitText(elm, {
            chars: {
                class: 'char',
                clone: 'top',
                wrap: 'clip',
            },
        });
    
        const ease = spring({ stiffness: 90, damping: 11 });
    
        createTimeline().add('.char > span', {
            autoplay: true,
            y: '100%',
            composition: 'blend',
            ease,
        }, stagger(10, { use: 'data-char', from: 'random' }));
    }

    animeMainImg(bgImg, mainImg) {
      animate(bgImg, {
        opacity: { from: 0, to: 1 },
        scale: { from: 0, to: 1 },
        ease: "inOutCirc",
        duration: 1500,
        autoplay: onScroll({
          enter: "bottom top",
          leave: "top bottom",
          sync: "resume reset",
        }),
      });
      animate(mainImg, {
        scale: { from: 0, to: 1 },
        ease: "inOutCirc",
        autoplay: onScroll({
          enter: "bottom top",
          leave: "top bottom",
          sync: "resume reset",
        }),
      });
    }
}
